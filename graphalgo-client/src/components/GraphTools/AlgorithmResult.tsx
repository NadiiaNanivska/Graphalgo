import { Button, Col, Drawer, Form, InputNumber, Row, Space, Typography } from "antd";

const { Title, Text } = Typography;

const AlgorithmResult = (_props: { startNode: React.MutableRefObject<string>, endNode: React.MutableRefObject<string>, fetchDFSData: (startNode: string, endNode: string) => void, open: boolean, onclose: () => void }) => {
return (
    <>
      <Drawer
        title="Create a new account"
        width={400}
        onClose={_props.onclose}
        open={_props.open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={_props.onclose}>Cancel</Button>
            <Button onClick={() => {_props.fetchDFSData(_props.startNode.current, _props.endNode.current); _props.onclose()}} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="startNode"
                label="Start Node"
                rules={[{ required: true, message: 'Please enter the start node' }]}
              >
                <InputNumber placeholder="Please enter the start node"
                style={{ width: '100%' }} 
                 onChange={(value) => {
                    if (value !== null) {
                        _props.startNode.current = value!.toString();
                    }
                }} /> 
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="endNode"
                label="End Node"
                rules={[{ required: true, message: 'Please enter the end node' }]}
              >
                <InputNumber placeholder="Please enter the end node" 
                style={{ width: '100%' }}
                onChange={(value) => {
                    if (value !== null) {
                        _props.endNode.current = value!.toString();
                    }
                }}/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};


export default AlgorithmResult;