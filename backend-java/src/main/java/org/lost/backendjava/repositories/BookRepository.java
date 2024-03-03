package org.lost.backendjava.repositories;

import java.util.List;
import org.lost.backendjava.entities.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {
    List<BookEntity> findAllByPromotionEquals(boolean promotion);

    List<BookEntity> findAllByAuthorEqualsAndTitleEquals(String author, String title);
}
