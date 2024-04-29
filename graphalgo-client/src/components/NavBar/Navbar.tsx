import { Button, Col, Popover, Row, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { UserOutlined } from '@ant-design/icons';
import { FRONTEND_ROUTES } from '../../app/constants/Constants';
import './Navbar.css';
import { LogoutOutlined } from '@ant-design/icons';
import { logout } from "../../app/api/userService";

const { Text } = Typography;

const onLogout = () => {
    logout();
    window.location.href = FRONTEND_ROUTES.SIGNIN;
}

const content = (
    <div>
        <Text type="danger" onClick={onLogout}><LogoutOutlined />  Log out</Text>
    </div>
);

const Navbar = (_props: { user: string | null }) => {
    return (
        <Header className="header white-background">
            <Row justify="space-between" align="middle">
                <Col span={6}>
                    <a href={"/"}><Title className="margin-top-15" level={2}>GRAPHALGO</Title></a>
                </Col>
                <Col span={4}>
                    {
                        _props.user ?
                            <Row justify="end" align="middle">
                                <a href={FRONTEND_ROUTES.HISTORY} className="margin-right-15">History</a>
                                <div><a>{_props.user}</a>
                                    <Popover content={content}>
                                        <Button type="text" shape="circle" icon={<UserOutlined />} size={'large'} />
                                    </Popover>
                                </div>
                            </Row>
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