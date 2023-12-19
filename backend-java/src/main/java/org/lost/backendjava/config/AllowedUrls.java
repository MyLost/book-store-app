package org.lost.backendjava.config;

import lombok.Getter;

public class AllowedUrls {

    private static final String[] allowedUrls = {
        "/api/v1/auth/**",
        "/api/v1/test"
    };

    @Getter
    private static final String logOutUrl = "/api/v1/auth/logout";

    public static String[] getAllowedUrls() {
        return allowedUrls;
    }
}
