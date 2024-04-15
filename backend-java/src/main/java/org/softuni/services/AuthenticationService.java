package org.softuni.services;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

import org.softuni.models.AuthenticationResponseModel;
import org.softuni.models.LoginModel;
import org.softuni.models.RegisterModel;

public interface AuthenticationService {

    AuthenticationResponseModel register(RegisterModel registerModel);
    AuthenticationResponseModel authenticate(LoginModel loginModel);
    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;
}
