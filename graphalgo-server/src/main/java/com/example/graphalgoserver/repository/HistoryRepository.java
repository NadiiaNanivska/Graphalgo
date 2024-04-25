package com.example.graphalgoserver.repository;

import com.example.graphalgoserver.model.History;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface HistoryRepository extends JpaRepository<History, Long> {

    List<History> findByUserId(Integer user_id);
}