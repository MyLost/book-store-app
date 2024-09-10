package org.npd21tech.services;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

import org.npd21tech.models.AuthenticationResponseModel;
import org.npd21tech.models.LoginModel;
import org.npd21tech.models.RegisterModel;

public interface AuthenticationService {

    AuthenticationResponseModel register(RegisterModel registerModel);
    AuthenticationResponseModel authenticate(LoginModel loginModel);
    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;
}
