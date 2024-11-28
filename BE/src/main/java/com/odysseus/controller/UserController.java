package com.odysseus.controller;

import java.net.URISyntaxException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import com.odysseus.model.payload.common.IdPayload;
import com.odysseus.model.payload.user.UserCreatePayload;
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


    @PostMapping
    public ResponseEntity<Object> createUser(@RequestBody UserCreatePayload userCreatePayload) {
        try {
            // Validate inputs
            if (isEmailExists(userCreatePayload.getEmail())) {
                return ResponseEntity.badRequest().body("Email already exists");
            }

            // Create and save the user
            User user = createNewUser(userCreatePayload);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating user");
            }

            // Respond with created user's ID
            IdPayload idPayload = new IdPayload(user.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(idPayload);
        } catch (Exception e) {
            // Log exception details and respond with generic error
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }

    private boolean isEmailExists(String email) {
        return userRepository.findByEmail(email, false) != null;
    }

    private User createNewUser(UserCreatePayload payload) throws NoSuchAlgorithmException {
        String email = payload.getEmail();
        String password = payload.getPassword();

        byte[] passwordSalt = Security.getSalt();
        String passwordHash = Security.getSecurePassword(password, passwordSalt);

        User user = new User(email, passwordSalt, passwordHash);
        return userRepository.save(user);
    }

}
