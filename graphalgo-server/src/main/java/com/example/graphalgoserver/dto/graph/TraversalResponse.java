package com.example.graphalgoserver.dto.graph;

import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
public class TraversalResponse extends VerticesResponse {
    public TraversalResponse(List<String> dfsResult) {
        super(dfsResult);
    }
}
