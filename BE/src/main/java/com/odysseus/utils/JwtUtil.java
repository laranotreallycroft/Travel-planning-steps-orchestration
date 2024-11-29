package com.odysseus.utils;

import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Generate a secure key

    public String generateToken(String email, boolean isGoogleUser) {
        return Jwts.builder()
                .setClaims(Map.of("email", email, "isGoogleUser", isGoogleUser)) // Add custom claims
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 1 day validity
                .signWith(key)
                .compact();
    }

    public Map<String, Object> extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractEmail(String token) {
        return (String) extractAllClaims(token).get("email");
    }

    public boolean extractIsGoogleUser(String token) {
        return (Boolean) extractAllClaims(token).get("isGoogleUser");
    }

    public boolean validateToken(String token, String email, boolean isGoogleUser) {
        return email.equals(extractEmail(token)) &&
                isGoogleUser == extractIsGoogleUser(token) &&
                !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }

  
}
