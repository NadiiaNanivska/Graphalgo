export interface Node extends d3.SimulationNodeDatum {
  id: string;
}

export interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
  weight: number;
}

export type Data = {
  nodes: Node[];
  links: Link[];
};

export const data: Data = {
  nodes: [
    { id: '0' },
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ],
  links: [
    { source: '3', target: '1', weight: 1 },
    { source: '3', target: '2', weight: 1 },
    { source: '3', target: '0', weight: 1 },
    { source: '3', target: '5', weight: 85 },
    { source: '5', target: '0', weight: 1 },
    { source: '5', target: '2', weight: 10 },
    { source: '5', target: '4', weight: 1 },
  ],
};
