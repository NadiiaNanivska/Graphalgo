export interface TraversalResponse {
    nodes: string[]
}

export interface ShortestPathResponse {
    nodes: string[],
    edges: number[],
    cost: number
}

export interface HistoryDTO {
    id: number;
    startVertices: string;
    resultVertices: string;
    date: string;
    algorithm: string;
}