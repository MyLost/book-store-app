package org.npd21tech.repositories;

import java.util.Optional;
import java.util.UUID;

import org.npd21tech.entities.UsersEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UsersEntity, UUID> {

    Optional<UsersEntity> findByUsername(String username);

    Page<UsersEntity> findAll(Pageable pageable);

}
