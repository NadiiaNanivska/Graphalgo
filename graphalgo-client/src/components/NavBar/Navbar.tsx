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
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <a className="flex" href={"/"}>
                    <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQVYfyfHEfh-0xWNv6hMTb6zGk4ZZneAdgi3kfMJDliJGU1BQ7C" alt="logo" width="48" height="48"/>
            <Title className="margin-top-15" level={2}>GRAPHALGO</Title></a>
                </Col>
                <Col xs={0} sm={0} md={0} lg={16} xl={16}>
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
