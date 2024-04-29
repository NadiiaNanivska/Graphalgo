package com.example.graphalgoserver.dto.graph;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
public class TraversalResponse extends VerticesResponse {
    public TraversalResponse(List<String> dfsResult) {
        super(dfsResult);
    }
}
