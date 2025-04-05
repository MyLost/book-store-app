package org.npd21tech.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.npd21tech.enums.PromotionTypeId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="promotions_types")
@AllArgsConstructor
@NoArgsConstructor
public class PromotionTypes {

    @Id
    @Column(name="promotion_type_id")
    @Enumerated(EnumType.STRING)
    private PromotionTypeId id;

}
