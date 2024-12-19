package com.odysseus.service;

import com.odysseus.model.user.User;
import com.odysseus.model.user.UserCreateRequest;
import com.odysseus.repository.UserRepository;
import com.odysseus.utils.SecurityUtils;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Helper method to check if an email is already registered in the system.
     *
     * @param email The email to check for existence
     * @return true if the email already exists, false otherwise
     */
    public boolean isEmailExists(String email) {
        return userRepository.findByEmail(email, false) != null;
    }

    /**
     * Helper method to create a new user based on the provided payload.
     *
     * @param payload The payload containing the user details (email and password)
     * @return The saved User object
     */
    public User createNewUser(UserCreateRequest payload) {
        String email = payload.getEmail();
        String password = payload.getPassword();

        byte[] passwordSalt = SecurityUtils.getSalt();
        String passwordHash = SecurityUtils.getSecurePassword(password, passwordSalt);

        User user = new User(email, passwordSalt, passwordHash);
        return userRepository.save(user);
    }
}
