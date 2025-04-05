package org.npd21tech.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.npd21tech.dtos.BookGenreResponse;
import org.npd21tech.entities.BookGenreEntity;
import lombok.Getter;
import lombok.Setter;

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
@Getter
@Setter
public abstract class GenreMapper {

    public abstract BookGenreResponse toGenreDto(BookGenreEntity bookGenreEntity);

}
