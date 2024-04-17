package com.example.graphalgoserver.controller;

import com.example.graphalgoserver.dto.authentication.RefreshRequest;
import com.example.graphalgoserver.dto.authentication.RegisterRequest;
import com.example.graphalgoserver.dto.authentication.AuthenticationRequest;
import com.example.graphalgoserver.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/signup")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequest request
    ) throws AuthenticationException {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticate(
            @Valid @RequestBody AuthenticationRequest request
    ) throws AuthenticationException {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@Valid @RequestBody RefreshRequest request) throws AuthenticationException {
        return ResponseEntity.ok(service.refreshToken(request));
    }
}