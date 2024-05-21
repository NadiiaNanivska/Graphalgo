package com.example.graphalgoserver.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.graphalgoserver.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Optional<User> findByPasswordResetToken(String token);
}