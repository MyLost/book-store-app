package org.npd21tech.services;

import io.jsonwebtoken.Claims;
import java.util.Map;
import java.util.function.Function;

import org.npd21tech.entities.UsersEntity;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {

    UsersEntity extractUser(String token);

    String extractUsername(String token);

    <T> T extractClaim(String token, Function<Claims, T> claimsResolver);

    String generateToken(UserDetails userDetails);

    String generateToken(Map<String, Object> extraClaims, UserDetails userDetails);

    String generateRefreshToken(UserDetails userDetails);

    boolean isTokenValid(String token, UserDetails userDetails);
}
