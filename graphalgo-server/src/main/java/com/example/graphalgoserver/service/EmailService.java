package com.example.graphalgoserver.service;

import com.example.graphalgoserver.email.IEmailSender;
import com.example.graphalgoserver.exceptions.AuthenticationException;
import com.example.graphalgoserver.model.User;
import com.example.graphalgoserver.repository.UserRepository;
import com.example.graphalgoserver.utils.CodeGenerator;
import com.example.graphalgoserver.utils.UserValidationConstants;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class EmailService {
    private final UserRepository userRepository;
    private final IEmailSender emailSender;

    public void sendResetPassword(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AuthenticationException(UserValidationConstants.INVALID_CREDENTIALS));
        if (user != null) {
            String verificationCode = CodeGenerator.generateCode();
            user.setPasswordResetToken(verificationCode);
            userRepository.save(user);
            String resetLink = "http://localhost:3000/reset-password?token=" + verificationCode;
            emailSender.sendResetPasswordEmail(email, resetLink);
        }
    }
}
