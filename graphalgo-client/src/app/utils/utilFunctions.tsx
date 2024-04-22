import { InputNumber, Modal } from "antd";
import { Link, Node } from "./data";

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

    links.forEach((link: any) => {
        const sourceIndex = nodeIndexMap.get(link.source.id);
        const targetIndex = nodeIndexMap.get(link.target.id);
        if (sourceIndex !== undefined && targetIndex !== undefined) {
            matrix[sourceIndex][targetIndex] = link.weight;
        }
    });

    return matrix;
};

export const generateIncidenceMatrix = (nodes: Node[], links: Link[]): number[][] => {
    const incidenceMatrix: number[][] = Array.from({ length: parseInt(nodes[nodes.length - 1].id) + 1 }, () => Array(links.length).fill(0));
    const nodeIndexMap = new Map(nodes.map((node, index) => [node.id, parseInt(node.id)]));

    links.forEach((link: any, linkIndex) => {
        const sourceIndex = nodeIndexMap.get(link.source.id);
        const targetIndex = nodeIndexMap.get(link.target.id);

        if (sourceIndex !== undefined && targetIndex !== undefined) {
            incidenceMatrix[sourceIndex][linkIndex] = link.weight;
            incidenceMatrix[targetIndex][linkIndex] = -link.weight;
        }
    });

    return incidenceMatrix;
};

export const handleIncidenceMatrixFromFile = (event: any, setNodes: React.Dispatch<React.SetStateAction<Node[]>>, setLinks: React.Dispatch<React.SetStateAction<Link[]>>) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const content: string = e.target!.result as string;
        const lines = content.trim().split(/\r\n|\n/);
        const nodes = lines.map((line, index) => ({ id: index.toString() }));
        setNodes(nodes);
        const incidenceMatrix = lines.map((line) => line.split(' ').map(Number));
        const edges: Link[] = [];
        const nodesCount = incidenceMatrix.length;
        const edgesCount = incidenceMatrix[0].length;

        for (let j = 0; j < edgesCount; j++) {
            let source = -1;
            let target = -1;
            let weight = 0;
            for (let i = 0; i < nodesCount; i++) {
                if (incidenceMatrix[i][j] > 0) {
                    source = i;
                    weight = incidenceMatrix[i][j]
                } else if (incidenceMatrix[i][j] < 0) {
                    target = i;
                }
            }
            if (source !== -1 && target !== -1) {
                edges.push({ source: source.toString(), target: target.toString(), weight: weight });
            }
        }
        setLinks(edges);
    };
    reader.readAsText(file);
}


export const handleAdjacencyMatrixFromFile = (event: any, setNodes: React.Dispatch<React.SetStateAction<Node[]>>, setLinks: React.Dispatch<React.SetStateAction<Link[]>>) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const content: string = e.target!.result as string;
        const lines = content.trim().split(/\r\n|\n/);
        const nodes = lines.map((line, index) => ({ id: index.toString() }));
        const links = lines.flatMap((line, sourceIndex) =>
            line.split(' ').map((value, targetIndex) => {
                if (value !== '0') {
                    return { source: sourceIndex.toString(), target: targetIndex.toString(), weight: parseInt(value) };
                }
                return null;
            })
        ).filter(link => link !== null) as Link[];
        setNodes(nodes);
        setLinks(links);
    };

    reader.readAsText(file);
};

export const downloadTxtFile = (fileName: string, content: string) => {
    const fileType = 'text/plain';

    const blob = new Blob([content], { type: fileType });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

export const openInputNodeModal = (startNode: React.MutableRefObject<string>, fetchDFSData: (startNode: string) => Promise<void>, maxValue: string) => {
    Modal.confirm({
        title: 'Початкова вершина',
        content: (
            <InputNumber
                style={{ borderColor: '#fcbdac' }}
                defaultValue={0}
                min={0} max={parseInt(maxValue)} onChange={(value) => {
                    if (value !== null) {
                        startNode.current = value!.toString();
                    }
                }}
            />
        ),
        okButtonProps: { style: { backgroundColor: '#FD744F', borderColor: '#fcbdac' } },
        cancelButtonProps: { style: { backgroundColor: 'white', borderColor: '#fcbdac', color: 'black' } },
        okText: 'Зберегти',
        cancelText: 'Скасувати',
        onOk: () => {
            fetchDFSData(startNode.current!);
        }
    });
}

export const openFileModal = (setNodes: React.Dispatch<React.SetStateAction<Node[]>>, setLinks: React.Dispatch<React.SetStateAction<Link[]>>, handleFunction: (event: any, setNodes: React.Dispatch<React.SetStateAction<Node[]>>, setLinks: React.Dispatch<React.SetStateAction<Link[]>>) => void) => {
    Modal.info({
        title: "Завантажити файл",
        content: (
            <div>
                <input type="file" accept="text/plain" onChange={(e) => handleFunction(e, setNodes, setLinks)} />
            </div>
        ),
        okButtonProps: { style: { backgroundColor: '#FD744F', borderColor: '#fcbdac' } },
        cancelButtonProps: { style: { backgroundColor: 'white', borderColor: '#fcbdac', color: 'black' } },
    });
}