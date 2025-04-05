package org.npd21tech.services;

import java.util.List;

import org.npd21tech.dtos.BookGenreResponse;
import org.npd21tech.params.GenreParams;

public interface GenreService {

    List<BookGenreResponse> getAllGenre();

    List<BookGenreResponse> geGenreById();

    List<BookGenreResponse> geGenres(GenreParams params);

    BookGenreResponse geGenre(GenreParams genreParams);
}
