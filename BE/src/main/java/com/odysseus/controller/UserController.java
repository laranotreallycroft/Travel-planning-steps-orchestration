package com.odysseus.controller;

import java.net.URISyntaxException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import com.odysseus.model.payload.common.IdPayload;
import com.odysseus.model.payload.login.LoginPayload;
import com.odysseus.utils.Security;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.odysseus.model.Trip;
import com.odysseus.model.User;
import com.odysseus.repository.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{userId}/trips")
    public ResponseEntity getUserTrips(@PathVariable(value = "userId") Long userId) throws URISyntaxException {

        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            List<Trip> trips = user.getTrips();
            return ResponseEntity.ok(trips.toArray());

        }
        return ResponseEntity.badRequest().body("Something went wrong");
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
