package com.example.graphalgoserver.controller;

import com.example.graphalgoserver.dto.graph.GraphDTO;
import com.example.graphalgoserver.service.GraphService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/graph")
@RequiredArgsConstructor
public class GraphController {
    private final GraphService graphService;

    @PostMapping("/bfs/{start}")
    public ResponseEntity<?> getGraphBFS(@RequestBody GraphDTO input, @PathVariable String start) {
        String res =  graphService.BFS(input, start);
        return ResponseEntity.ok(res);
    }
}
