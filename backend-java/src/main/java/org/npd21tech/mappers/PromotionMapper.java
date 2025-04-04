package org.npd21tech.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.npd21tech.dtos.PromotionRequest;
import org.npd21tech.dtos.PromotionResponse;
import org.npd21tech.entities.PromotionsEntity;
import org.npd21tech.repositories.PromotionsRepository;
import lombok.Getter;
import lombok.Setter;

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = { PromotionsRepository.class},
    injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
public interface PromotionMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "modifiedDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "modifiedBy", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "promotionItemId", source = "itemId")
    @Mapping(target = "discountPrice", source = "discountValue")
    PromotionsEntity fromRequest(PromotionRequest promotionRequest);

    PromotionResponse fromEntity(PromotionsEntity entity);
}
