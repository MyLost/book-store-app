package org.npd21tech.services.impl;

import java.util.UUID;

import org.npd21tech.dtos.UserEditRequest;
import org.npd21tech.dtos.UserEditResponse;
import org.npd21tech.dtos.UserResponse;
import org.npd21tech.mappers.UserMapper;
import org.npd21tech.repositories.UserRepository;
import org.npd21tech.services.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponse findUser(UUID id) {
        var user = this.userRepository.findById(id).get();
        return userMapper.fromEntity(user);
    }

    @Override
    public UserEditResponse editUser(UserEditRequest userEditRequest) {
        if(!userEditRequest.getPassword().equals(userEditRequest.getConfirmPassword())) {
            throw new RuntimeException("Password mismatch");
        }
        var entity = this.userRepository.findById(UUID.fromString(userEditRequest.getId())).get();
        entity.setUsername(userEditRequest.getUsername());
        entity.setPassword(passwordEncoder.encode(userEditRequest.getPassword()));

        this.userRepository.save(entity);

        return UserEditResponse.builder().username(entity.getUsername()).build();
    }
}
