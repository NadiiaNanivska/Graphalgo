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
                labelCol={{ span: 8 }}
                onFinish={onFinish}
            >
                <Title className="signup-title">Зареєструватись</Title>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Введіть електронну пошту!',
                        },
                        { type: 'email', message: 'Введіть валідну електронну пошту' }
                    ]}
                >
                    <Input type="email" placeholder="Електронна пошта" />
                </Form.Item>
                <Form.Item
                    name="password"
                    dependencies={['confirmPassword']}
                    hasFeedback
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
                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Введіть пароль для підтвердження!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('Паролі не збігаються!'));
                            },
                          }),
                    ]}
                >
                    <Input.Password placeholder="Повторний пароль" />
                </Form.Item>
                <Form.Item className="signup-center">
                    <Button type="primary" htmlType="submit">
                        Зареєструватись
                    </Button>
                </Form.Item>
                <p className="signup-center">
                    Вже маєте акаунт?{' '}
                    <Link to={FRONTEND_ROUTES.SIGNIN}>Увійдіть</Link>
                </p>
            </Form>
        </div>
    );
}
export default SignInPage;