package org.npd21tech.repositories;

import java.util.List;

import org.npd21tech.entities.BookEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {
    List<BookEntity> findAllByPromotionEquals(boolean promotion);

    List<BookEntity> findAllByAuthorEqualsAndTitleEquals(String author, String title);

    Page<BookEntity> findAll(Pageable pageable);

    Page<BookEntity> findAllByGenreId(Pageable pageable, Long genreId);
}
