package org.lost.backendjava.mappers;

import jakarta.persistence.Convert;
import lombok.Getter;
import lombok.Setter;
import org.lost.backendjava.dtos.BookResponse;
import org.lost.backendjava.dtos.BookGenreResponse;
import org.lost.backendjava.dtos.BookRequest;
import org.lost.backendjava.entities.BookEntity;
import org.lost.backendjava.entities.BookGenreEntity;
import org.lost.backendjava.repositories.GenreRepository;
import org.mapstruct.AfterMapping;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;
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
