package org.npd21tech.repositories;

import org.npd21tech.entities.PromotionsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionsRepository extends JpaRepository<PromotionsEntity, Long> {

}
