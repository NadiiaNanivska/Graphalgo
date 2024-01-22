import { LoginOutlined, PlusOutlined, ProfileOutlined } from '@ant-design/icons';
import { FloatButton } from "antd";

import './Navbar.css';
import { FRONTEND_ROUTES } from '../../api/utils/constants/Constants';
import { Link } from 'react-router-dom';

const FloatButtonUser = () => {
    return (
        <FloatButton.Group
            className='floating-button'
            trigger="click"
            type="primary"
            style={{ right: 24 }}
            icon={<PlusOutlined />}
        >
            <Link to={FRONTEND_ROUTES.LOGIN}><FloatButton icon={<LoginOutlined />} /></Link>
            <Link to={FRONTEND_ROUTES.REGISTER}><FloatButton icon={<ProfileOutlined />} /></Link>
        </FloatButton.Group>
    );
}

export default FloatButtonUser;