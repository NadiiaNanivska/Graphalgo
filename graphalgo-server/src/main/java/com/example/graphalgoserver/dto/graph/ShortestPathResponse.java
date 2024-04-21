package com.example.graphalgoserver.dto.graph;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShortestPathResponse {
    List<String> path;
    Double cost;
}
