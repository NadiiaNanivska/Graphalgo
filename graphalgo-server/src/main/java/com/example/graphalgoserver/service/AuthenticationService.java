package com.example.graphalgoserver.service;

import com.example.graphalgoserver.security.JwtService;
import com.example.graphalgoserver.dto.authentication.*;
import com.example.graphalgoserver.model.User;
import com.example.graphalgoserver.repository.UserRepository;
import com.example.graphalgoserver.utils.UserValidationConstants;
import lombok.RequiredArgsConstructor;
import com.example.graphalgoserver.exceptions.AuthenticationException;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
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
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final ModelMapper modelMapper;


    public AuthenticationResponse register(RegisterRequest request) throws AuthenticationException {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new AuthenticationException(UserValidationConstants.DIFFERENT_PASSWORDS);
        }
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new AuthenticationException(UserValidationConstants.USER_ALREADY_EXIST);
        }
        User user = convertToUser(request);
        repository.save(user);
        String jwtToken = jwtService.generateToken(user);
        String jwtRefreshToken = jwtService.generateRefreshToken(user);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(jwtRefreshToken)
                .build();
    }

    private User convertToUser(RegisterRequest request) {
        Converter<RegisterRequest, User> toUpperCase = new AbstractConverter<>() {
            protected User convert(RegisterRequest source) {
                return source == null ? null : User.builder()
                        .email(source.getEmail())
                        .password(passwordEncoder.encode(source.getPassword())).build();
            }
        };
        modelMapper.addConverter(toUpperCase);
        User user = modelMapper.map(request, User.class);
        return user;
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
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new AuthenticationException(UserValidationConstants.INVALID_CREDENTIALS));
        return User.builder().id(user.getId()).email(user.getEmail()).build();
    }
}