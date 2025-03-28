package org.npd21tech.services;

import java.util.List;

import org.npd21tech.dtos.BookGenreResponse;
import org.npd21tech.dtos.BookRequest;
import org.npd21tech.dtos.BookResponse;
import org.npd21tech.params.BookSearchParams;
import org.npd21tech.params.PagedList;
import org.npd21tech.params.PagedParams;

public interface BookService {

    PagedList<BookResponse> getPagedList(PagedParams params);

    List<BookResponse> getAll(BookSearchParams bookSearchParams);

    List<BookResponse> getAllPromotion();

    List<BookGenreResponse> getAllGenre();

    void loadBooks();

    BookResponse save(BookRequest bookRequest);

    BookResponse getById(Long id);

    BookResponse update(Long id, BookRequest bookRequest);

    void delete(Long id);

    PagedList<BookResponse> getPagedListByGenre(PagedParams params, Long genreId);
}
