package com.example.graphalgoserver.email;

public interface IEmailSender {
    void sendResetPasswordEmail(String to, String link);
}
