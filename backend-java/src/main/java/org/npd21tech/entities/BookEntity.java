package org.npd21tech.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.sql.Blob;
import org.hibernate.annotations.Type;

import org.npd21tech.enums.BookCover;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.npd21tech.enums.InventoryStatus;
import org.npd21tech.enums.PriceStatus;

@Entity
@Getter
@Setter
@Table(name = "books")
@AllArgsConstructor
@NoArgsConstructor
public class BookEntity extends BaseEntity {

    @Column
    private String author;

    @Column
    private String title;

    @Column
    private BigDecimal price;

    @Column
    private boolean promotion;

    @ManyToOne
    private BookGenreEntity genre;

    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private BookCover cover;

    @Column(name="number_of_books")
    private Integer numberOfBooks;

    @OneToOne
    private Ratings rating;

    @Lob
    @Column(name="cover_image")
    private byte[] coverImage;

    @Enumerated(EnumType.STRING)
    @Column(name="inventory_status")
    private InventoryStatus inventoryStatus;

    @Enumerated(EnumType.STRING)
    @Column(name="price_status")
    private PriceStatus priceStatus;

}
