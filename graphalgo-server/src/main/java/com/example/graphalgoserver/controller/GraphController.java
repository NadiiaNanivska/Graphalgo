package com.example.graphalgoserver.controller;

import com.example.graphalgoserver.dto.graph.*;
import com.example.graphalgoserver.service.GraphService;
import com.example.graphalgoserver.service.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/graph")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}, allowCredentials = "true")
public class GraphController {
    private final GraphService graphService;
    private final HistoryService historyService;

    @PostMapping("/bfs/{start}")
    public ResponseEntity<?> GraphBFS(Principal user, @RequestBody GraphDTO input, @PathVariable String start) {
        TraversalResponse bfs = graphService.BFS(input, start);
        saveUserHistory(user, start, bfs);
        return ResponseEntity.ok(bfs);
    }

    @PostMapping("/dfs/{start}")
    public ResponseEntity<?> GraphDFS(Principal user, @RequestBody GraphDTO input, @PathVariable String start) {
        TraversalResponse dfs = graphService.DFS(input, start);
        saveUserHistory(user, start, dfs);
        return ResponseEntity.ok(dfs);
    }

    @PostMapping("/dijkstra/{start}/{end}")
    public ResponseEntity<?> GraphDijkstra(Principal user, @RequestBody GraphDTO input, @PathVariable String start, @PathVariable String end) {
        ShortestPathResponse res = graphService.Dijkstra(input, start, end);
        saveUserHistory(user, List.of(start, end).toString(), res);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/floyd/{start}/{end}")
    public ResponseEntity<?> GraphFloyd(Principal user, @RequestBody GraphDTO input, @PathVariable String start, @PathVariable String end) {
        ShortestPathResponse floyd = graphService.Floyd(input, start, end);
        saveUserHistory(user, List.of(start, end).toString(), floyd);
        return ResponseEntity.ok(floyd);
    }

    @PostMapping("/prim")
    public ResponseEntity<?> GraphPrim(Principal user, @RequestBody GraphDTO input) {
        MSTResponse prim = graphService.Prim(input);
        return ResponseEntity.ok(prim);
    }

    @PostMapping("/kruskal")
    public ResponseEntity<?> GraphKruskal(Principal user, @RequestBody GraphDTO input) {
        MSTResponse kruskal = graphService.Kruskal(input);
        return ResponseEntity.ok(kruskal);
    }

    private void saveUserHistory(Principal user, String startVertices, VerticesResponse response) {
        if (user != null) {
            historyService.saveUserHistory(user.getName(), startVertices.toString(), response);
        }
    }
}
