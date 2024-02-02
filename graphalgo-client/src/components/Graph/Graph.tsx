import { useEffect, useRef, useState } from "react";
import { Data, Node, Link } from "../../app/utils/data";
import * as d3 from "d3";
import useHandleChangeGraph from "../../app/utils/GraphControl";
import { RADIUS, drawGraph } from "./drawGraph";
import { handleAddEdge, handleRemoveEdge, handleRemoveNode } from "../../app/utils/utilFunctions";
import { useGraphOptions } from "../../contexts/GraphOptionsContext";
import { Input, Modal } from "antd";

interface windowDimensions {
    width: number;
    height: number;
}

const Graph = (_props: { data: React.MutableRefObject<Data> }) => {
    console.log(_props.data.current)
    const { canAddNode, canAddEdge, canRemoveEdge, canRemoveNode } = useGraphOptions();
    const [nodes, setNodes] = useState<Node[]>(_props.data.current.nodes.map((d) => ({ ...d })));
    const [links, setLinks] = useState<Link[]>(_props.data.current.links.map((d) => ({ ...d })));
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
                        newWeight.current = parseFloat(e.target.value);
                    }}
                />
            ),
            okButtonProps: { style: { backgroundColor: '#FD744F', borderColor: '#fcbdac' } },
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

            _props.data.current = {nodes: nodes, links: links};

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