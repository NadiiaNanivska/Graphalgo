package com.example.graphalgoserver.dto.graph;

import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
public class ShortestPathResponse extends VerticesResponse {
    List<Double> edges;
    Double cost;

    public ShortestPathResponse(List<String> vertexList, List<Double> list, double weight) {
        super(vertexList);
        edges = list;
        cost = weight;
    }
}
