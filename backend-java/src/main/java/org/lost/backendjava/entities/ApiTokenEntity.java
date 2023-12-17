package org.lost.backendjava.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "api_token")
public class ApiTokenEntity extends BaseEntity {

    @Column
    private String token;

    @Column(nullable = false)
    private LocalDateTime expiredAt;

    @ManyToOne(targetEntity= UsersEntity.class)
    @JoinColumn(nullable=false)
    private UsersEntity user;
}
