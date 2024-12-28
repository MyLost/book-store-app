package org.npd21tech.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="comments", schema = "bookStore")
@AllArgsConstructor
@NoArgsConstructor
public class CommentEntity extends BaseEntity {

    @Column
    private String authorName;

    @Column
    private String content;

    @ManyToOne(targetEntity= ArticleEntity.class)
    @JoinColumn(nullable=false)
    private ArticleEntity article;
}
