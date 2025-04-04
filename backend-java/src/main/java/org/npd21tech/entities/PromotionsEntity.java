package org.npd21tech.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.ColumnDefault;
import org.npd21tech.enums.PromotionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="promotions", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"promotion_item_id", "active", "start_date", "end_date"})
})
@AllArgsConstructor
@NoArgsConstructor
public class PromotionsEntity extends BaseEntity {

    @Column(name="promotion_type")
    @NotNull
    @Enumerated(EnumType.STRING)
    private PromotionType promotionType;

    @Column(name="promotion_item_id")
    private Long promotionItemId;

    @NotNull
    private BigDecimal price;

    @Column(name="discount_price")
    @NotNull
    private BigDecimal discountPrice;

    private String description;

    @NotNull
    @Column(name="start_date")
    private LocalDateTime startDate;

    @NotNull
    @Column(name="end_date")
    private LocalDateTime endDate;

    @ColumnDefault("false")
    @Column(nullable = false)
    private boolean active;

}
