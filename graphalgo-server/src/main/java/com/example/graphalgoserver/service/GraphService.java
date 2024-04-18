package com.example.graphalgoserver.service;

import com.example.graphalgoserver.dto.graph.EdgeDTO;
import com.example.graphalgoserver.dto.graph.GraphDTO;
import com.example.graphalgoserver.dto.graph.VertexDTO;
import lombok.RequiredArgsConstructor;
import org.jgrapht.Graph;
import org.jgrapht.graph.*;
import org.jgrapht.nio.Attribute;
import org.jgrapht.nio.DefaultAttribute;
import org.jgrapht.nio.json.JSONExporter;
import org.jgrapht.traverse.BreadthFirstIterator;
import org.springframework.stereotype.Service;

import java.io.StringWriter;
import java.io.Writer;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class GraphService {

    public String BFS(GraphDTO input, String start) {
        Graph<String, DefaultWeightedEdge> directedGraph =buildGraph(input);
        Iterator<String> iterator = new BreadthFirstIterator<>(directedGraph, start);
        StringBuilder bfsResult = new StringBuilder();
        while (iterator.hasNext()) {
            bfsResult.append(iterator.next()).append(" ");
        }
        return bfsResult.toString();
    }

    public Graph<String, DefaultWeightedEdge> buildGraph(GraphDTO dto) {
        Graph<String, DefaultWeightedEdge> graph = new DefaultDirectedWeightedGraph<>(DefaultWeightedEdge.class);
        for (VertexDTO vertexDTO : dto.getNodes()) {
            graph.addVertex(vertexDTO.getId());
        }
        for (EdgeDTO edgeDTO : dto.getEdges()) {
            String source = edgeDTO.getSource();
            String target = edgeDTO.getTarget();
            double weight = edgeDTO.getWeight();

            DefaultWeightedEdge edge = graph.addEdge(source, target);
            if (edge != null) {
                graph.setEdgeWeight(edge, weight);
            }
        }
        return graph;
    }

    private JSONExporter<String, DefaultWeightedEdge> serializeGraph(Graph<String, DefaultWeightedEdge> graph) {
        JSONExporter<String, DefaultWeightedEdge> exporter = new JSONExporter<>();
        Function<DefaultWeightedEdge, Map<String, Attribute>> edgeAttributeProvider = e -> {
            Map<String, Attribute> map = new LinkedHashMap<>();
            map.put("weight", DefaultAttribute.createAttribute(graph.getEdgeWeight(e)));
            return map;
        };
        exporter.setEdgeAttributeProvider(edgeAttributeProvider);

        try (Writer writer = new StringWriter()) {
            exporter.exportGraph(graph, writer);
//            return writer.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
//        return String.valueOf(1);

        return exporter;
    }
}

