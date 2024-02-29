package org.lost.backendjava.security;

import java.util.Optional;
import java.util.UUID;
import org.lost.backendjava.entities.UsersEntity;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuditorProvider implements AuditorAware<UUID> {

    @Override
    public Optional<UUID> getCurrentAuditor() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null ||
            !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken
        ) {
            return Optional.empty();
        }

        UsersEntity user = (UsersEntity) authentication.getPrincipal();
        return Optional.ofNullable(user.getId());
    }
}
