package org.npd21tech.services.impl;

import java.util.List;

import org.npd21tech.dtos.BookGenreResponse;
import org.npd21tech.mappers.GenreMapper;
import org.npd21tech.params.GenreParams;
import org.npd21tech.repositories.GenreRepository;
import org.npd21tech.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GenreServiceImpl implements GenreService {

    private final GenreRepository genreRepository;
    private final GenreMapper genreMapper;

    @Autowired
    public GenreServiceImpl(GenreRepository genreRepository, GenreMapper genreMapper) {
        this.genreRepository = genreRepository;
        this.genreMapper = genreMapper;
    }

    @Override
    public List<BookGenreResponse> getAllGenre() {
        return genreRepository.findAll().stream().map(genreMapper::toGenreDto).toList();
    }

    @Override
    public List<BookGenreResponse> geGenreById() {
        return List.of();
    }

    @Override
    public List<BookGenreResponse> geGenres(GenreParams params) {
        // need params processor
        return genreRepository.findAll().stream().map(genreMapper::toGenreDto).toList();
    }

    @Override
    public BookGenreResponse geGenre(GenreParams genreParams) {
        final var entity = genreRepository.findByName(genreParams.getName());
        final var dto = genreMapper.toGenreDto(entity);
        return dto;
    }
}
