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
    { id: 'Toto' },
    { id: 'Tutu' },
    { id: 'Titi' },
    { id: 'Tata' },
    { id: 'Turlututu' },
    { id: 'Tita' },
  ],
  links: [
    { source: 'Tata', target: 'Tutu', weight: 1 },
    { source: 'Tata', target: 'Titi', weight: 1 },
    { source: 'Tata', target: 'Toto', weight: 1 },
    { source: 'Tata', target: 'Tita', weight: 85 },
    { source: 'Tita', target: 'Toto', weight: 1 },
    { source: 'Tita', target: 'Titi', weight: 10 },
    { source: 'Tita', target: 'Turlututu', weight: 1 },
  ],
};
