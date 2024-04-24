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
            title="Enter Username"
            visible={_props.visible}
            onCancel={_props.onClose}
            footer={[
                <Button key="cancel" onClick={_props.onClose}>
                    Cancel
                </Button>,
                <Button key="send" type="primary" onClick={handleSend}>
                    Send
                </Button>,
            ]}
        >
            <Form>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input username!',
                        },
                        { type: 'email', message: 'Please enter a valid email address' }
                    ]}
                >
                    <Input
                        type="email"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SendGraphModal;