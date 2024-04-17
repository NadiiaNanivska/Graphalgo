package com.example.graphalgoserver.exceptions;

import lombok.Data;

import java.util.Date;

@Data
public class InformationResponse {
    private String message;
    private Date timestamp = new Date();

    public InformationResponse(String msg) {
        message = msg;
    }
}