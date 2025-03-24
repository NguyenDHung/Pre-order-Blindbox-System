
import { useEffect } from "react";
import SideBarStaff from "./SideBarStaff";
import { Outlet, useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

const OrderManagement = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname !== "/" && location.pathname.endsWith("/")) {
            const newPath = location.pathname.slice(0, -1);
            navigate(newPath, { replace: true });
        }
    }, [location, navigate]);
    return (
        <div className="h-screen flex flex-col">
            <div className="flex flex-1 gap-4 px-4">
                <div className="h-full">
                    <SideBarStaff />
                </div>

                {/* Nội dung chính (NavBarStaff) */}
                <div className="flex-1 flex flex-col h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};


export default OrderManagement;