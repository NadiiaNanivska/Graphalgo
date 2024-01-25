import { LoginOutlined, PlusOutlined, ProfileOutlined } from '@ant-design/icons';
import { FloatButton } from "antd";

import { FRONTEND_ROUTES } from '../../api/utils/constants/Constants';
import './Navbar.css';

const FloatButtonUser = () => {
    return (
        <FloatButton.Group
            className='floating-button'
            trigger="click"
            type="primary"
            style={{ right: 24 }}
            icon={<PlusOutlined />}
        >
            <a href={FRONTEND_ROUTES.SIGNIN}><FloatButton icon={<LoginOutlined />} /></a>
            <a href={FRONTEND_ROUTES.SIGNUP}><FloatButton icon={<ProfileOutlined />} /></a>
        </FloatButton.Group>
    );
}

export default FloatButtonUser;