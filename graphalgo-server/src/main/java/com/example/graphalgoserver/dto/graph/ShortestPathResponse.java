package com.example.graphalgoserver.dto.graph;

import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
public class ShortestPathResponse extends VerticesResponse {
    public List<Double> edgesCost;
    public Double cost;

    public ShortestPathResponse(List<String> vertexList, List<Double> list, double weight) {
        super(vertexList);
        edgesCost = list;
        cost = weight;
    }
}
