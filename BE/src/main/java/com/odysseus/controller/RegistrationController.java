package com.odysseus.controller;

import java.net.URISyntaxException;
import java.security.NoSuchAlgorithmException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.odysseus.model.User;
import com.odysseus.model.payload.common.IdPayload;
import com.odysseus.model.payload.login.LoginPayload;
import com.odysseus.repository.UserRepository;
import com.odysseus.utils.Security;

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

        if (userRepository.findByEmail(payloadEmail, false) != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        try {
            byte[] passwordSalt = Security.getSalt();
            String passwordHash = Security.getSecurePassword(payloadPassword, passwordSalt);
            User user = new User(payloadEmail, passwordSalt, passwordHash);
            userRepository.save(user);
            IdPayload idPayload = new IdPayload(user.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(idPayload);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("Something went wrong");

    }
}
