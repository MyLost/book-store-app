package org.npd21tech.repositories;

import org.npd21tech.dtos.BookGenreResponse;
import org.npd21tech.entities.BookGenreEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends JpaRepository<BookGenreEntity, Long> {

    BookGenreEntity findByName(String name);
}
