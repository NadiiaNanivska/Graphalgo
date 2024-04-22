package com.example.graphalgoserver.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleHttpMessageNotReadableException(MethodArgumentNotValidException ex, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    @ExceptionHandler({HttpMessageNotReadableException.class})
    public ResponseEntity<InformationResponse> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, WebRequest request) {
        InformationResponse errorObject = new InformationResponse("Invalid data");
        return new ResponseEntity<>(errorObject, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({AuthenticationException.class, IllegalArgumentException.class})
    public ResponseEntity<InformationResponse> handleNotFoundException(AuthenticationException ex) {
        InformationResponse errorObject = new InformationResponse(ex.getMessage());
        return new ResponseEntity<>(errorObject, HttpStatus.BAD_REQUEST);
    }
}