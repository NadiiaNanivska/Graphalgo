import { Button, Col, Drawer, Form, InputNumber, Row, Space } from "antd";

const InputNodesDrawer = (_props: { startNode: React.MutableRefObject<string>, endNode: React.MutableRefObject<string>, fetchAlgorithmData: (startNode: string, endNode: string) => void, open: boolean, onclose: () => void }) => {
  const [form] = Form.useForm();
  
  const handleDrawerClose = () => {
    _props.onclose();
    _props.startNode.current = "0";
    _props.endNode.current = "0";
    form.resetFields();
  };

  return (
    <>
      <Drawer
        title="Find the shortest path between vertices"
        width={500}
        onClose={_props.onclose}
        open={_props.open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={handleDrawerClose}>Скасувати</Button>
            <Button onClick={() => {_props.fetchAlgorithmData(_props.startNode.current, _props.endNode.current); handleDrawerClose(); }} type="primary">
              Save
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="startNode"
                label="Start vertex"
                rules={[{ required: true, message: 'Enter start vertex' }]}
              >
                <InputNumber placeholder="Start vertex"
                  style={{ width: '100%' }}
                  defaultValue={0}
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
                label="End vertex"
                rules={[{ required: true, message: 'Enter end vertex' }]}
              >
                <InputNumber placeholder="End vertex"
                  style={{ width: '100%' }}
                  defaultValue={0}
                  onChange={(value) => {
                    if (value !== null) {
                      _props.endNode.current = value!.toString();
                    }
                  }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};


export default InputNodesDrawer;