package com.example.graphalgoserver.email;

import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class EmailSender implements IEmailSender{
    private final JavaMailSender mailSender;
    @Override
    @Async
    public void sendResetPasswordEmail(String to, String link) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setFrom("test@gmail.com");
        message.setSubject("Reset password email");
        message.setText("Your reset password link is: " + link);
        mailSender.send(message);
    }
}
