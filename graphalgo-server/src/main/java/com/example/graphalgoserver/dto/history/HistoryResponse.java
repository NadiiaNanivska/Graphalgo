package com.example.graphalgoserver.dto.history;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HistoryResponse {
    private String startVertices;
    private String resultVertices;
    private String algorithm;
}
