import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getUser } from "./app/api/userService";
import { User } from "./app/dto/authDTOs";
import Footer from "./components/Footer/Footer";
import FloatButtonUser from "./components/NavBar/FloatButton";
import Navbar from "./components/NavBar/Navbar";
import { useUser } from "./contexts/GraphOptionsContext";

const PublicRoute = () => {
    const { user, setUser } = useUser();

    useEffect(() => {
        (async () => {
            try {
                const response = await getUser();
                setUser(response);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        })();
    }, []);

    return (
        <Layout>
            <Navbar user={user?.email!} />
            <Content>
                <FloatButtonUser />
                <Outlet />
            </Content>
            <Footer />
        </Layout>
    );
}

export default PublicRoute;