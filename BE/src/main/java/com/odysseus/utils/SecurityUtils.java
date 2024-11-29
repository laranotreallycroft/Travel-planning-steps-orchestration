package com.odysseus.utils;

import io.jsonwebtoken.Jwt;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class SecurityUtils {

    /**
     * Generates a secure password hash using SHA-256 and a salt.
     *
     * @param password The plain-text password to be hashed.
     * @param salt     The salt used to hash the password, ensuring uniqueness.
     * @return The hashed password as a hexadecimal string.
     */
    public static String getSecurePassword(String password, byte[] salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt);
            byte[] bytes = md.digest(password.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte aByte : bytes) {
                sb.append(Integer.toString((aByte & 0xff) + 0x100, 16).substring(1));
            }
            return sb.toString();

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return "";
    }

    /**
     * Generates a cryptographically secure salt (random byte array) for password hashing.
     *
     * @return A randomly generated salt as a byte array.
     */
    public static byte[] getSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }

    /**
     * Verifies if the provided raw password matches the stored password hash.
     *
     * @param rawPassword        The raw password provided by the user.
     * @param storedPasswordHash The hashed password stored in the database.
     * @param salt               The salt used for hashing the password.
     * @return true if the password matches, false otherwise.
     */
    public static boolean verifyPassword(String rawPassword, String storedPasswordHash, byte[] salt) {
        String hashedPassword = getSecurePassword(rawPassword, salt);
        return hashedPassword.equals(storedPasswordHash);
    }
    
}
