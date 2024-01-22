import { LoginOutlined, PlusOutlined, ProfileOutlined } from '@ant-design/icons';
import { Button, Col, FloatButton, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import './Navbar.css';
import { FRONTEND_ROUTES } from '../../api/utils/constants/Constants';

const Navbar = () => {
    return (
        <Header className="header white-background">
            <Row justify="space-between" align="middle">
                <Col>
                    <Title className="margin-top-15" level={2}>GRAPHALGO</Title>
                </Col>
                <Col>
                    <Link to={FRONTEND_ROUTES.LOGIN}><Button className="hide-on-mobile margin-right-16">Sign in</Button></Link>
                    <Link to={FRONTEND_ROUTES.REGISTER}><Button type="primary" className="hide-on-mobile">Sign up</Button></Link>
                </Col>
            </Row>
        </Header>
    );
}

export default Navbar;