import { LoginOutlined, PlusOutlined, ProfileOutlined } from '@ant-design/icons';
import { Button, Col, FloatButton, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";

import './Navbar.css';

const Navbar = () => {
    return (
        <Header className="header white-background">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title className="margin-top-15" level={2}>GRAPHALGO</Title>
                    </Col>
                    <Col>
                        <Button className="hide-on-mobile margin-right-16">Sign in</Button>
                        <Button type="primary" className="hide-on-mobile">Sign up</Button>
                        <FloatButton.Group
                            className='floating-button'
                            trigger="click"
                            type="primary"
                            style={{ right: 24 }}
                            icon={<PlusOutlined />}
                        >
                            <FloatButton icon={<LoginOutlined />} />
                            <FloatButton icon={<ProfileOutlined />} />
                        </FloatButton.Group>
                    </Col>
                </Row>
            </Header>
    );
}

export default Navbar;