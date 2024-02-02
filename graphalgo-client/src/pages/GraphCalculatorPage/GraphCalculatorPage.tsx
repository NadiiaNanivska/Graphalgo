import { Col, Row } from 'antd';
import { Data } from '../../app/utils/data';
import GraphTools from '../../components/GraphTools/GraphTools';

import { DataProvider, GraphOptionsProvider } from '../../contexts/GraphOptionsContext';
import Graph from '../../components/Graph/Graph';
import './GraphCalculatorPage.css';
import { useRef } from 'react';

interface NetworkDiagramProps {
  data: Data;
}


export const GraphCalculatorPage = () => {
  console.log("Rendered GraphCalculatorPage")

  return (
    <DataProvider>
    <GraphOptionsProvider>
      <Row className='content-container'>
        <Col span={24} md={17}>
          <Graph  />
        </Col>
        <Col span={24} md={7}>
          <GraphTools  />
        </Col>
      </Row>
    </GraphOptionsProvider>
    </DataProvider>
  );
};

export default GraphCalculatorPage;
