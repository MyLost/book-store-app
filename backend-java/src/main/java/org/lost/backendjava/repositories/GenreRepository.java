package org.lost.backendjava.repositories;

import org.lost.backendjava.entities.BookGenreEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends JpaRepository<BookGenreEntity, Long> {
}
