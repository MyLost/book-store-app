package org.softuni.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "articles")
@AllArgsConstructor
public class ArticleEntity extends BaseEntity {

    @Column
    private String title;

    @Column(length=100)
    private String slug;

    @Column
    private String content;

    @Column
    private LocalDateTime publishedAt;

    @OneToMany(targetEntity=CommentEntity.class, mappedBy="article")
    private List<CommentEntity> comments;

    public ArticleEntity() {
        this.comments = new ArrayList<>();
    }
}
