import { Node, Link } from "./data";

export const handleAddEdge = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    selectedNodeIds: React.MutableRefObject<string>,
    addEdge: (sourceId: string, targetId: string, edgeValue: number) => void) => {
    const clickedNodeId = (e.target as SVGElement).getAttribute('data-node-id');
    if (clickedNodeId) {
        if (selectedNodeIds.current === '') selectedNodeIds.current = clickedNodeId;
        else {
            addEdge(selectedNodeIds.current, clickedNodeId, 1);
            selectedNodeIds.current = '';
        }
    }
};

export const handleRemoveNode = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    removeNode: (nodeIdToRemove: string) => void) => {
    const clickedNodeId = (e.target as SVGElement).getAttribute('data-node-id');
    if (clickedNodeId) {
        removeNode(clickedNodeId);
    }
};

export const handleRemoveEdge = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    removeEdge: (edgeIdToRemove: number) => void) => {
    const clickedEdgeId = (e.target as SVGElement).getAttribute('link-index') as unknown as number;
    if (clickedEdgeId) {
        removeEdge(clickedEdgeId);
    }
};

export const generateAdjacencyMatrix = (nodes: Node[], links: Link[]): number[][] => {
    const matrix: number[][] = Array.from({ length: parseInt(nodes[nodes.length - 1].id) + 1 }, () => Array(parseInt(nodes[nodes.length - 1].id) + 1).fill(0));
    const nodeIndexMap = new Map(nodes.map((node, index) => [node.id, parseInt(node.id)]));
    console.log(matrix.length, links.length)

    links.forEach((link: any) => {
        const sourceIndex = nodeIndexMap.get(link.source.id);
        const targetIndex = nodeIndexMap.get(link.target.id);
        if (sourceIndex !== undefined && targetIndex !== undefined) {
            matrix[sourceIndex][targetIndex] = 1;
        }
    });
  
    return matrix;
};
