import { Button, Col, Popover, Row, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { UserOutlined } from '@ant-design/icons';
import { FRONTEND_ROUTES } from '../../app/constants/Constants';
import './Navbar.css';

const { Text } = Typography;

const content = (
    <div>
        <Text type="danger">Log out</Text>
    </div>
);

const Navbar = (_props: { user: string | null }) => {
    return (
        <Header className="header white-background">
            <Row justify="space-between" align="middle">
                <Col>
                    <Title className="margin-top-15" level={2}>GRAPHALGO</Title>
                </Col>
                <Col>
                    {
                        _props.user ?
                            <Popover content={content}>
                                <Button type="text" shape="circle" icon={<UserOutlined />} size={'large'} />
                            </Popover>
                            : <>
                                <a href={FRONTEND_ROUTES.SIGNIN}><Button className="hide-on-mobile margin-right-16">Sign in</Button></a>
                                <a href={FRONTEND_ROUTES.SIGNUP}><Button type="primary" className="hide-on-mobile">Sign up</Button></a>
                            </>
                    }
                </Col>
            </Row>
        </Header>
    );
}

export default Navbar;