package org.softuni.rest;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

import lombok.RequiredArgsConstructor;
import org.softuni.models.AuthenticationResponseModel;
import org.softuni.models.LoginModel;
import org.softuni.models.RegisterModel;
import org.softuni.services.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationResource {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseModel> register(@RequestBody RegisterModel registerModel) {
        return ResponseEntity.ok(authenticationService.register(registerModel));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseModel> authenticate(@RequestBody LoginModel loginModel) {
        return ResponseEntity.ok(authenticationService.authenticate(loginModel));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        authenticationService.refreshToken(request, response);
    }
}
