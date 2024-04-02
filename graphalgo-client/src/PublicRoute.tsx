import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import FloatButtonUser from "./components/NavBar/FloatButton";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const PublicRoute = () => {
    const [user, setUser] = useState<string | null>("null");
    return (
    <Layout>
        <Navbar user={user}/>
        <Content>
            <FloatButtonUser />
            <Outlet />
        </Content>
        <Footer />
    </Layout>
    );
}

export default PublicRoute;