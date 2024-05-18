import { Button, Col, Dropdown, Menu, Popover, Row, Typography, Grid } from "antd";
import { Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { UserOutlined, MenuOutlined, LogoutOutlined } from '@ant-design/icons';
import { FRONTEND_ROUTES } from '../../app/constants/Constants';
import './Navbar.css';
import { logout } from "../../app/api/userService";

const { Text } = Typography;
const { useBreakpoint } = Grid;

const onLogout = () => {
    logout().then(() => {
        window.location.href = FRONTEND_ROUTES.SIGNIN;
    })
        .catch(error => {
            console.error('Error:', error);
        });
}

const Navbar = (_props: { user: string | null }) => {
    const screens = useBreakpoint();
    const hamburgerContent = (
        <Menu>
            <Menu.Item key="history">
                <a href={FRONTEND_ROUTES.HISTORY}>Історія</a>
            </Menu.Item>
        </Menu>
    );

    const content = (
        <div>
            <Text type="danger" onClick={onLogout}><LogoutOutlined />  Вийти</Text>
        </div>
    );

    return (
        <Header className="header white-background">
            <Row justify="space-between" align="middle">
                <Col xs={14} sm={8} md={6} lg={6} xl={6}>
                    <a href={"/"}><Title className="margin-top-15" level={2}>GRAPHALGO</Title></a>
                </Col>
                <Col xs={10} sm={16} md={18} lg={18} xl={18}>
                    {screens.xs ? _props.user &&
                        <Row justify="end" align="middle">
                            <Popover content={content}>
                                <Button type="text" shape="circle" icon={<UserOutlined />} size={'large'} />
                            </Popover>
                            <Dropdown overlay={hamburgerContent} trigger={['click']}>
                                <Button type="text" icon={<MenuOutlined />} size={'large'} />
                            </Dropdown>
                        </Row>
                        : _props.user ?
                            <Row justify="end" align="middle">
                                <a href={FRONTEND_ROUTES.HISTORY} className="margin-right-15">Історія</a>
                                <div><a>{_props.user}</a>
                                    <Popover content={content}>
                                        <Button type="text" shape="circle" icon={<UserOutlined />} size={'large'} />
                                    </Popover>
                                </div>
                            </Row>
                            :
                            <Row justify="end" align="middle">
                                <a href={FRONTEND_ROUTES.SIGNIN}><Button className="hide-on-mobile margin-right-16">Увійти</Button></a>
                                <a href={FRONTEND_ROUTES.SIGNUP}><Button type="primary" className="hide-on-mobile">Зареєструватись</Button></a>
                            </Row>
                    }
                </Col>
            </Row>
        </Header>
    );
}

export default Navbar;
