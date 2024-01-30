import { Col, Row } from 'antd';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import { Data, Link, Node } from '../../api/utils/helperFunctions/data';
import GraphTools from '../../components/GraphTools/GraphTools';
import { RADIUS, drawGraph } from './drawGraph';

import useHandleAddNode from '../../api/utils/helperFunctions/GraphControl';
import './GraphCalculatorPage.css';

interface NetworkDiagramProps {
  data: Data;
}

interface windowDimensions {
  width: number;
  height: number;
}

export const GraphCalculatorPage = ({ data }: NetworkDiagramProps) => {
  const [nodes, setNodes] = useState<Node[]>(data.nodes.map((d) => ({ ...d })));
  const [links, setLinks] = useState<Link[]>(data.links.map((d) => ({ ...d })));
  const [canAddEdge, setCanAddEdge] = useState(false);
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);

  const canvasRef = useRef<SVGSVGElement>(null);
  const svgElement = d3.select(canvasRef.current);
  const [canvasSize, setCanvasSize] = useState<windowDimensions>({ width: 0, height: 0 });

  const { drawNodes, drawEdges, ticked } = drawGraph(svgElement, canvasSize.width, canvasSize.height, nodes, links);
  drawNodes();
  drawEdges();

  console.log("Rendered")

  useEffect(() => {
    const handleResize = () => {
      const canvasContainer = canvasRef.current?.parentElement;
      if (canvasContainer) {
        const { width, height } = canvasContainer.getBoundingClientRect();
        setCanvasSize({ width, height });
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
        node.x = Math.max(RADIUS, Math.min(canvasSize.width - RADIUS, node.x));
        node.y = Math.max(RADIUS, Math.min(canvasSize.height - RADIUS, node.y));
      }
    });
  }

  useEffect(() => {
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id((d) => d.id).distance(150))
      .force('collide', d3.forceCollide().radius(RADIUS))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(canvasSize.width / 2, canvasSize.height / 2))
      .force("bounds", keepInBounds)
      .on("tick", ticked);

    return () => {
      simulation.stop();
    };
  }, [canvasSize.width, canvasSize.height, nodes, links]);

  const { addNode, addEdge } = useHandleAddNode(nodes, setNodes, setLinks);

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const clickedNodeId = (e.target as SVGElement).getAttribute('data-node-id');
    if (clickedNodeId) {
      setSelectedNodeIds((prevIds) => [...prevIds, clickedNodeId]);
    }
  }

  useEffect(() => {
    if (selectedNodeIds.length === 2) {
      const [sourceId, targetId] = selectedNodeIds;
      addEdge(sourceId, targetId, 1);
      setSelectedNodeIds([]);
    }
  }, [selectedNodeIds]);

  return (
    <>
      <Row className='content-container'>
        <Col span={24} md={17}>
          <div className='graph-canvas'>
            <svg
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              onClick={canAddEdge ? handleCanvasClick : undefined}
            >
            </svg>
          </div>
        </Col>
        <Col span={24} md={7}>
          <GraphTools onAddNode={addNode} enableAddEdge={(arg: boolean) => { setCanAddEdge(arg); }} />
        </Col>
      </Row>
    </>
  );
};

export default GraphCalculatorPage;
