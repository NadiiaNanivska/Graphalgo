import { Button, Form, Input, Layout, Typography, message } from 'antd';
import { Link } from 'react-router-dom';
import { FRONTEND_ROUTES } from '../../app/constants/Constants';
import './SignUpPage.css';
import { RegisterRequest } from '../../app/dto/authDTOs';
import { register } from '../../app/api/userService';
import { validatePassword } from '../../app/utils/validators';

const { Content } = Layout;
const { Title, Text } = Typography;

const SignInPage = () => {
    const onFinish = async (values: RegisterRequest) => {
        try {
            await register(values);
            window.location.href = FRONTEND_ROUTES.CALCULATOR;
        } catch (error) {
            message.error((error as Error).message);
        }
    }

    return (
        <div className="signup-container">
            <Form
                className="signup-form"
                name="registration"
                labelCol={{ span: 6 }}
                onFinish={onFinish}
            >
                <Title className="signup-title">Sign up</Title>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        { type: 'email', message: 'Please enter a valid email address' }
                    ]}
                >
                    <Input type="email" placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    dependencies={['confirmPassword']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {validator: validatePassword}
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please input confirm password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                          }),
                    ]}
                >
                    <Input.Password placeholder="Confirm password" />
                </Form.Item>
                <Form.Item className="signup-center">
                    <Button type="primary" htmlType="submit">
                        Sign up
                    </Button>
                </Form.Item>
                <p className="signup-center">
                    Already have an account?{' '}
                    <Link to={FRONTEND_ROUTES.SIGNIN}>Sign in</Link>
                </p>
            </Form>
        </div>
    );
}
export default SignInPage;