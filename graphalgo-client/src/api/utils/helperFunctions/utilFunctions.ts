export const handleAddEdge = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    selectedNodeIds: string,
    setSelectedNodeIds: React.Dispatch<React.SetStateAction<string>>,
    addEdge: (sourceId: string, targetId: string, edgeValue: number) => void) => {
    const clickedNodeId = (e.target as SVGElement).getAttribute('data-node-id');
    if (clickedNodeId) {
        if (selectedNodeIds === '') setSelectedNodeIds(clickedNodeId);
        else {
            addEdge(selectedNodeIds, clickedNodeId, 1);
            setSelectedNodeIds('');
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