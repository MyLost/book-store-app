package org.npd21tech.dtos;

import java.awt.print.Book;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.npd21tech.entities.BookEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PromotionResponse {

    private BookResponse book;

    private BigDecimal price;

    private BigDecimal discountPrice;

    private String description;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private boolean active;
}
