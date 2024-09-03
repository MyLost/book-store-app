package org.npd21tech.dtos;

import java.time.LocalDate;
import java.util.UUID;

import org.npd21tech.enums.Roles;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {

    private UUID id;
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private LocalDate bornOn;
    private String email;
    private boolean isActive;
    private Roles role;
    private String phoneNumber;
    private String google_email;
}
