import { Col, Row } from 'antd';
import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import GraphTools from '../../components/GraphTools/GraphTools';
import { Data, Link, Node } from '../../api/utils/helperFunctions/data';
import { RADIUS, drawGraph } from './drawGraph';

import './GraphCalculatorPage.css';
import useHandleAddNode from '../../api/utils/helperFunctions/GraphControl';

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

  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!context) {
      return;
    }

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id((d) => d.id).distance(200))
      .force('collide', d3.forceCollide().radius(RADIUS))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(canvasSize.width / 2, canvasSize.height / 2))
      .on('tick', () => {
        nodes.forEach(node => {
          if (node.x !== undefined && node.y !== undefined) {
            node.x = Math.max(RADIUS, Math.min(canvasSize.width - RADIUS, node.x));
            node.y = Math.max(RADIUS, Math.min(canvasSize.height - RADIUS, node.y));
          }
        });
        drawGraph(context, canvasSize.width, canvasSize.height, nodes, links);
      });

    return () => {
      simulation.stop();
    };
  }, [canvasSize.width, canvasSize.height, nodes, links]);

  const { addNode, addEdge } = useHandleAddNode(nodes, setNodes, setLinks);


  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);

  const handleCanvasClick = (e: MouseEvent) => {
    console.log(canAddEdge)
    if (!canAddEdge) return;
    const canvas = canvasRef.current;
    if (!canvas) return; // Exit early if canvas is null

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Find the clicked node, if any
    const clickedNode = nodes.find(node => {
      const dx = node.x! - x;
      const dy = node.y! - y;
      return Math.sqrt(dx * dx + dy * dy) <= RADIUS;
    });

    // If a node is clicked, add its ID to selectedNodeIds
    if (clickedNode) {
      setSelectedNodeIds(prevIds => {
        const newIds = [...prevIds, clickedNode.id];
        console.log(newIds); // Log the updated selectedNodeIds
        return newIds;
    });
      console.log(selectedNodeIds)
      if (selectedNodeIds.length >= 2) {
        
        addEdge(selectedNodeIds[0], clickedNode.id, 1);
      }
    }
  };

  console.log(links)

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

  // const handleAddEdge = () => {
  //   // Check if exactly two nodes are selected
  //   if (selectedNodeIds.length === 2) {
  //     const [sourceId, targetId] = selectedNodeIds;
  //     addEdge(sourceId, targetId, 1);
  //     console.log(links)
  //   } else {
  //     // Notify the user to select two nodes
  //     console.log("Please select two nodes to add an edge.");
  //   }
  // };

  return (
    <>
      <Row className='content-container'>
        <Col span={24} md={17}>
          <div className='graph-canvas'>
            <canvas
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
            />
          </div>
        </Col>
        <Col span={24} md={7}>
          <GraphTools onAddNode={addNode} enableAddEdge={() => { setCanAddEdge(true); }} />
        </Col>
      </Row>
    </>
  );
};

export default GraphCalculatorPage;
