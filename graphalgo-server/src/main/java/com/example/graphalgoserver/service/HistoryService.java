package com.example.graphalgoserver.service;

import com.example.graphalgoserver.dto.graph.VerticesResponse;
import com.example.graphalgoserver.dto.history.HistoryResponse;
import com.example.graphalgoserver.exceptions.AuthenticationException;
import com.example.graphalgoserver.model.AlgorithmType;
import com.example.graphalgoserver.model.History;
import com.example.graphalgoserver.model.User;
import com.example.graphalgoserver.repository.HistoryRepository;
import com.example.graphalgoserver.repository.UserRepository;
import com.example.graphalgoserver.utils.UserValidationConstants;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class HistoryService {

    private final HistoryRepository historyRepository;
    private final UserRepository userRepository;
    private final ModelMapper mapper;

    @Transactional
    public void saveUserHistory(String email, String startVertices, VerticesResponse response, AlgorithmType type) {
        History userHistory = new History();
        User user = getUser(email);
        userHistory.setUser(user);
        userHistory.setStartVertices(startVertices);
        userHistory.setResultVertices(response.nodes.toString());
        userHistory.setAlgorithm(type);
        historyRepository.save(userHistory);
    }

    public List<HistoryResponse> getUserHistory(String email) {
        User user = getUser(email);
        return historyRepository.findByUserId(user.getId()).stream().map(src -> mapper.map(src, HistoryResponse.class)).toList();
    }

    private User getUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AuthenticationException(UserValidationConstants.INVALID_CREDENTIALS));
        return user;
    }
}
