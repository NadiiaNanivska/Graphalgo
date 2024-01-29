export interface Node extends d3.SimulationNodeDatum {
  id: string;
}

export interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
  value: number;
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
    { source: 'Tata', target: 'Tutu', value: 1 },
    { source: 'Tata', target: 'Titi', value: 1 },
    { source: 'Tata', target: 'Toto', value: 1 },
    { source: 'Tata', target: 'Tita', value: 85 },
    { source: 'Tita', target: 'Toto', value: 1 },
    { source: 'Tita', target: 'Titi', value: 10 },
    { source: 'Tita', target: 'Turlututu', value: 1 },
  ],
};
