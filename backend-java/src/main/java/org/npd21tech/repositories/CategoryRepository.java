package org.npd21tech.repositories;

import java.util.UUID;

import org.npd21tech.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, UUID> {
}
