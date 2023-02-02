import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/sidebar/Sidebar";
import Content from "../components/layout/Content";

// Layout of each page
function Layout() {
    return (
        <>
            <Navbar />
            <Sidebar />
            <Content  body = {<Outlet />} />
        </>
    )
};

export default Layout;