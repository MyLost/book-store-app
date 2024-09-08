package org.npd21tech.exceptions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatusCode;

/*
    {
     "timestamp": 1688920909,
     "status": 400,
     "error": "Bad Request",
     "exception": "org.springframework.http.converter.HttpMessageNotReadableException",
     "message": "JSON parse error: Unrecognized token ....",
     "path": "/albums"
    }
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
public class ApiErrorResponse {

    private Long timestamp;
    private String message;
    private HttpStatusCode httpStatusCode;
    private String error;
    private String path;

    public ApiErrorResponse(String message) {
        this.message = message;
    }
}
