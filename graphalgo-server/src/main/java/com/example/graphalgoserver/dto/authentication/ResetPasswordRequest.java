package com.example.graphalgoserver.dto.authentication;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResetPasswordRequest {
    String token;
    String newPassword;
    String oldPassword;
}
