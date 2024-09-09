package org.npd21tech.models;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterModel {

    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String confirmPassword;
    private LocalDate bornOn;
}
