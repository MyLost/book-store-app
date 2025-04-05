package org.npd21tech.dtos;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
public class BookRequest {

    private String author;
    private String title;
    private BigDecimal price;
    private BookGenreRequest genreRequest;
    private String cover;
    private Integer numberOfBooks;
    private ImageRequest coverImage;

    @Getter
    @Setter
    public static class ImageRequest {
        private String image;
        private String name;
    }
}
