package org.npd21tech.params;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Sort;

@Setter
public class PagedParams {
    @Getter
    private Integer page;
    @Getter
    private Integer rows;
    private Sort sort;

    public Sort getSort() {
        if (sort == null) {
           return Sort.by(Sort.Order.asc("price"));
        }
        return sort;
    }

}
