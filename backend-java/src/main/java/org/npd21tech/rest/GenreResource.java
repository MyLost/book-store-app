package org.npd21tech.rest;

import java.io.IOException;
import java.util.List;

import org.npd21tech.dtos.BookGenreResponse;
import org.npd21tech.services.GenreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class GenreResource {

    private final GenreService genreService;

    public GenreResource(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping("/genres")
    public ResponseEntity<List<BookGenreResponse>> fetchAllGenres() throws IOException {
        return ResponseEntity.ok().body(genreService.getAllGenre());
    }
}
