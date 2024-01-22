import React from 'react';
import { Form, Input, Button, Typography, message, notification, Layout } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FRONTEND_ROUTES } from '../../api/utils/constants/Constants';
import './SignUpPage.css';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const SignInPage = () => {
    return (
        <div className="signup-container">
            <Form
                className="signup-form"
                name="registration"
                labelCol={{ span: 6 }}
            >
                <Title className="signup-title">Sign up</Title>
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
                    dependencies={['confirmPassword']}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        }
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please input confirm password!',
                        }
                    ]}
                >
                    <Input.Password placeholder="Confirm password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Sign up
                    </Button>
                </Form.Item>
                <p>
                    Already have an account?{' '}
                    <Link to={FRONTEND_ROUTES.LOGIN}>Sign in</Link>
                </p>
            </Form>
        </div>
    );
}
export default SignInPage;