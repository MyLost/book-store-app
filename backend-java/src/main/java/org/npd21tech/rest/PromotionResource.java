package org.npd21tech.rest;

import java.io.IOException;
import java.util.List;

import org.npd21tech.dtos.GeneralResponse;
import org.npd21tech.dtos.PromotionRequest;
import org.npd21tech.dtos.PromotionResponse;
import org.npd21tech.services.PromotionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class PromotionResource {

    private final PromotionService promotionService;

    public PromotionResource(PromotionService promotionService) {
        this.promotionService = promotionService;
    }

    @GetMapping("/promotions")
    ResponseEntity<List<PromotionResponse>> fetchAll() {
        final var promotions = promotionService.getList();
        return  ResponseEntity.ok().body(promotions);
    }

    @PostMapping("/promotions")
    public ResponseEntity<GeneralResponse> save(@RequestBody PromotionRequest promotionRequest) throws IOException {
        promotionService.save(promotionRequest);
        return GeneralResponse.success();
    }
}
