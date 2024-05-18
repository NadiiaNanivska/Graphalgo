import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";

const SendGraphModal = (_props: { visible: boolean, onClose: any, onSend: any }) => {
    const [username, setUsername] = useState('');

    const handleSend = () => {
        _props.onSend(username);
        _props.onClose();
    }

    return (
        <Modal
            title="Введіть ім'я користувача"
            visible={_props.visible}
            onCancel={_props.onClose}
            footer={[
                <Button key="cancel" onClick={_props.onClose}>
                    Скасувати
                </Button>,
                <Button key="send" type="primary" onClick={handleSend}>
                    Надіслати
                </Button>,
            ]}
        >
            <Form>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Введіть ім\'я користувача!',
                        },
                        { type: 'email', message: 'Введіть валідну електронну пошту' }
                    ]}
                >
                    <Input
                        type="email"
                        placeholder="Ім'я користувача"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SendGraphModal;