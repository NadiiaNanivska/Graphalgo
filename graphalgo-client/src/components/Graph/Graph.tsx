import { Input, Modal, message } from "antd";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import useHandleChangeGraph from "../../app/utils/GraphControl";
import { Link, Node } from "../../app/utils/data";
import { handleAddEdge, handleRemoveEdge, handleRemoveNode } from "../../app/utils/utilFunctions";
import { useData, useGraphOptions } from "../../contexts/GraphOptionsContext";
import { RADIUS, drawGraph } from "./drawGraph";

interface windowDimensions {
    width: number;
    height: number;
}

const Graph = () => {
    const { nodes, links, setNodes, setLinks } = useData();
    const { canAddNode, canAddEdge, canRemoveEdge, canRemoveNode } = useGraphOptions();

    const newWeight = useRef<number | null>(null);
    console.log("rendered graph")
    const selectedNodeId = useRef<string>('');

    const svgRef = useRef<SVGSVGElement>(null);
    const svgElement = d3.select(svgRef.current);
    const simulation = d3.forceSimulation(nodes);
    const [svgSize, setSvgSize] = useState<windowDimensions>({ width: 0, height: 0 });

    const openModal = (link: Link) => {
        newWeight.current = link.weight;
        Modal.confirm({
            title: 'Змінити вагу ребра',
            content: (
                <Input
                    style={{ borderColor: '#fcbdac' }}
                    type="number"
                    placeholder="Нова вага"
                    defaultValue={link.weight.toString()}
                    onChange={(e) => {
                        let value = parseFloat(e.target.value);
                        if (!Number.isNaN(value) && value > 0) {
                            newWeight.current = parseFloat(e.target.value);
                        } else {
                            message.error("Invalid edge weight, try again!");
                        }
                    }}
                />
            ),
            okButtonProps: { style: { backgroundColor: '#FD744F', borderColor: '#fcbdac' }},
            cancelButtonProps: { style: { backgroundColor: 'white', borderColor: '#fcbdac', color: 'black' } },
            okText: 'Зберегти',
            cancelText: 'Скасувати',
            onOk: () => {
                const updatedLinks = links.map(l => l === link ? { ...l, weight: newWeight.current! } : l);
                setLinks(updatedLinks);
            }
        });
    };

    const { addNode, addEdge, removeNode, removeEdge } = useHandleChangeGraph(nodes, links, setNodes, setLinks);
    const { drawNodes, drawEdges, ticked } = drawGraph(svgElement, nodes, links);
    drawNodes(simulation);
    drawEdges(openModal);

    useEffect(() => {
        const handleResize = () => {
            const canvasContainer = svgRef.current?.parentElement;
            if (canvasContainer) {
                const { width, height } = canvasContainer.getBoundingClientRect();
                setSvgSize({ width, height });
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const keepInBounds = () => {
        nodes.forEach(node => {
            if (node.x !== undefined && node.y !== undefined) {
                node.x = Math.max(RADIUS, Math.min(svgSize.width - RADIUS, node.x));
                node.y = Math.max(RADIUS, Math.min(svgSize.height - RADIUS, node.y));
            }
        });
    }

    useEffect(() => {
        const distance = Math.min(Math.min(svgSize.width, svgSize.height) / nodes.length, 100);

        simulation
            .force('link', d3.forceLink<Node, Link>(links).id((d) => d.id).distance(distance).strength(1))
            .force('collide', d3.forceCollide(distance))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(svgSize.width / 2, svgSize.height / 2))
            .force("bounds", keepInBounds)
            .on("tick", ticked);

        return () => {
            simulation.stop();
        };
    }, [svgSize.width, svgSize.height, nodes, links]);

    const handleSvgClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        if (canAddNode) {
            addNode();
        } else if (canAddEdge) {
            handleAddEdge(e, selectedNodeId, addEdge);
        } else if (canRemoveEdge) {
            handleRemoveEdge(e, removeEdge);
        } else if (canRemoveNode) {
            handleRemoveNode(e, removeNode);
        }
    }
    return (
        <div className='graph-canvas'>
            <svg
                ref={svgRef}
                width={svgSize.width}
                height={svgSize.height}
                onClick={handleSvgClick}
            >
            </svg>
        </div>
    );
}

export default Graph;