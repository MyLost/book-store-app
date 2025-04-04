package org.npd21tech.services;

import java.util.List;

import org.npd21tech.dtos.PromotionRequest;
import org.npd21tech.dtos.PromotionResponse;

public interface PromotionService {

    List<PromotionResponse> getList();
    PromotionResponse save(PromotionRequest promotionRequest);
}
