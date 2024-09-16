package org.npd21tech.config;

import lombok.Getter;

public class AllowedUrls {

    private static final String[] allowedUrls = {
        "/api/v1/books/most-popular",
        "/api/v1/books/genre/{genreId}",
        "/api/v1/books/paged-list",
        "/api/v1/books/genres",
        "/api/v1/auth/**",
        "/api/v1/test/**",
        "/v2/api-docs",
        "/v3/api-docs",
        "/v3/api-docs/**",
        "/swagger-resources",
        "/swagger-resources/**",
        "/configuration/ui",
        "/configuration/security",
        "/swagger-ui/**",
        "/webjars/**",
        "/swagger-ui.html"
    };
    @Getter
    private static final String logOutUrl = "/api/v1/auth/logout";

    public static String[] getAllowedUrls() {
        return allowedUrls;
    }
}
