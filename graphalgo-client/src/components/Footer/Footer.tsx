import { Col, Divider, Row, Typography } from 'antd';
import './Footer.css';

import './Footer.css';

const { Title, Text } = Typography;

const Footer = (_props: { Logo: string, Nav1: string, text: string }) => {
    return (
        <footer className="footer-container">
            <Row justify={'center'}>
                <Title className="footer-logo" level={3}>
                    {_props.Logo}
                </Title>
            </Row>
            <Row justify={'center'}>
                <Text className="footer-nav" type="secondary">
                    {_props.Nav1}
                </Text>
            </Row>
            <Divider />
            <Row>
                <Col>
                    <Text className="footer-text" type="secondary">
                        {_props.text}
                    </Text>
                </Col>
            </Row>
        </footer>
    );
};

Footer.defaultProps = {
    Logo: 'GRAPHALGO',
    text: '© 2024 Nanivska, All Rights Reserved.',
    Nav1: 'Graph Algorithms',
};

export default Footer;
