export interface TraversalResponse {
    nodes: string[]
}

export interface ShortestPathResponse {
    nodes: string[],
    edges: number[],
    cost: number
}