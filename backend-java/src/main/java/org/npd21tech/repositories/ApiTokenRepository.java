package org.npd21tech.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.npd21tech.entities.ApiTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ApiTokenRepository extends JpaRepository<ApiTokenEntity, Long> {

    @Query(value = """
      select t from ApiTokenEntity t inner join UsersEntity u
      on t.user.id = u.id
      where u.id = :id and (t.expired = false or t.revoked = false)
      """)
    List<ApiTokenEntity> findAllValidTokenByUser(UUID id);

    Optional<ApiTokenEntity> findByToken(String token);
}
