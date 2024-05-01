import { Link } from "../utils/data";

export interface TraversalResponse {
    nodes: string[]
}

export interface ShortestPathResponse {
    nodes: string[],
    edgesCost: number[],
    cost: number
}

export interface HistoryDTO {
    id: number;
    startVertices: string;
    resultVertices: string;
    date: string;
    algorithm: string;
}

export interface MSTResponseDTO {
    edges: Link[];
  }
  