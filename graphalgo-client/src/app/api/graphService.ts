import { GRAPH_ENDPOINTS } from "../constants/Constants";
import { ShortestPathResponse, TraversalResponse } from "../dto/TraversalDTO";
import { Data } from "../utils/data";
import axiosModule from "./baseService";

export const BFS = async (graphDto: Data, startNode: string): Promise<TraversalResponse> => {
    const simplifiedGraphData = {
        nodes: graphDto.nodes.map(node => ({ id: node.id })),
        edges: graphDto.edges.map(edge => ({
          source: (edge.source as any).id,
          target: (edge.target as any).id,
          weight: edge.weight
        }))
      };
    try {
        const response = await axiosModule.post(GRAPH_ENDPOINTS.BFS + startNode, simplifiedGraphData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to BFS');
    }
};

export const DFS = async (graphDto: Data, startNode: string): Promise<TraversalResponse> => {
    const simplifiedGraphData = {
        nodes: graphDto.nodes.map(node => ({ id: node.id })),
        edges: graphDto.edges.map(edge => ({
          source: (edge.source as any).id,
          target: (edge.target as any).id,
          weight: edge.weight
        }))
      };
    try {
        const response = await axiosModule.post(GRAPH_ENDPOINTS.DFS + startNode, simplifiedGraphData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to DFS');
    }
};

export const Dijkstra = async (graphDto: Data, startNode: string, endNode: string): Promise<ShortestPathResponse> => {
  const simplifiedGraphData = {
      nodes: graphDto.nodes.map(node => ({ id: node.id })),
      edges: graphDto.edges.map(edge => ({
        source: (edge.source as any).id,
        target: (edge.target as any).id,
        weight: edge.weight
      }))
    };
  try {
      const response = await axiosModule.post(GRAPH_ENDPOINTS.DIJKSTRA + startNode + '/' + endNode, simplifiedGraphData);
      return response.data;
  } catch (error) {
      throw new Error('Failed to Dijkstra');
  }
};