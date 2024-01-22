import React from 'react';
import { Form, Input, Button, Typography, message, notification, Layout } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './SignInPage.css';
import { FRONTEND_ROUTES } from '../../api/utils/constants/Constants';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

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
                <Form.Item>
                    <Button type="primary" className="signin-button" htmlType="submit">
                        Sign in
                    </Button>
                    <p>
                        Don't have an account?{' '}
                        <Link to={FRONTEND_ROUTES.REGISTER}>Sign up</Link>
                    </p>
                </Form.Item>
            </Form>
        </div>
    );
}
export default SignInPage;