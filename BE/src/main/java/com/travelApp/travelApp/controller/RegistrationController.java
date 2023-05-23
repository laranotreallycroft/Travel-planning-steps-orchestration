package com.travelApp.travelApp.controller;

import java.net.URISyntaxException;
import java.security.NoSuchAlgorithmException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelApp.travelApp.model.User;
import com.travelApp.travelApp.model.payload.LoginPayload;
import com.travelApp.travelApp.repository.UserRepository;
import com.travelApp.travelApp.utils.Security;

@RestController
@RequestMapping("/registration")
public class RegistrationController {
	private final UserRepository userRepository;

	public RegistrationController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@PostMapping
	public ResponseEntity registration(@RequestBody LoginPayload loginPayload) throws URISyntaxException {
		String payloadEmail = loginPayload.getEmail();
		String payloadPassword = loginPayload.getPassword();

		if (userRepository.findByEmail(payloadEmail) != null) {
			return ResponseEntity.ok("Email already exists");
		}
		try {
			byte[] passwordSalt = Security.getSalt();
			String passwordHash = Security.getSecurePassword(payloadPassword, passwordSalt);
			User user = new User(payloadEmail, passwordSalt, passwordHash);
			userRepository.save(user);
			return ResponseEntity.status(HttpStatus.CREATED).body(payloadEmail);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok("Something went wrong.");

	}
}
