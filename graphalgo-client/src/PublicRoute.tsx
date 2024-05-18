import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getUser } from "./app/api/userService";
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
                console.error('Користувач не увійшов в систему');
            }
        })();
    }, []);

    return (
        <Layout>
            <Navbar user={user?.email!} />
            <Content>
                {!user && <FloatButtonUser />}
                <Outlet />
            </Content>
            <Footer />
        </Layout>
    );
}

export default PublicRoute;