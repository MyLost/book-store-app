package org.npd21tech.rest;

import java.util.UUID;

import org.npd21tech.dtos.UserEditRequest;
import org.npd21tech.dtos.UserEditResponse;
import org.npd21tech.dtos.UserResponse;
import org.npd21tech.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserResource {

    private final UserService userService;

    public UserResource(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> fetchUser(@PathVariable String id) {
        return ResponseEntity.ok().body(userService.findUser(UUID.fromString(id)));
    }

    @PatchMapping
    public ResponseEntity<UserEditResponse> editUser(@RequestBody UserEditRequest userEditRequest) {
        return ResponseEntity.ok().body(userService.editUser(userEditRequest));
    }
}
