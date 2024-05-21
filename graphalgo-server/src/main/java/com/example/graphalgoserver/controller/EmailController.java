package com.example.graphalgoserver.controller;

import com.example.graphalgoserver.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class EmailController {
    private final EmailService emailService;
    @PostMapping("/send")
    public ResponseEntity<?> send(@RequestParam String email) {
        emailService.sendResetPassword(email);
        return ResponseEntity.ok("Email sent successfully");
    }
}