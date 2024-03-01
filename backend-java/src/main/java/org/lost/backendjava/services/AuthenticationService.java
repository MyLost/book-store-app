package org.lost.backendjava.services;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.lost.backendjava.entities.UsersEntity;
import org.lost.backendjava.models.AuthenticationResponseModel;
import org.lost.backendjava.models.LoginModel;
import org.lost.backendjava.models.RegisterModel;

public interface AuthenticationService {

    AuthenticationResponseModel register(RegisterModel registerModel);
    AuthenticationResponseModel authenticate(LoginModel loginModel);
    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;
}
