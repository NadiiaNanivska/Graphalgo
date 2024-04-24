import { Col, Row } from 'antd';
import { Data } from '../../app/utils/data';
import GraphTools from '../../components/GraphTools/GraphTools';

import { DataProvider, GraphOptionsProvider } from '../../contexts/GraphOptionsContext';
import Graph from '../../components/Graph/Graph';
import './GraphCalculatorPage.css';
import { useRef, useState } from 'react';
import { ShortestPathResponse, TraversalResponse } from '../../app/dto/TraversalDTO';

interface NetworkDiagramProps {
  data: Data;
}


export const GraphCalculatorPage = () => {
  console.log("Rendered GraphCalculatorPage")

  const [traversalResult, setTraversalResult] = useState<TraversalResponse | ShortestPathResponse>();

  return (
    <DataProvider>
    <GraphOptionsProvider>
      <Row className='content-container'>
        <Col span={24} md={17}>
          <Graph traversalResult={traversalResult}/>
        </Col>
        <Col span={24} md={7}>
          <GraphTools setTraversalResult={setTraversalResult}/>
        </Col>
      </Row>
    </GraphOptionsProvider>
    </DataProvider>
  );
};

export default GraphCalculatorPage;
