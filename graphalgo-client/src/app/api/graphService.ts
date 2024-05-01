import { GRAPH_ENDPOINTS, INVALID_INPUT_MESSAGE } from "../constants/Constants";
import { HistoryDTO, ShortestPathResponse, TraversalResponse } from "../dto/graphDTO";
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
        throw new Error(INVALID_INPUT_MESSAGE);
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
        throw new Error(INVALID_INPUT_MESSAGE);
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
      throw new Error(INVALID_INPUT_MESSAGE);
  }
};

export const Prim = async (graphDto: Data): Promise<ShortestPathResponse> => {
  const simplifiedGraphData = {
      nodes: graphDto.nodes.map(node => ({ id: node.id })),
      edges: graphDto.edges.map(edge => ({
        source: (edge.source as any).id,
        target: (edge.target as any).id,
        weight: edge.weight
      }))
    };
  try {
      const response = await axiosModule.post(GRAPH_ENDPOINTS.PRIM, simplifiedGraphData);
      return response.data;
  } catch (error) {
      throw new Error(INVALID_INPUT_MESSAGE);
  }
};

export const Kruskal = async (graphDto: Data): Promise<ShortestPathResponse> => {
  const simplifiedGraphData = {
      nodes: graphDto.nodes.map(node => ({ id: node.id })),
      edges: graphDto.edges.map(edge => ({
        source: (edge.source as any).id,
        target: (edge.target as any).id,
        weight: edge.weight
      }))
    };
  try {
      const response = await axiosModule.post(GRAPH_ENDPOINTS.KRUSKAL, simplifiedGraphData);
      return response.data;
  } catch (error) {
      throw new Error(INVALID_INPUT_MESSAGE);
  }
};

export const History = async (): Promise<HistoryDTO[]> => {
  try {
      const response = await axiosModule.get(GRAPH_ENDPOINTS.HISTORY);
      return response.data;
  } catch (error) {
      throw new Error(INVALID_INPUT_MESSAGE);
  }
};