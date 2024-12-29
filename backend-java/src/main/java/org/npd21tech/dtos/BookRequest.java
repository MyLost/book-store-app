package org.npd21tech.dtos;

import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class BookRequest {

    private String author;
    private String title;
    private BigDecimal price;
    private Long genreId;
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
