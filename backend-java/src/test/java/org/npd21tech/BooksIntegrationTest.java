package org.npd21tech;

import java.math.BigDecimal;

import jakarta.annotation.Priority;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.npd21tech.dtos.BookGenreRequest;
import org.npd21tech.dtos.BookRequest;
import org.npd21tech.enums.BookCover;
import org.npd21tech.params.BookSearchParams;
import org.npd21tech.params.GenreParams;
import org.npd21tech.services.BookService;
import org.npd21tech.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

@SpringBootTest
@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
public class BooksIntegrationTest {

    private final BookService bookService;
    private final GenreService genreService;

    @Autowired
    public BooksIntegrationTest(BookService bookService, GenreService genreService) {
        this.bookService = bookService;
        this.genreService = genreService;
    }

    @BeforeEach
    void setUp() {
    }

    @Test
    @Priority(0)
    public void testBookList() {
        final var params = BookSearchParams.builder().author("J. R. R. Tolkien").title("The Hobbit").build();
        final var books = bookService.getAll(params);
        assertThat(books.size()).isGreaterThan(0);
    }

    @Test
    @Priority(1)
    @Transactional
    @Rollback(false)
    public void saveBook() {

        final var genreParams = GenreParams.builder().name("Fiction").build();

        final var genre = genreService.geGenre(genreParams);

        final var book = BookRequest.builder()
            .author("Test")
            .numberOfBooks(100)
            .cover(BookCover.HARD.name())
            .title("Test title")
            .price(BigDecimal.valueOf(1234))
            .genreRequest(new BookGenreRequest(genre.getId()))
            .build();

        final var bookResponse = bookService.save(book);

        assertThat(bookResponse).isNotNull();
    }

    @Test
    @Transactional
    @Priority(2)
    public void findBook() {

        final var book = bookService.getAll(BookSearchParams.builder().title("Test title").author("Test").build());

        assertThat(book).isNotNull();
    }

    @Test
    @Priority(3)
    public void deleteBook() {

        final var books = bookService.getByParams(BookSearchParams.builder().title("Test title").author("Test").build());

        bookService.delete(books.getId());

        assertThatThrownBy(() -> bookService.getById(books.getId())).isInstanceOf(Exception.class);
    }
}
