import { Col, Row } from 'antd';
import { Data } from '../../app/utils/data';
import GraphTools from '../../components/GraphTools/GraphTools';

import { GraphOptionsProvider } from '../../contexts/GraphOptionsContext';
import Graph from '../../components/Graph/Graph';
import './GraphCalculatorPage.css';
import { useRef } from 'react';

interface NetworkDiagramProps {
  data: Data;
}


export const GraphCalculatorPage = ({ data }: NetworkDiagramProps) => {
  console.log("Rendered GraphCalculatorPage")

  const graphData = useRef<Data>(data);

  return (
    <GraphOptionsProvider>
      <Row className='content-container'>
        <Col span={24} md={17}>
          <Graph
            data={graphData}
          />
        </Col>
        <Col span={24} md={7}>
          <GraphTools
            graphData={graphData}
          />
        </Col>
      </Row>
    </GraphOptionsProvider>
  );
};

export default GraphCalculatorPage;
