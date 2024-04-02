import { Button, Form, Input, Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { FRONTEND_ROUTES } from '../../app/constants/Constants';
import './SignInPage.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const SignInPage = () => {
    return (
        <div className="signin-container">
            <Form
                name="registration"
                labelCol={{ span: 6 }}
                className="signin-form"
            >
                <Title className="signin-title">Sign in</Title>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        }
                    ]}
                >
                    <Input type="email" placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        }
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item className="signin-center">
                    <Button type="primary" className="signin-button" htmlType="submit">
                        Sign in
                    </Button>
                    </Form.Item>
                    <p className="signin-center">
                        Don't have an account?{' '}
                        <Link to={FRONTEND_ROUTES.SIGNUP}>Sign up</Link>
                    </p>
            </Form>
        </div>
    );
}
export default SignInPage;