package org.npd21tech.dtos;

import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

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
}
