package org.npd21tech.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Entity
@Getter
@Setter
@Table(name = "book_genres", schema = "bookStore")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookGenreEntity extends BaseEntity {

    @Column
    private String name;

    @Column
    private String descriptions;

}
