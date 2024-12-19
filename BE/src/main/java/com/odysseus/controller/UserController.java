package com.odysseus.controller;

import com.odysseus.model.user.User;
import com.odysseus.model.user.UserCreateRequest;
import com.odysseus.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Endpoint to handle creating a new user.
     *
     * @param userCreateRequest The payload containing user details for creation
     * @return ResponseEntity with status and message, either success or error
     */
    @PostMapping
    public ResponseEntity<Object> createUser(@RequestBody UserCreateRequest userCreateRequest) {
        // Validate inputs
        if (userService.isEmailExists(userCreateRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = userService.createNewUser(userCreateRequest);
        return ResponseEntity.ok(user);

    }


}
