import { Col, Row } from 'antd';
import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import GraphTools from '../../components/GraphTools/GraphTools';
import { Data, Link, Node } from './data';
import { RADIUS, drawNetwork } from './drawNetwork';

import './GraphCalculatorPage.css';

interface NetworkDiagramProps {
  data: Data;
};

interface winDimensions {
  width: number;
  height: number;
};

export const GraphCalculatorPage = ({
  data,
}: NetworkDiagramProps) => {
  const [nodes, setNodes] = useState<Node[]>(data.nodes.map((d) => ({ ...d })));
  const [links, setLinks] = useState<Link[]>(data.links.map((d) => ({ ...d })));

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [windowDimensions, setWindowDimensions] = React.useState<winDimensions>({
    width: (window.innerWidth / 24) * 17,
    height: window.innerHeight / 5 * 4 - 100,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: (window.innerWidth / 24) * 17,
        height: window.innerHeight / 5 * 4 - 100,
      });
    };
    window.addEventListener('resize', handleResize);
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
      .force('center', d3.forceCenter(windowDimensions.width / 2, windowDimensions.height / 2))
      .on('tick', () => {
        drawNetwork(context, windowDimensions.width, windowDimensions.height, nodes, links);
      });

    return () => {
      simulation.stop();
    };
  }, [windowDimensions.width, windowDimensions.height, nodes, links]);

  const handleAddNode = () => {
    const newNode: Node = {
      id: `Node_${nodes.length + 1}`,
      group: 'team4', // Adjust the group value as needed
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  return (
    <>
      <Row className='content-container'>
        <Col span={24} md={17}>
          <div className='graph-canvas'>
            <canvas
              ref={canvasRef}
              width={windowDimensions.width}
              height={windowDimensions.height}
            />
          </div>
        </Col>
        <Col span={24} md={7}>
          <GraphTools onAddNode={handleAddNode} />
        </Col>
      </Row>
    </>
  );
};

export default GraphCalculatorPage;
