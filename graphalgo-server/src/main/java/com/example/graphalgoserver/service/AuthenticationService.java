package com.example.graphalgoserver.service;

import com.example.graphalgoserver.security.JwtService;
import com.example.graphalgoserver.dto.authentication.*;
import com.example.graphalgoserver.model.User;
import com.example.graphalgoserver.repository.UserRepository;
import com.example.graphalgoserver.utils.UserValidationConstants;
import lombok.RequiredArgsConstructor;
import com.example.graphalgoserver.exceptions.AuthenticationException;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponse register(RegisterRequest request) throws AuthenticationException {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new AuthenticationException(UserValidationConstants.DIFFERENT_PASSWORDS);
        }
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new AuthenticationException(UserValidationConstants.USER_ALREADY_EXIST);
        }
        User user = modelMapper.map(request, User.class);
        repository.save(user);
        String jwtToken = jwtService.generateToken(user);
        String jwtRefreshToken = jwtService.generateRefreshToken(user);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(jwtRefreshToken)
                .build();
    }

    public void resetPassword(ResetPasswordRequest request) {
        if (!request.getNewPassword().equals(request.getOldPassword())) {
            throw new AuthenticationException(UserValidationConstants.DIFFERENT_PASSWORDS);
        }
        User user = repository.findByPasswordResetToken(request.getToken())
                .orElseThrow(() -> new AuthenticationException(UserValidationConstants.INVALID_CREDENTIALS));
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setPasswordResetToken(null);
        repository.save(user);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) throws AuthenticationException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new AuthenticationException(UserValidationConstants.INVALID_CREDENTIALS);
        }
        User user = repository.findByEmail(request.getEmail()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        String jwtRefreshToken = jwtService.generateRefreshToken(user);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(jwtRefreshToken)
                .build();
    }

    public RefreshResponse refreshToken(RefreshRequest request) throws AuthenticationException {
        String username = jwtService.extractUsername(request.getRefreshToken());
        User user = repository.findByEmail(username)
                .orElseThrow(() -> new AuthenticationException(UserValidationConstants.INVALID_CREDENTIALS));
        return RefreshResponse.builder()
                .accessToken(jwtService.generateToken(user))
                .build();
    }

    public User getUser(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new AuthenticationException(UserValidationConstants.INVALID_CREDENTIALS));
    }
}