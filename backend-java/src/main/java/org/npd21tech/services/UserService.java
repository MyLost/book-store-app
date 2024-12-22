package org.npd21tech.services;

import java.util.UUID;

import org.npd21tech.dtos.UserEditRequest;
import org.npd21tech.dtos.UserEditResponse;
import org.npd21tech.dtos.UserResponse;

public interface UserService {

    UserResponse findUser(UUID id);

    UserEditResponse editUser(UserEditRequest userEditRequest);
}
