import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { sendEmail } from '../../app/api/userService';

const { Item } = Form;

const RequestPasswordReset = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
      await sendEmail(values.email);
      notification.success({
        message: 'Success',
        description: 'Посилання для зміни паролю надіслано на пошту.',
      });
      setLoading(false);
  };

  return (
    <Form
      name="request_password_reset"
      onFinish={onFinish}
      layout="vertical"
      requiredMark={false}
      style={{ maxWidth: '400px', margin: '0 auto', padding: '50px' }}
    >
      <h2>Запит для зміни паролю</h2>
      <Item
        name="email"
        label="Електронна пошта"
        rules={[{ required: true, type: 'email', message: 'Введіть валідну електронну пошту!' }]}
      >
        <Input placeholder="Електронна пошта" />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Надіслати посилання
        </Button>
      </Item>
    </Form>
  );
};

export default RequestPasswordReset;
