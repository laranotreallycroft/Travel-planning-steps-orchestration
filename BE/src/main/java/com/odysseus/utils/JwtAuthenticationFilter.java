package com.odysseus.utils;

import com.odysseus.model.User;
import com.odysseus.model.payload.common.JwtAuthenticationToken;
import com.odysseus.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    /**
     * doFilterInternal method is called for every incoming HTTP request.
     * It checks for the presence of a JWT in the Authorization header, extracts the relevant information,
     * and sets the SecurityContext with the authenticated user if the JWT is valid.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String authorizationHeader = request.getHeader("Authorization");

        String email = null;
        boolean isGoogleUser = false;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            email = jwtUtil.extractEmail(jwt);
            isGoogleUser = jwtUtil.extractIsGoogleUser(jwt);
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userRepository.findByEmail(email, isGoogleUser);

            if (user != null && jwtUtil.validateToken(jwt, email, isGoogleUser)) {
                var authentication = new JwtAuthenticationToken(user, jwt);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

        }

        chain.doFilter(request, response);
    }
}

