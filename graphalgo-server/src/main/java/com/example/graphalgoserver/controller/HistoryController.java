package com.example.graphalgoserver.controller;

import com.example.graphalgoserver.dto.history.HistoryResponse;
import com.example.graphalgoserver.model.History;
import com.example.graphalgoserver.service.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/history")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}, allowCredentials = "true")
public class HistoryController {
    private final HistoryService historyService;
    @GetMapping()
    public ResponseEntity<List<HistoryResponse>> getUserHistory(Principal user) {
        return ResponseEntity.ok(historyService.getUserHistory(user.getName()));
    }
}
