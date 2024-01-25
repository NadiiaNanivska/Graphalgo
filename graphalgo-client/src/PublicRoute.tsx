import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import FloatButtonUser from "./components/NavBar/FloatButton";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

const PublicRoute = () => {
    return (
    <Layout>
        <Navbar />
        <Content>
            <FloatButtonUser />
            <Outlet />
        </Content>
        <Footer />
    </Layout>
    );
}

export default PublicRoute;