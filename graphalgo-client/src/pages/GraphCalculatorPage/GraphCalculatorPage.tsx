import { Col, Row } from 'antd';
import { Data } from '../../api/utils/helperFunctions/data';
import GraphTools from '../../components/GraphTools/GraphTools';

import { GraphOptionsProvider } from '../../contexts/GraphOptionsContext';
import Graph from '../../components/Graph/Graph';
import './GraphCalculatorPage.css';

interface NetworkDiagramProps {
  data: Data;
}


export const GraphCalculatorPage = ({ data }: NetworkDiagramProps) => {
  console.log("Rendered GraphCalculatorPage")

  return (
    <GraphOptionsProvider>
      <Row className='content-container'>
        <Col span={24} md={17}>
          <Graph
            data={data}
          />
        </Col>
        <Col span={24} md={7}>
          <GraphTools
          />
        </Col>
      </Row>
    </GraphOptionsProvider>
  );
};

export default GraphCalculatorPage;
