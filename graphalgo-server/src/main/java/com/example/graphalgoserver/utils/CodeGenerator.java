package com.example.graphalgoserver.utils;

import java.security.SecureRandom;

public class CodeGenerator {

    private static final SecureRandom random = new SecureRandom();
    private static final int CODE_LENGTH = 16;

    public static String generateCode() {
        StringBuilder sb = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }
}

