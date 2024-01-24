export interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: string;
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

export const data:Data = {
  nodes: [
    { id: 'Toto', group: 'team4' },
    { id: 'Tutu', group: 'team4' },
    { id: 'Titi', group: 'team4' },
    { id: 'Tata', group: 'team4' },
    { id: 'Turlututu', group: 'team4' },
    { id: 'Tita', group: 'team4' },
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
