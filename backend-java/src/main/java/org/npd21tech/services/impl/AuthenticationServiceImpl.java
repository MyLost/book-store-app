package org.npd21tech.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

import org.npd21tech.entities.ApiTokenEntity;
import org.npd21tech.entities.UsersEntity;
import org.npd21tech.enums.Roles;
import org.npd21tech.enums.TokenType;
import org.npd21tech.mappers.UserMapper;
import org.npd21tech.models.AuthenticationResponseModel;
import org.npd21tech.models.LoginModel;
import org.npd21tech.models.RegisterModel;
import org.npd21tech.repositories.ApiTokenRepository;
import org.npd21tech.repositories.UserRepository;
import org.npd21tech.services.AuthenticationService;
import org.npd21tech.services.JwtService;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final ApiTokenRepository apiTokenRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationServiceImpl(
            UserMapper userMapper, UserRepository userRepository, JwtService jwtService, ApiTokenRepository apiTokenRepository,
            AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder
    ) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.apiTokenRepository = apiTokenRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public AuthenticationResponseModel register(RegisterModel registerModel) {
        registerModel.setPassword(passwordEncoder.encode(registerModel.getPassword()));
        UsersEntity usersEntity = userMapper.fromDto(registerModel);
        usersEntity.setRole(Roles.USER);
        this.userRepository.save(usersEntity);
        var jwtToken = jwtService.generateToken(usersEntity);
        var refreshToken = jwtService.generateRefreshToken(usersEntity);
        this.saveUserToken(usersEntity, jwtToken);
        return AuthenticationResponseModel.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .build();
    }

    private void saveUserToken(UsersEntity user, String jwtToken) {
        var token = ApiTokenEntity.builder()
            .user(user)
            .token(jwtToken)
            .tokenType(TokenType.BEARER)
            .expired(false)
            .revoked(false)
            .build();
        apiTokenRepository.save(token);
    }

    private void revokeAllUserTokens(UsersEntity user) {
        var validUserTokens = apiTokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        apiTokenRepository.saveAll(validUserTokens);
    }


    @Override
    public AuthenticationResponseModel authenticate(LoginModel loginModel) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    loginModel.getUsername(),
                    loginModel.getPassword()
            )
        );

        var user = userRepository.findByUsername(loginModel.getUsername())
            .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponseModel.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .build();
    }

    @Override
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String username;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        username = jwtService.extractUsername(refreshToken);
        if (username != null) {
            var user = this.userRepository.findByUsername(username)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponseModel.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
