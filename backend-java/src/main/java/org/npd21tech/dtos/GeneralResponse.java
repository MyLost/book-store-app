package org.npd21tech.dtos;

import java.util.List;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class GeneralResponse {

    private boolean result;
    private String message;

    public static ResponseEntity<GeneralResponse> success() {
        return new ResponseEntity<GeneralResponse>( GeneralResponse.builder()
            .result(true)
            .message("success")
            .build(), HttpStatusCode.valueOf(200));
    }
}
