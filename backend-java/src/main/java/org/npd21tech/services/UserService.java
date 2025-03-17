package org.npd21tech.services;

import org.npd21tech.dtos.UserEditRequest;
import org.npd21tech.dtos.UserEditResponse;
import org.npd21tech.dtos.UserResponse;

import java.util.UUID;

public interface UserService {
    UserResponse findUser(UUID uuid);

    UserEditResponse editUser(UserEditRequest userEditRequest);
}
