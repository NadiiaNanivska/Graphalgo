package com.example.graphalgoserver.dto.graph;

import java.util.List;

public class VerticesResponse {
    public List<String> nodes;

    public VerticesResponse(List<String> dfsResult) {
        nodes = dfsResult;
    }
}
