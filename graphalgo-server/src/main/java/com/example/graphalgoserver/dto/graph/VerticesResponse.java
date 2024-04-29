package com.example.graphalgoserver.dto.graph;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class VerticesResponse {
    public List<String> nodes;

    public VerticesResponse(List<String> dfsResult) {
        nodes = dfsResult;
    }
}
