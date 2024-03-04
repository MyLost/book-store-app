package org.lost.backendjava.services;

import java.util.List;
import org.lost.backendjava.dtos.BookResponse;
import org.lost.backendjava.dtos.BookGenreResponse;
import org.lost.backendjava.dtos.BookRequest;
import org.lost.backendjava.params.BookSearchParams;

public interface BookService {

    List<BookResponse> getAll(BookSearchParams bookSearchParams);

    List<BookResponse> getAllPromotion();

    List<BookGenreResponse> getAllGenre();

    void loadBooks();

    BookResponse save(BookRequest bookRequest);

    BookResponse getById(Long id);

    BookResponse update(Long id, BookRequest bookRequest);

    void delete(Long id);
}
