package org.npd21tech.exceptions;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class BaseExceptionHandler {

    @ExceptionHandler({ Exception.class })
    public final ResponseEntity<ApiErrorResponse> handleAllExceptions(Exception ex, WebRequest request) {

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

    // Handle Hibernate Constraint Violations
    @ExceptionHandler({ ConstraintViolationException.class, DataIntegrityViolationException.class})
    public ResponseEntity<ApiErrorResponse> handleConstraintViolation(Exception ex) {
        String message = "Data integrity violation";

        if (ex instanceof ConstraintViolationException) {
            ConstraintViolationException constraintViolationEx = (ConstraintViolationException) ex;
            message = constraintViolationEx.getConstraintViolations()
                .stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.joining(", "));
        } else if (ex instanceof DataIntegrityViolationException) {
            Throwable rootCause = ((DataIntegrityViolationException) ex).getRootCause();
            if (rootCause != null) {
                message = rootCause.getMessage();
            }
        }

        ApiErrorResponse apiError = ApiErrorResponse.builder()
            .httpStatusCode(HttpStatus.BAD_REQUEST)
            .message(message)
            .timestamp(System.currentTimeMillis())
            .build();

        return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
    }

}
