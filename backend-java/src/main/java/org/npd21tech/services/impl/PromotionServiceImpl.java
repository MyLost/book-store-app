package org.npd21tech.services.impl;

import java.util.List;

import org.npd21tech.dtos.PromotionRequest;
import org.npd21tech.dtos.PromotionResponse;
import org.npd21tech.mappers.PromotionMapper;
import org.npd21tech.repositories.PromotionsRepository;
import org.npd21tech.services.PromotionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PromotionServiceImpl implements PromotionService {

    private final PromotionsRepository promotionsRepository;
    private final PromotionMapper promotionMapper;

    public PromotionServiceImpl(PromotionsRepository promotionsRepository, PromotionMapper promotionMapper) {
        this.promotionsRepository = promotionsRepository;
        this.promotionMapper = promotionMapper;
    }

    @Override
    public List<PromotionResponse> getList() {
        var response = promotionsRepository.findAll();
        return response.stream().map(promotionMapper::fromEntity).toList();
    }

    @Override
    @Transactional
    public PromotionResponse save(PromotionRequest promotionRequest) {
        final var entity = promotionMapper.fromRequest(promotionRequest);
        promotionsRepository.save(entity);
        final var response = promotionMapper.fromEntity(entity);

        return response;
    }
}
