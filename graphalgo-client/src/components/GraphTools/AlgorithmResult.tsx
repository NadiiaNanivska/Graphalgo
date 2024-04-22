import { Drawer, Typography } from "antd";

const { Title, Text } = Typography;

const AlgorithmResult = (_props: { content: string, open: boolean, onclose: () => void }) => {
    return (
        <Drawer
            title="Algorithm results"
            placement={'bottom'}
            width={500}
            onClose={_props.onclose}
            open={_props.open}
        >
            <Title level={3}>{_props.content}</Title>
        </Drawer>
    );
};

export default AlgorithmResult;