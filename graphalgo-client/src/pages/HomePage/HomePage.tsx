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
                <Title level={2}>Алгоритми на графах</Title>
                <Text>Розв'язання складних задач за допомогою графів</Text>
                <Row justify="center" gutter={16} className='margin-top-15'>
                    <Col>
                        <Link to={FRONTEND_ROUTES.CALCULATOR}><Button type="primary">Почати</Button></Link>
                    </Col>
                    <Col>
                        <Button icon={<ArrowDownOutlined />}>Дізнатися більше</Button>
                    </Col>
                </Row>
            </Row>
            <Row className='faq' gutter={16}>
                <Col span={24} md={6}>
                    <Title level={3}>FAQ</Title>
                    <Title level={2}>Поширені запитання</Title>
                    <Paragraph>
                        Ось деякі з найбільш поширених запитань, які ми отримуємо.
                    </Paragraph>
                </Col>
                <Col span={24} md={17}>
                    <Row gutter={16}>
                        <Col>
                            <FAQQuestion
                                answer="Алгоритми графів - це набір технік, які використовуються для розв'язання задач на графах, що є математичними структурами, що складаються з вузлів і ребер."
                                question="Що таке алгоритми графів?"
                            />
                        </Col>
                        <Col>
                            <FAQQuestion
                                answer="Деякі поширені алгоритми графів включають пошук у ширину (BFS), пошук у глибину (DFS), алгоритм Дейкстри та алгоритми мінімального кістякового дерева (MST)."
                                question="Які є поширені алгоритми графів?"
                            />
                        </Col>
                        <Col>
                            <FAQQuestion
                                answer="Алгоритми графів мають різні застосування у реальному світі, такі як аналіз соціальних мереж, планування маршрутів, рекомендаційні системи та оптимізація мереж."
                                question="Як використовуються алгоритми графів у реальних застосуваннях?"
                            />
                        </Col>
                        <Col>
                            <FAQQuestion
                                answer="Часова складність алгоритмів графів може змінюватися залежно від конкретного алгоритму та задачі, яку необхідно розв'язати. Деякі алгоритми мають часову складність O(V + E), де V - кількість вершин, а E - кількість ребер у графі."
                                question="Яка часова складність алгоритмів графів?"
                            />
                        </Col>
                        <Col>
                            <FAQQuestion
                                answer="Так, є кілька бібліотек та фреймворків для реалізації алгоритмів графів, такі як NetworkX на Python, JGraphT на Java та igraph на R."
                                question="Чи є бібліотеки або фреймворки для реалізації алгоритмів графів?"
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default HomePage;
