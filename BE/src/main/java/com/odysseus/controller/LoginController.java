package com.odysseus.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.odysseus.model.user.User;
import com.odysseus.model.login.AuthResponse;
import com.odysseus.model.login.GoogleLoginRequest;
import com.odysseus.model.login.LoginRequest;
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
     * @param loginRequest - Payload containing email and password from the user
     * @return ResponseEntity with either an error message or a generated JWT token for authenticated users
     */
    @PostMapping
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail(), false);

        if (user == null || !SecurityUtils.verifyPassword(loginRequest.getPassword(), user.getPasswordHash(), user.getPasswordSalt())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), false);
        return ResponseEntity.ok(new AuthResponse(token, user.getEmail()));
    }

    /**
     * Endpoint for Google login using Google ID token
     *
     * @param googleLoginRequest - Payload containing Google credential (ID token) from the user
     * @return ResponseEntity with either an error message or a generated JWT token for authenticated users
     */
    @PostMapping("/google")
    public ResponseEntity<Object> googleLogin(@RequestBody GoogleLoginRequest googleLoginRequest) {

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Arrays.asList(googleClientId)).build();
        GoogleIdToken idToken;
        try {
            idToken = verifier.verify(googleLoginRequest.getCredential());
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String payloadEmail = payload.getEmail();
                String subject = payload.getSubject();
                User user = userRepository.findByEmail(payloadEmail, true);
                if (user == null) {
                    user = new User(true, subject, payloadEmail);
                    userRepository.save(user);
                }

                String token = jwtUtil.generateToken(user.getEmail(), true);
                return ResponseEntity.ok(new AuthResponse(token, user.getEmail()));

            } else {
                return ResponseEntity.badRequest().body("Unable to login with Google");
            }
        } catch (GeneralSecurityException | IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
        }


    }


}
