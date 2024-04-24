import { Col, Row } from 'antd';
import { Data } from '../../app/utils/data';
import GraphTools from '../../components/GraphTools/GraphTools';

import { useState } from 'react';
import { ShortestPathResponse, TraversalResponse } from '../../app/dto/graphDTO';
import Graph from '../../components/Graph/Graph';
import { DataProvider, GraphOptionsProvider } from '../../contexts/GraphOptionsContext';
import './GraphCalculatorPage.css';


export const GraphCalculatorPage = () => {
  const [algorithmResult, setAlgorithmResult] = useState<TraversalResponse | ShortestPathResponse>();

  return (
    <DataProvider>
      <GraphOptionsProvider>
        <Row className='content-container'>
          <Col span={24} md={17}>
            <Graph traversalResult={algorithmResult} />
          </Col>
          <Col span={24} md={7}>
            <GraphTools setTraversalResult={setAlgorithmResult} />
          </Col>
        </Row>
      </GraphOptionsProvider>
    </DataProvider>
  );
};

export default GraphCalculatorPage;
