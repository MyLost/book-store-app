package org.npd21tech.dtos;

import java.math.BigDecimal;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;
import org.npd21tech.enums.InventoryStatus;
import org.npd21tech.enums.PriceStatus;

@Getter
@Setter
public class BookResponse {

    private String id;
    private String author;
    private String title;
    private BigDecimal price;
    private BookGenreResponse genre;
    private String cover;
    private Integer numberOfBooks;
    private InventoryStatus inventoryStatus;
    private PriceStatus priceStatus;
    private String coverImage;
}
