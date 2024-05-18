import { Button, Form, Input, Layout, Typography, message } from 'antd';
import { Link } from 'react-router-dom';
import { FRONTEND_ROUTES } from '../../app/constants/Constants';
import './SignInPage.css';
import { login } from '../../app/api/userService';
import { LoginRequest, User } from '../../app/dto/authDTOs';
import { validatePassword } from '../../app/utils/validators';

const { Content } = Layout;
const { Title, Text } = Typography;

const SignInPage = () => {
    const onFinish = async (values: LoginRequest) => {
        try {
            await login(values);
            window.location.href = FRONTEND_ROUTES.CALCULATOR;
        } catch (error) {
            message.error((error as Error).message);
        }
    }

    return (
        <div className="signin-container">
            <Form
                name="registration"
                labelCol={{ span: 6 }}
                className="signin-form"
                onFinish={onFinish}
            >
                <Title className="signin-title">Увійти</Title>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Введіть електронну пошту!',
                        },
                        { type: 'email', message: 'Please enter a valid email address' }
                    ]}
                >
                    <Input type="email" placeholder="Електронна пошта" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Введіть пароль!',
                        },
                        {validator: validatePassword}
                    ]}
                >
                    <Input.Password placeholder="Пароль" />
                </Form.Item>
                <Form.Item className="signin-center">
                    <Button type="primary" className="signin-button" htmlType="submit">
                        Увійти
                    </Button>
                </Form.Item>
                <p className="signin-center">
                    Не маєте акаунту?{' '}
                    <Link to={FRONTEND_ROUTES.SIGNUP}>Зареєструйтесь</Link>
                </p>
            </Form>
        </div>
    );
}
export default SignInPage;