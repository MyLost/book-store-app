package org.npd21tech.exceptions;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class BaseExceptionHandler {

    @ExceptionHandler({ Exception.class })
    public final ResponseEntity<ApiErrorResponse> handleException(Exception ex, WebRequest request) {

        ex.printStackTrace();

        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.NOT_FOUND;

        return new ResponseEntity<>(
            ApiErrorResponse.builder()
            .error("Unexpected server error")
            .message("Unexpected server error")
            .httpStatusCode(HttpStatus.NOT_FOUND)
            .path(request.getContextPath())
            .timestamp(System.currentTimeMillis())
            .build(), headers, status);
    }
}
