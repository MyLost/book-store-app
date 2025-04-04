package org.npd21tech.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.npd21tech.enums.PromotionType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PromotionRequest {

    private String description;
    private BigDecimal discountValue;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private PromotionType promotionType;
    private BigDecimal price;
    private Long itemId;
}
