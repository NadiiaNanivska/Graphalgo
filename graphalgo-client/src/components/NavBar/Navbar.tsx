import { Button, Col, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";

import { FRONTEND_ROUTES } from '../../app/constants/Constants';
import './Navbar.css';

const Navbar = () => {
    return (
        <Header className="header white-background">
            <Row justify="space-between" align="middle">
                <Col>
                    <Title className="margin-top-15" level={2}>GRAPHALGO</Title>
                </Col>
                <Col>
                    <a href={FRONTEND_ROUTES.SIGNIN}><Button className="hide-on-mobile margin-right-16">Sign in</Button></a>
                    <a href={FRONTEND_ROUTES.SIGNUP}><Button type="primary" className="hide-on-mobile">Sign up</Button></a>
                </Col>
            </Row>
        </Header>
    );
}

export default Navbar;