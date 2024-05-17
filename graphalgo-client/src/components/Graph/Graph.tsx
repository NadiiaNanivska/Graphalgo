import { Input, Modal, message } from "antd";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import useHandleChangeGraph from "../../app/utils/GraphControl";
import { Link, Node, windowDimensions } from "../../app/utils/data";
import { handleAddEdge, handleRemoveEdge, handleRemoveNode, openModal } from "../../app/utils/utilFunctions";
import { useData, useGraphOptions } from "../../contexts/GraphOptionsContext";
import { RADIUS, drawGraph } from "./drawGraph";
import { ShortestPathResponse, TraversalResponse } from "../../app/dto/graphDTO";
import { INVALID_INPUT_MESSAGE } from "../../app/constants/Constants";


const Graph = (_props: { traversalResult: TraversalResponse | ShortestPathResponse | undefined }) => {
    const [svgSize, setSvgSize] = useState<windowDimensions>({ width: 0, height: 0 });
    const newWeight = useRef<number | null>(null);
    const selectedNodeId = useRef<string>('');
    const svgRef = useRef<SVGSVGElement>(null);
    const svgElement = d3.select(svgRef.current);
    const { nodes, links, setNodes, setLinks } = useData();
    const { canAddNode, canAddEdge, canRemoveEdge, canRemoveNode } = useGraphOptions();
    const { addNode, addEdge, removeNode, removeEdge } = useHandleChangeGraph(nodes, links, setNodes, setLinks);
    const { drawNodes, drawEdges, ticked } = drawGraph(svgElement, nodes, links, _props.traversalResult);

    const simulation = d3.forceSimulation(nodes);

    const keepInBounds = () => {
        nodes.forEach(node => {
            if (node.x !== undefined && node.y !== undefined) {
                node.x = Math.max(RADIUS, Math.min(svgSize.width - RADIUS, node.x));
                node.y = Math.max(RADIUS, Math.min(svgSize.height - RADIUS, node.y));
            }
        });
    }

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


    useEffect(() => {
        const distance = Math.min(Math.min(svgSize.width, svgSize.height) / nodes.length, 100);

        try {
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
        } catch {
            setNodes([]);
            setLinks([]);
            message.error(INVALID_INPUT_MESSAGE)
        }
    }, [svgSize.width, svgSize.height, nodes, links]);

    const handleOpenModal = (link: Link) => {
        openModal(link, newWeight, links, setLinks);
    };

    drawNodes(simulation);
    drawEdges(handleOpenModal);

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