package com.example.graphalgoserver.dto.authentication;

import com.example.graphalgoserver.utils.UserValidationConstants;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {
    @NotNull
    @Email(message = UserValidationConstants.INVALID_EMAIL)
    private String email;
    @NotNull
    @Size(min = 8, max = 20)
    @Pattern(regexp = "(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).(?=.*\\d).[^А-Яа-яЇїІіЄєҐґЁё]+$",
            message = UserValidationConstants.INVALID_PASSWORD)
    private String password;
}