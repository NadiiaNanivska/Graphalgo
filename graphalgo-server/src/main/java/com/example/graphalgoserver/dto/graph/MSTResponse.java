package com.example.graphalgoserver.dto.graph;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MSTResponse {
    private Set<EdgeDTO> edges;
}
