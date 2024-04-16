package org.softuni.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "book_genres")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookGenreEntity extends BaseEntity {

    @Column
    private String name;

    @Column
    private String descriptions;
}
