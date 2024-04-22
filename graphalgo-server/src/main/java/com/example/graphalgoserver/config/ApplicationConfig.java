package com.example.graphalgoserver.config;

import com.example.graphalgoserver.dto.authentication.RegisterRequest;
import com.example.graphalgoserver.dto.graph.EdgeDTO;
import com.example.graphalgoserver.dto.graph.MSTResponse;
import com.example.graphalgoserver.dto.graph.ShortestPathResponse;
import com.example.graphalgoserver.model.User;
import com.example.graphalgoserver.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jgrapht.GraphPath;
import org.jgrapht.graph.DefaultWeightedEdge;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final UserRepository repository;

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> repository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();
        Converter<RegisterRequest, User> toUpperCase = new AbstractConverter<>() {
            protected User convert(RegisterRequest source) {
                return source == null ? null : User.builder()
                        .email(source.getEmail())
                        .password(passwordEncoder().encode(source.getPassword())).build();
            }
        };
        mapper.addConverter(toUpperCase);
        return mapper;
    }
}