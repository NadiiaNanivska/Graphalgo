package com.example.graphalgoserver.controller;

import com.example.graphalgoserver.dto.authentication.*;
import com.example.graphalgoserver.security.JwtService;
import com.example.graphalgoserver.service.AuthenticationService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}, allowCredentials = "true")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/signup")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        AuthenticationResponse res = service.register(request);
        ResponseCookie cookie = ResponseCookie.from("accessToken", res.getAccessToken()).httpOnly(true).maxAge(JwtService.ACCESS_TOKEN_VALIDITY_SECONDS).path("/").build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(res);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        service.resetPassword(request);
        return ResponseEntity.ok("Password nas been reset successfully");
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticate(
            @Valid @RequestBody AuthenticationRequest request
    ) {
        AuthenticationResponse res = service.authenticate(request);
        ResponseCookie cookie = ResponseCookie.from("accessToken", res.getAccessToken()).httpOnly(true).maxAge(JwtService.ACCESS_TOKEN_VALIDITY_SECONDS).path("/").build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(res);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(HttpServletRequest request) {
        return ResponseEntity.ok(service.getUser(request.getUserPrincipal().getName()));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) throws ServletException {
        request.logout();
        ResponseCookie cookie = ResponseCookie.from("accessToken", null).httpOnly(true).maxAge(0).path("/").build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body("");
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@Valid @RequestBody RefreshRequest request) {
        return ResponseEntity.ok(service.refreshToken(request));
    }
}