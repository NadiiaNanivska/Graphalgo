package com.example.graphalgoserver.service;

import com.example.graphalgoserver.dto.graph.*;
import lombok.RequiredArgsConstructor;
import org.jgrapht.Graph;
import org.jgrapht.GraphPath;
import org.jgrapht.alg.interfaces.ShortestPathAlgorithm;
import org.jgrapht.alg.interfaces.SpanningTreeAlgorithm;
import org.jgrapht.alg.shortestpath.DijkstraShortestPath;
import org.jgrapht.alg.shortestpath.FloydWarshallShortestPaths;
import org.jgrapht.alg.spanning.KruskalMinimumSpanningTree;
import org.jgrapht.alg.spanning.PrimMinimumSpanningTree;
import org.jgrapht.graph.*;
import org.jgrapht.nio.Attribute;
import org.jgrapht.nio.DefaultAttribute;
import org.jgrapht.nio.json.JSONExporter;
import org.jgrapht.traverse.BreadthFirstIterator;
import org.jgrapht.traverse.DepthFirstIterator;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.io.StringWriter;
import java.io.Writer;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GraphService {

    private final ModelMapper modelMapper;

    public TraversalResponse BFS(GraphDTO input, String start) {
        System.out.println(input);
        Graph<String, DefaultWeightedEdge> directedGraph =buildGraph(input);
        Iterator<String> iterator = new BreadthFirstIterator<>(directedGraph, start);
        System.out.println("it" + iterator);
        List<String> bfsResult = new ArrayList<>();
        while (iterator.hasNext()) {
            bfsResult.add(iterator.next());
        }
        System.out.println(bfsResult.get(0));

        return new TraversalResponse(bfsResult);
    }

    public String DFS(GraphDTO input, String start) {
        Graph<String, DefaultWeightedEdge> directedGraph =buildGraph(input);
        Iterator<String> iterator = new DepthFirstIterator<>(directedGraph, start);
        StringBuilder dfsResult = new StringBuilder();
        while (iterator.hasNext()) {
            dfsResult.append(iterator.next()).append(" ");
        }
        return dfsResult.toString();
    }

    public ShortestPathResponse Dijkstra(GraphDTO input, String start, String end) {
        Graph<String, DefaultWeightedEdge> directedGraph = buildGraph(input);
        DijkstraShortestPath<String, DefaultWeightedEdge> dijkstraAlg =
                new DijkstraShortestPath<>(directedGraph);
        ShortestPathAlgorithm.SingleSourcePaths<String, DefaultWeightedEdge> iPaths = dijkstraAlg.getPaths(start);
        GraphPath<String, DefaultWeightedEdge> path = iPaths.getPath(end);
        return new ShortestPathResponse(path.getVertexList(), path.getWeight());
    }

    public ShortestPathResponse Floyd(GraphDTO input, String start, String end) {
        Graph<String, DefaultWeightedEdge> directedGraph = buildGraph(input);
        FloydWarshallShortestPaths<String, DefaultWeightedEdge> floydWarshallAlg =
                new FloydWarshallShortestPaths<>(directedGraph);
        ShortestPathAlgorithm.SingleSourcePaths<String, DefaultWeightedEdge> iPaths = floydWarshallAlg.getPaths(start);
        GraphPath<String, DefaultWeightedEdge> path = iPaths.getPath(end);
        return new ShortestPathResponse(path.getVertexList(), path.getWeight());
    }

    public MSTResponse Prim(GraphDTO input) {
        Graph<String, DefaultWeightedEdge> directedGraph = buildGraph(input);
        PrimMinimumSpanningTree<String, DefaultWeightedEdge> primAlg =
                new PrimMinimumSpanningTree<>(directedGraph);
        SpanningTreeAlgorithm.SpanningTree<DefaultWeightedEdge> spanningTree = primAlg.getSpanningTree();
        return new MSTResponse(spanningTree.getEdges().stream().map(src-> mapEdge(src, directedGraph)).collect(Collectors.toSet()));
    }

    public MSTResponse Kruskal(GraphDTO input) {
        Graph<String, DefaultWeightedEdge> directedGraph = buildGraph(input);
        KruskalMinimumSpanningTree<String, DefaultWeightedEdge> kruskalAlg =
                new KruskalMinimumSpanningTree<>(directedGraph);
        SpanningTreeAlgorithm.SpanningTree<DefaultWeightedEdge> spanningTree = kruskalAlg.getSpanningTree();
        return new MSTResponse(spanningTree.getEdges().stream().map(src-> mapEdge(src, directedGraph)).collect(Collectors.toSet()));
    }

    private Graph<String, DefaultWeightedEdge> buildGraph(GraphDTO dto) {
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

    private EdgeDTO mapEdge(DefaultWeightedEdge edge, Graph<String, DefaultWeightedEdge> graph) {
        EdgeDTO edgeDTO = new EdgeDTO();
        edgeDTO.setSource(graph.getEdgeSource(edge));
        edgeDTO.setTarget(graph.getEdgeTarget(edge));
        edgeDTO.setWeight(graph.getEdgeWeight(edge));
        return edgeDTO;
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

