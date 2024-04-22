package com.example.graphalgoserver.controller;

import com.example.graphalgoserver.dto.graph.ShortestPathResponse;
import com.example.graphalgoserver.dto.graph.GraphDTO;
import com.example.graphalgoserver.service.GraphService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/graph")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}, allowCredentials = "true")
public class GraphController {
    private final GraphService graphService;

    @PostMapping("/bfs/{start}")
    public ResponseEntity<?> GraphBFS(@RequestBody GraphDTO input, @PathVariable String start) {
        return ResponseEntity.ok(graphService.BFS(input, start));
    }

    @PostMapping("/dfs/{start}")
    public ResponseEntity<?> GraphDFS(@RequestBody GraphDTO input, @PathVariable String start) {
        return ResponseEntity.ok(graphService.DFS(input, start));
    }

    @PostMapping("/dijkstra/{start}/{end}")
    public ResponseEntity<?> GraphDijkstra(@RequestBody GraphDTO input, @PathVariable String start, @PathVariable String end) {
        ShortestPathResponse res = graphService.Dijkstra(input, start, end);
        System.out.println(res.toString());
        return ResponseEntity.ok(res);
    }

    @PostMapping("/floyd/{start}/{end}")
    public ResponseEntity<?> GraphFloyd(@RequestBody GraphDTO input, @PathVariable String start, @PathVariable String end) {
        return ResponseEntity.ok(graphService.Floyd(input, start, end));
    }

    @PostMapping("/prim")
    public ResponseEntity<?> GraphPrim(@RequestBody GraphDTO input) {
        return ResponseEntity.ok(graphService.Prim(input));
    }

    @PostMapping("/kruskal")
    public ResponseEntity<?> GraphKruskal(@RequestBody GraphDTO input) {
        return ResponseEntity.ok(graphService.Kruskal(input));
    }
}
