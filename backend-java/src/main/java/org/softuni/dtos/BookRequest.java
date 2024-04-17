package org.softuni.dtos;

import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookRequest {

    private String author;
    private String title;
    private BigDecimal price;
    private Long genreId;
    private String cover;
    private Integer numberOfBooks;
}
