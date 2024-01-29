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
};

interface windowDimensions {
  width: number;
  height: number;
};

export const GraphCalculatorPage = ({ data }: NetworkDiagramProps) => {
  const [nodes, setNodes] = useState<Node[]>(data.nodes.map((d) => ({ ...d })));
  const [links, setLinks] = useState<Link[]>(data.links.map((d) => ({ ...d })));
  const [canAddEdge, setCanAddEdge] = useState(false);

  const canvasRef = useRef<SVGSVGElement>(null);
  const [canvasSize, setCanvasSize] = useState<windowDimensions>({ width: 0, height: 0 });

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

  useEffect(() => {
    const svgElement = d3.select(canvasRef.current);

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id((d) => d.id).distance(75))
      .force('collide', d3.forceCollide().radius(RADIUS))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(canvasSize.width / 2, canvasSize.height / 2));

    const { drawNodes, drawEdges } = drawGraph(svgElement, canvasSize.width, canvasSize.height, nodes, links);
    simulation.on("tick", () => {
      drawEdges();
      drawNodes();
    });

    return () => {
      simulation.stop();
    };
  }, [canvasSize.width, canvasSize.height, nodes, links]);

  const { addNode, addEdge } = useHandleAddNode(nodes, setNodes, setLinks);

  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);

  const handleCanvasClick = (e: MouseEvent) => {
    if (!canAddEdge) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedNode = nodes.find(node => {
      const dx = node.x! - x;
      const dy = node.y! - y;
      return Math.sqrt(dx * dx + dy * dy) <= RADIUS;
    });

    if (clickedNode) {
      setSelectedNodeIds(prevIds => { return [...prevIds, clickedNode.id] });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (canAddEdge) {
      canvas.addEventListener('click', handleCanvasClick);
    } else {
      canvas.removeEventListener('click', handleCanvasClick);
    }

    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [canAddEdge]);

  useEffect(() => {
    if (selectedNodeIds.length === 2) {
      const [sourceId, targetId] = selectedNodeIds;
      addEdge(sourceId, targetId, 1);
      setSelectedNodeIds([]);
    } else {
      console.log("Please select two nodes to add an edge.");
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
            />
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
