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

import java.util.Arrays;
import java.util.Base64;

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

    public BookResponse toDto(BookEntity bookEntity) {

        final var genre = bookEntity.getGenre();

        final var response = BookResponse.builder()
            .author(bookEntity.getAuthor())
            .cover(bookEntity.getCover().name())
            .id(bookEntity.getId())
            .genre(BookGenreResponse.builder()
                .id(genre.getId())
                .name(genre.getName())
                .descriptions(genre.getDescriptions())
                .build())
            .price(bookEntity.getPrice())
            .title(bookEntity.getTitle())
            .numberOfBooks(bookEntity.getNumberOfBooks())
            .coverImage(coverImageMapping(bookEntity.getCoverImage()))
            .inventoryStatus(bookEntity.getInventoryStatus())
            .priceStatus(bookEntity.getPriceStatus())
            .build();
        return response;
    }

    @Mapping(target = "genre", source = "genreRequest.id", qualifiedByName = "GenreMapping")
    @Mapping(target = "coverImage", ignore = true)
    @Mapping(target = "rating", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "promotion", ignore = true)
    @Mapping(target = "inventoryStatus", ignore = true)
    @Mapping(target = "priceStatus", ignore = true)

    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "modifiedDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "modifiedBy", ignore = true)
    public abstract BookEntity fromDto(BookRequest bookRequest);

    public abstract BookGenreResponse toGenreDto(BookGenreEntity bookGenreEntity);

    @Named("GenreMapping")
    public BookGenreEntity toGenreEntity(Long id) {
        return this.genreRepository.getReferenceById(id);
    }

    public String coverImageMapping(byte[] image) {
        String encodedImage = null;
        if(image != null) {
             encodedImage = Base64.getEncoder().encodeToString(image);
        }
        return encodedImage;
    }

    public byte[] coverImageMapping(String image) {
        return image.getBytes();
    }
}
