import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import { LockOutlined } from '@ant-design/icons';
import { FRONTEND_ROUTES } from '../../app/constants/Constants';
import { resetPassword } from '../../app/api/userService';
import { useLocation } from 'react-router-dom';

const { Item } = Form;

const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    if (token) {
      setToken(token);
    } else {
      notification.error({
        message: 'Помилка',
        description: 'Невалідний токен',
      });
    }
  }, [location.search]);

  const onFinish = async (values: { newPassword: string; confirmPassword: string }) => {
    setLoading(true);
    try {
      await resetPassword(token!, values.newPassword, values.confirmPassword)
      window.location.href = FRONTEND_ROUTES.SIGNIN;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="change_password"
      onFinish={onFinish}
      layout="vertical"
      requiredMark={false}
      style={{ maxWidth: '500px', margin: '0 auto', padding: '50px' }}
    >
      <Item
        name="newPassword"
        label="Новий пароль"
        rules={[{ required: true, message: 'Введіть новий пароль!' }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Новий пароль"
        />
      </Item>
      <Item
        name="confirmPassword"
        label="Пароль для підтвердження"
        dependencies={['newPassword']}
        rules={[{ required: true, message: 'Введіть пароль для підтвердження!' },
        ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Паролі не збігаються!'));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Пароль для підтвердження"
        />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Змінити пароль
        </Button>
      </Item>
    </Form>
  );
};

export default ChangePasswordForm;
