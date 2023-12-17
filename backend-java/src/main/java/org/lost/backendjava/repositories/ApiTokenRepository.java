package org.lost.backendjava.repositories;

import org.lost.backendjava.entities.ApiTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApiTokenRepository extends JpaRepository<ApiTokenEntity, Long> {
}
