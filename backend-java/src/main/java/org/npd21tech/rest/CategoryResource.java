package org.npd21tech.rest;

import java.util.List;

import org.npd21tech.entities.CategoryEntity;
import org.npd21tech.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class CategoryResource {

    private CategoryService categoryService;

    public CategoryResource(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/categories")
    ResponseEntity<List<CategoryEntity>> fetchAll() {
        final var categories = categoryService.getList();
        return  ResponseEntity.ok().body(categories);
    }
}
