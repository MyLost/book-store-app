package org.lost.backendjava.dtos;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookGenreResponse {

    private Long id;
    private String name;
    private String descriptions;
}
