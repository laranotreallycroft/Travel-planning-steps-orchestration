package com.odysseus.controller;

import java.io.IOException;
import java.net.URISyntaxException;
import java.security.GeneralSecurityException;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

import com.odysseus.model.payload.user.UserCreatePayload;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.odysseus.model.User;
import com.odysseus.model.payload.common.IdPayload;
import com.odysseus.model.payload.login.GoogleLoginPayload;
import com.odysseus.model.payload.login.LoginPayload;
import com.odysseus.repository.UserRepository;
import com.odysseus.utils.Security;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

@RestController
@RequestMapping("/login")
public class LoginController {
    @Value("${google.clientId}")
    private String googleClientId;
    private final UserRepository userRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<Object> login(@RequestBody LoginPayload loginPayload) throws URISyntaxException {
        String payloadEmail = loginPayload.getEmail();
        String payloadPassword = loginPayload.getPassword();

        User user = userRepository.findByEmail(payloadEmail, false);
        if (user != null) {
            String passwordHash = user.getPasswordHash();
            byte[] passwordSalt = user.getPasswordSalt();
            String payloadPasswordHash = Security.getSecurePassword(payloadPassword, passwordSalt);

            if (payloadPasswordHash.equals(passwordHash)) {
                IdPayload idPayload = new IdPayload(user.getId());
                return ResponseEntity.ok(idPayload);
            }

        }
        return ResponseEntity.badRequest().body("Wrong email or password");
    }

    @PostMapping("/google")
    public ResponseEntity<Object> googleLogin(@RequestBody GoogleLoginPayload googleLoginPayload) throws URISyntaxException {

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Arrays.asList(googleClientId)).build();
        GoogleIdToken idToken;
        try {
            idToken = verifier.verify(googleLoginPayload.getCredential());
            if (idToken != null) {
                Payload payload = idToken.getPayload();
                String payloadUserId = payload.getSubject();
                String payloadEmail = payload.getEmail();

                User user = userRepository.findByEmail(payloadEmail, true);
                if (user != null) {
                    IdPayload idPayload = new IdPayload(user.getId());
                    return ResponseEntity.ok(idPayload);
                }
                user = new User(true, payloadUserId, payloadEmail);
                userRepository.save(user);
                IdPayload idPayload = new IdPayload(user.getId());
                return ResponseEntity.status(HttpStatus.CREATED).body(idPayload);

            } else {
                return ResponseEntity.badRequest().body("Unable to login with Google");
            }
        } catch (GeneralSecurityException | IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
        }
    }


}
