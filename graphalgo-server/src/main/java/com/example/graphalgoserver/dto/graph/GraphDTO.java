package com.example.graphalgoserver.dto.graph;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GraphDTO {
    private List<VertexDTO> nodes;
    private List<EdgeDTO> edges;
}