package org.softuni.services;

import java.util.List;
import org.softuni.dtos.BookResponse;
import org.softuni.dtos.BookGenreResponse;
import org.softuni.dtos.BookRequest;
import org.softuni.params.BookSearchParams;

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
