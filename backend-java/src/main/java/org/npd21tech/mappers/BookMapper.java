package org.npd21tech.mappers;

import lombok.Getter;
import lombok.Setter;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;
import org.npd21tech.dtos.BookGenreResponse;
import org.npd21tech.dtos.BookRequest;
import org.npd21tech.dtos.BookResponse;
import org.npd21tech.entities.BookEntity;
import org.npd21tech.entities.BookGenreEntity;
import org.npd21tech.repositories.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = {GenreRepository.class},
    injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
@Getter
@Setter
public abstract class BookMapper {

    @Autowired
    private GenreRepository genreRepository;

    public abstract BookResponse toDto(BookEntity bookEntity);

    @Mapping(target = "genre", source = "genreId", qualifiedByName = "genreMapping")
    public abstract BookEntity fromDto(BookRequest bookRequest);

    public abstract BookGenreResponse toGenreDto(BookGenreEntity bookGenreEntity);

    @Named("genreMapping")
    public BookGenreEntity toGenreEntity(Long id) {
        return this.genreRepository.getReferenceById(id);
    }
}
