package org.softuni.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.softuni.enums.BookCover;

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

    @Column(columnDefinition = "boolean default false")
    private boolean promotion;

    @ManyToOne
    private BookGenreEntity genre;

    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private BookCover cover;

    private Integer numberOfBooks;
}
