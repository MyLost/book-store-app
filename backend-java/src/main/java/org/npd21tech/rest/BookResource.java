package org.npd21tech.rest;

import java.io.IOException;
import java.util.List;

import org.npd21tech.dtos.BookGenreResponse;
import org.npd21tech.dtos.BookRequest;
import org.npd21tech.dtos.BookResponse;
import org.npd21tech.dtos.DeleteResponse;
import org.npd21tech.params.BookSearchParams;
import org.npd21tech.params.PagedList;
import org.npd21tech.params.PagedParams;
import org.npd21tech.services.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/books")
public class BookResource {

    private final BookService bookService;

    public BookResource(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<List<BookResponse>> fetchAll() throws IOException {
        return ResponseEntity.ok().body(bookService.getAll(null));
    }

    @GetMapping(path = "/most-popular")
    public ResponseEntity<List<BookResponse>> fetchMostPopular() throws IOException {
        return ResponseEntity.ok().body(bookService.getAll(null));
    }

    @PostMapping(path="/genre/{genreId}")
    public ResponseEntity<PagedList<BookResponse>> fetchPagedListByGenre(@RequestBody PagedParams params, @PathVariable Long genreId) {
        return ResponseEntity.ok().body(bookService.getPagedListByGenre(params, genreId));
    }

    @PostMapping(path = "/paged-list")
    public ResponseEntity<PagedList<BookResponse>> fetchPagedList(@RequestBody PagedParams params) throws IOException {
        var result = bookService.getPagedList(params);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponse> fetchById(@PathVariable Long id) throws IOException {
        return ResponseEntity.ok().body(bookService.getById(id));
    }

    @PostMapping("/search")
    public ResponseEntity<List<BookResponse>> search(@RequestBody BookSearchParams bookSearchParams) throws IOException {
        return ResponseEntity.ok().body(bookService.getAll(bookSearchParams));
    }

    @PostMapping("/{id}")
    public ResponseEntity<BookResponse> update(@PathVariable Long id, @RequestBody BookRequest bookRequest) throws IOException {
        return ResponseEntity.ok().body(bookService.update(id, bookRequest));
    }

    @PostMapping
    public ResponseEntity<BookResponse> save(@RequestBody BookRequest bookRequest) throws IOException {
        return ResponseEntity.ok().body(bookService.save(bookRequest));
    }

    @GetMapping("/promotions")
    public ResponseEntity<List<BookResponse>> fetchAllPromotions() throws IOException {
        return ResponseEntity.ok().body(bookService.getAllPromotion());
    }

    @GetMapping("/genres")
    public ResponseEntity<List<BookGenreResponse>> fetchAllGenres() throws IOException {
        return ResponseEntity.ok().body(bookService.getAllGenre());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteResponse> delete(@PathVariable Long id) throws IOException {
        this.bookService.delete(id);
        return ResponseEntity.ok().body(DeleteResponse.builder().success(true).message("Book was deleted successfully").build());
    }
}
