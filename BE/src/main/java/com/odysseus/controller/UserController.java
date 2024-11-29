package com.odysseus.controller;

import java.net.URISyntaxException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import com.odysseus.model.payload.common.IdPayload;
import com.odysseus.model.payload.user.UserCreatePayload;
import com.odysseus.utils.SecurityUtils;
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

    /**
     * Endpoint to handle creating a new user.
     *
     * @param userCreatePayload The payload containing user details for creation
     * @return ResponseEntity with status and message, either success or error
     */
    @PostMapping
    public ResponseEntity<Object> createUser(@RequestBody UserCreatePayload userCreatePayload) {
        try {
            // Validate inputs
            if (isEmailExists(userCreatePayload.getEmail())) {
                return ResponseEntity.badRequest().body("Email already exists");
            }

            User user = createNewUser(userCreatePayload);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            // Log exception details and respond with generic error
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }

    /**
     * Helper method to check if an email is already registered in the system.
     *
     * @param email The email to check for existence
     * @return true if the email already exists, false otherwise
     */
    private boolean isEmailExists(String email) {
        return userRepository.findByEmail(email, false) != null;
    }

    /**
     * Helper method to create a new user based on the provided payload.
     *
     * @param payload The payload containing the user details (email and password)
     * @return The saved User object
     */
    private User createNewUser(UserCreatePayload payload) {
        String email = payload.getEmail();
        String password = payload.getPassword();

        byte[] passwordSalt = SecurityUtils.getSalt();
        String passwordHash = SecurityUtils.getSecurePassword(password, passwordSalt);

        User user = new User(email, passwordSalt, passwordHash);
        return userRepository.save(user);
    }

}
