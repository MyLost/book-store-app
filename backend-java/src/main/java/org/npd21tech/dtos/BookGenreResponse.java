package org.npd21tech.dtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class BookGenreResponse {

    private Long id;
    private String name;
    private String descriptions;
}
