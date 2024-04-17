package com.example.graphalgoserver.exceptions;

public class AuthenticationException extends IllegalArgumentException {

    public AuthenticationException(String message) {
        super(message);
    }
}