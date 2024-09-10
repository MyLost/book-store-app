package org.npd21tech.rest;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/test")
@RequiredArgsConstructor
public class TestResource {

    @GetMapping("system-test")
    public ResponseEntity<Map<String, String>> testSystem() {
        return ResponseEntity.ok(Map.of("success", "Test message for properly working backend process!!!"));
    }
}
