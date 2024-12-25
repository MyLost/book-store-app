package org.npd21tech.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.npd21tech.enums.TokenType;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "api_token", schema = "bookStore")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApiTokenEntity extends BaseEntity {

    @Column
    private String token;

    @Column
    private LocalDateTime expiredAt;

    @ManyToOne(targetEntity= UsersEntity.class, fetch = FetchType.LAZY )
    @JoinColumn(nullable=false)
    private UsersEntity user;

    @Enumerated(EnumType.STRING)
    TokenType tokenType;

    @Column
    public boolean revoked;

    @Column
    public boolean expired;
}
