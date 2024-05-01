import { ArrowDownOutlined } from '@ant-design/icons';
import { Button, Col, Layout, Row, Typography } from 'antd';
import FAQQuestion from '../../components/FAQQuestion/FAQQuestion';
import './HomePage.css';

import { Link } from 'react-router-dom';
import { FRONTEND_ROUTES } from '../../app/constants/Constants';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const HomePage = () => {
    return (
        <>
            <Row className="content white-background">
                <Title level={2}>Graph Algorithms</Title>
                <Text>Solving complex problems with graphs</Text>
                <Row justify="center" gutter={16} className='margin-top-15'>
                    <Col>
                        <Link to={FRONTEND_ROUTES.CALCULATOR}><Button type="primary">Get started</Button></Link>
                    </Col>
                    <Col>
                        <Button icon={<ArrowDownOutlined />}>Learn more</Button>
                    </Col>
                </Row>
            </Row>
            <Row className='faq' gutter={16}>
                <Col span={24} md={6}>
                    <Title level={3}>FAQ</Title>
                    <Title level={2}>Common questions</Title>
                    <Paragraph>
                        Here are some of the most common questions that we get.
                    </Paragraph>
                </Col>
                <Col span={24} md={17}>
                    <Row gutter={16}>
                        <Col>
                            <FAQQuestion
                                answer="Graph algorithms are a set of techniques used to solve problems on graphs, which are mathematical structures consisting of nodes and edges."
                                question="What are graph algorithms?"
                            />
                        </Col>
                        <Col>
                            <FAQQuestion
                                answer="Some common graph algorithms include breadth-first search (BFS), depth-first search (DFS), Dijkstra's algorithm, and the minimum spanning tree (MST) algorithms."
                                question="What are some common graph algorithms?"
                            />
                        </Col>
                        <Col>
                            <FAQQuestion
                                answer="Graph algorithms have various applications in real-world scenarios such as social network analysis, route planning, recommendation systems, and network optimization."
                                question="How are graph algorithms used in real-world applications?"
                            />
                        </Col>
                        <Col>
                            <FAQQuestion
                                answer="The time complexity of graph algorithms can vary depending on the specific algorithm and problem being solved. Some algorithms have a time complexity of O(V + E), where V is the number of vertices and E is the number of edges in the graph."
                                question="What is the time complexity of graph algorithms?"
                            />
                        </Col>
                        <Col>
                            <FAQQuestion
                                answer="Yes, there are several libraries and frameworks available for implementing graph algorithms, such as NetworkX in Python, JGraphT in Java, and igraph in R."
                                question="Are there any libraries or frameworks available for implementing graph algorithms?"
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default HomePage;
