package com.travelApp.travelApp.controller;

import java.io.IOException;
import java.net.URISyntaxException;
import java.security.GeneralSecurityException;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.travelApp.travelApp.model.GoogleUser;
import com.travelApp.travelApp.model.User;
import com.travelApp.travelApp.model.payload.GoogleLoginPayload;
import com.travelApp.travelApp.model.payload.LoginPayload;
import com.travelApp.travelApp.model.payload.UserPayload;
import com.travelApp.travelApp.repository.GoogleUserRepository;
import com.travelApp.travelApp.repository.UserRepository;
import com.travelApp.travelApp.utils.Security;

@RestController
@RequestMapping("/login")
public class LoginController {
	@Value("${google.clientId}")
	private String googleClientId;
	private final UserRepository userRepository;
	private final GoogleUserRepository googleUserRepository;

	public LoginController(UserRepository userRepository, GoogleUserRepository googleUserRepository) {
		this.userRepository = userRepository;
		this.googleUserRepository = googleUserRepository;
	}

	@PostMapping
	public ResponseEntity login(@RequestBody LoginPayload loginPayload) throws URISyntaxException {
		String payloadEmail = loginPayload.getEmail();
		String payloadPassword = loginPayload.getPassword();
		User user = userRepository.findByEmail(payloadEmail);
		if (user != null) {
			String passwordHash = user.getPasswordHash();
			byte[] passwordSalt = user.getPasswordSalt();
			String payloadPasswordHash = Security.getSecurePassword(payloadPassword, passwordSalt);
			if (payloadPasswordHash.equals(passwordHash)) {
				UserPayload userPayload = new UserPayload(payloadEmail, user.getId().toString());
				return ResponseEntity.ok(userPayload);
			}

		}
		return ResponseEntity.badRequest().body("Wrong email or password");
	}

	@PostMapping("/google")
	public ResponseEntity googleLogin(@RequestBody GoogleLoginPayload googleLoginPayload) throws URISyntaxException {
		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
				// Specify the CLIENT_ID of the app that accesses the backend:
				// Or, if multiple clients access the backend:
				.setAudience(Arrays.asList(googleClientId)).build();

		GoogleIdToken idToken;
		try {
			idToken = verifier.verify(googleLoginPayload.getCredential());
			if (idToken != null) {
				Payload payload = idToken.getPayload();

				String payloadUserId = payload.getSubject();
				String payloadEmail = payload.getEmail();

				GoogleUser user = new GoogleUser(payloadUserId, payloadEmail);
				if (googleUserRepository.findById(payloadUserId) != null) {
					UserPayload userPayload = new UserPayload(payloadEmail, payloadUserId);
					return ResponseEntity.ok(userPayload);
				}
				googleUserRepository.save(user);
				return ResponseEntity.status(HttpStatus.CREATED).body(payloadEmail);

			} else {
				return ResponseEntity.badRequest().body("Unable to login with Google");
			}
		} catch (GeneralSecurityException | IOException e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(e.toString());
		}
	}
}
