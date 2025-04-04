package org.npd21tech.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.npd21tech.enums.Roles;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Validated
@Table(name="users")
@NoArgsConstructor
@AllArgsConstructor
public class UsersEntity implements UserDetails {

    @Id
    private UUID id;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column
    private String username;

    @Column
    private String password;

    @Column(name="born_on")
    private LocalDate bornOn;

    @Column
    private String email;

    @Column(name="is_active")
    private boolean isActive;

    @Column
    private Roles role;

    @Column(name="phone_number")
    private String phoneNumber;

    @OneToMany(targetEntity=ApiTokenEntity.class, mappedBy="user")
    @Column(name="api_tokens")
    private List<ApiTokenEntity> apiTokens;

    @Column(name="google_email")
    private String googleEmail;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
