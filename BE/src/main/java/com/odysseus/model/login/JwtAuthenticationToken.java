package com.odysseus.model.login;

import org.springframework.security.authentication.AbstractAuthenticationToken;

/**
 * Custom authentication token used to represent the authenticated user from a JWT.
 * This class holds the user details and the JWT token that authenticated the user.
 */
public class JwtAuthenticationToken extends AbstractAuthenticationToken {

    private final Object principal; // The authenticated user (usually a User object)
    private final String credentials; // The JWT token itself

    /**
     * Constructor for JwtAuthenticationToken when the user is authenticated.
     *
     * @param principal   The authenticated user.
     * @param credentials The JWT token.
     */
    public JwtAuthenticationToken(Object principal, String credentials) {
        super(null); // Set authorities (roles/permissions) for the user. NONE FOR NOW
        this.principal = principal; // Set the user (principal)
        this.credentials = credentials; // Set the JWT token
        setAuthenticated(true); // Mark this token as authenticated
    }

    /**
     * Constructor for JwtAuthenticationToken when the user is not yet authenticated.
     * This is used before the JWT is validated.
     *
     * @param credentials The JWT token to be validated.
     */
    public JwtAuthenticationToken(String credentials) {
        super(null); // No authorities yet, as the token is not authenticated
        this.credentials = credentials; // Set the JWT token
        this.principal = null; // Principal will be set later after validation
        setAuthenticated(false); // Mark this token as not authenticated
    }

    @Override
    public Object getCredentials() {
        return credentials; // Return the JWT token
    }

    @Override
    public Object getPrincipal() {
        return principal; // Return the authenticated user (principal)
    }
}
