import { ArrowDownOutlined } from '@ant-design/icons';
import { Button, Col, Layout, Row, Typography } from 'antd';
import './HomePage.css';
import Navbar from '../../components/NavBar/Navbar';

const { Content } = Layout;
const { Title, Text } = Typography;

const HomePage = () => {
    return (
        <Layout>
            {/* Header component */}
            <Navbar />

            {/* Main content */}
            <Content className="content white-background">
                <Title level={2}>Graph Algorithms</Title>
                <Text>Solving complex problems with graphs</Text>
                <Row justify="center" gutter={16} className='margin-top-15'>
                    <Col>
                        <Button type="primary">Get started</Button>
                    </Col>
                    <Col>
                        <Button icon={<ArrowDownOutlined />}>Learn more</Button>
                    </Col>
                </Row>
            </Content>
            <Content className="content">
                <Title level={2}>Graph Algorithms</Title>
                <Text>Solving complex problems with graphs</Text>
            </Content>
        </Layout>
    );
};

export default HomePage;
