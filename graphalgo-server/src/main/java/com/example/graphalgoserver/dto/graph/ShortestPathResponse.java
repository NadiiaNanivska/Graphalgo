package com.example.graphalgoserver.dto.graph;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
public class ShortestPathResponse extends VerticesResponse {
    public List<Double> edges;
    public Double cost;

    public ShortestPathResponse(List<String> vertexList, List<Double> list, double weight) {
        super(vertexList);
        edges = list;
        cost = weight;
    }
}
