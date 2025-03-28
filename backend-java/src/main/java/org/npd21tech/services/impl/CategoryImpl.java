package org.npd21tech.services.impl;

import java.util.List;

import org.npd21tech.entities.CategoryEntity;
import org.npd21tech.repositories.BookRepository;
import org.npd21tech.repositories.CategoryRepository;
import org.npd21tech.services.CategoryService;
import org.springframework.stereotype.Service;

@Service
public class CategoryImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<CategoryEntity> getList() {
        return categoryRepository.findAll();
    }
}
