package org.npd21tech.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.npd21tech.dtos.BookResponse;
import org.npd21tech.dtos.PromotionRequest;
import org.npd21tech.dtos.PromotionResponse;
import org.npd21tech.entities.PromotionsEntity;
import org.npd21tech.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
public abstract class PromotionMapper {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookMapper bookMapper;


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "modifiedDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "modifiedBy", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "promotionItemId", source = "itemId")
    @Mapping(target = "discountPrice", source = "discountValue")
    public abstract PromotionsEntity fromRequest(PromotionRequest promotionRequest);

    public PromotionResponse fromEntity(PromotionsEntity entity) {

        System.out.println();

        final var bookEntity = bookRepository.findById(entity.getPromotionItemId());
        BookResponse book = null;
        if(bookEntity.isPresent()) {
            book = bookMapper.toDto(bookEntity.get());
        }

        return PromotionResponse.builder()
            .active(entity.isActive())
            .book(book)
            .description(entity.getDescription())
            .discountPrice(entity.getDiscountPrice())
            .endDate(entity.getEndDate())
            .price(entity.getPrice())
            .startDate(entity.getStartDate())
            .build();
    }
}
