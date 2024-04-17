package com.example.graphalgoserver.controller;

import com.example.graphalgoserver.dto.authentication.AuthenticationResponse;
import com.example.graphalgoserver.dto.authentication.RefreshRequest;
import com.example.graphalgoserver.dto.authentication.RegisterRequest;
import com.example.graphalgoserver.dto.authentication.AuthenticationRequest;
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
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/signup")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        AuthenticationResponse res = service.register(request);
        ResponseCookie cookie = ResponseCookie.from("accessToken", res.getAccessToken()).httpOnly(true).path("/").build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(res);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticate(
            @Valid @RequestBody AuthenticationRequest request
    ) {
        AuthenticationResponse res = service.authenticate(request);
        ResponseCookie cookie = ResponseCookie.from("accessToken", res.getAccessToken()).httpOnly(true).path("/").build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(res);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(HttpServletRequest request) {
        return ResponseEntity.ok(service.getUser(request.getUserPrincipal().getName()));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) throws ServletException {
        request.logout();
        ResponseCookie cookie = ResponseCookie.from("accessToken", null).maxAge(0).httpOnly(true).path("/").build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body("");
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@Valid @RequestBody RefreshRequest request) {
        return ResponseEntity.ok(service.refreshToken(request));
    }
}