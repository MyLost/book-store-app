package org.npd21tech.security;

import java.util.Optional;
import java.util.UUID;

import org.npd21tech.entities.UsersEntity;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuditorProvider implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null ||
            !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken
        ) {
            return Optional.empty();
        }

        UsersEntity user = (UsersEntity) authentication.getPrincipal();
        return Optional.ofNullable(user.getId().toString());
    }
}
