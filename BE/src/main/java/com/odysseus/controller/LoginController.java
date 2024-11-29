package com.odysseus.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.odysseus.model.User;
import com.odysseus.model.payload.common.AuthResponse;
import com.odysseus.model.payload.login.GoogleLoginPayload;
import com.odysseus.model.payload.login.LoginPayload;
import com.odysseus.repository.UserRepository;
import com.odysseus.utils.JwtUtil;
import com.odysseus.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Arrays;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public LoginController(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Value("${google.clientId}")
    private String googleClientId;

    /**
     * Endpoint for regular email/password login
     *
     * @param loginPayload - Payload containing email and password from the user
     * @return ResponseEntity with either an error message or a generated JWT token for authenticated users
     */
    @PostMapping
    public ResponseEntity<Object> login(@RequestBody LoginPayload loginPayload) {
        User user = userRepository.findByEmail(loginPayload.getEmail(), false);

        if (user == null || !SecurityUtils.verifyPassword(loginPayload.getPassword(), user.getPasswordHash(), user.getPasswordSalt())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), false);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    /**
     * Endpoint for Google login using Google ID token
     *
     * @param googleLoginPayload - Payload containing Google credential (ID token) from the user
     * @return ResponseEntity with either an error message or a generated JWT token for authenticated users
     */
    @PostMapping("/google")
    public ResponseEntity<Object> googleLogin(@RequestBody GoogleLoginPayload googleLoginPayload) {

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Arrays.asList(googleClientId)).build();
        GoogleIdToken idToken;
        try {
            idToken = verifier.verify(googleLoginPayload.getCredential());
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String payloadEmail = payload.getEmail();

                User user = userRepository.findByEmail(payloadEmail, true);
                if (user == null) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Google user not registered");
                }

                String token = jwtUtil.generateToken(user.getEmail(), true);
                return ResponseEntity.ok(new AuthResponse(token));

            } else {
                return ResponseEntity.badRequest().body("Unable to login with Google");
            }
        } catch (GeneralSecurityException | IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
        }


    }


}
