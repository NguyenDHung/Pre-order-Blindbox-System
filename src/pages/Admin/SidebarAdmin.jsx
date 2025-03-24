import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
    DashboardOutlined,
    UserOutlined,
    HistoryOutlined,
    ShoppingCartOutlined,
    TagOutlined,
    LogoutOutlined,
    PictureOutlined,
    CheckSquareOutlined,
    MoneyCollectOutlined
} from "@ant-design/icons";
import AdminIcon from "../../assets/Admin/AdminIcon.png"
import useLogout from "../../hooks/useLogout";
import { ApiGetUserInFormation } from "../../api/User/ApiGetUserInformation";

const { Sider } = Layout;

const SideBarAdmin = () => {
    const [currentInformation, setCurrentInformation] = useState({});
    const location = useLocation();
    const logout = useLogout()
    const navigate = useNavigate();
    const menuItems = [
        { key: "/admin/dashboard", label: "Thống kê", icon: <DashboardOutlined /> },
        { key: "/admin/staffmanagement", label: "Quản lý nhân viên", icon: <UserOutlined /> },
        { key: "/admin/history-transactions/all", label: "Lịch sử giao dịch", icon: <HistoryOutlined /> },
        { key: "/admin/preordercampaign", label: "Quản lý các chiến dịch", icon: <ShoppingCartOutlined /> },
        { key: "/admin/voucher", label: "Mã giảm giá", icon: <TagOutlined /> },
        { key: "/admin/banner-management", label: "Quản lý Banner", icon: <PictureOutlined /> },
        { key: "/admin/preordercampaignApproval", label: "Xét duyệt chiến dịch", icon: <CheckSquareOutlined /> },
        { key: "/admin/withdraw-request", label: "Các yêu cầu rút tiền", icon: <MoneyCollectOutlined /> }
    ];
    const getCurrentInformation = async ()=>{
        const getUserInformation = await ApiGetUserInFormation();
        setCurrentInformation(getUserInformation);
    }
    useEffect(()=>{
        getCurrentInformation();
    },[])
    return (
        <Sider width={220} className="h-full shadow-lg bg-white">
            <div className="flex items-center justify-center py-6 text-xl font-bold">
                Admin
            </div>
            <Menu
        mode="vertical"
        selectedKeys={[location.pathname]}
        items={menuItems} 
        onClick={({ key }) => navigate(key)}
        className="border-none"
      />

            {/* Profile & Logout */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <div className="flex items-center">
                    <img
                       src={currentInformation.thumbnail!=null?currentInformation.thumbnail:AdminIcon}
                       alt="Profile picture of Emily Jonson"
                       className="rounded-full"
                       width="40"
                       height="40"
                   />
                   <div className="ml-2">
                       <div className="text-sm font-semibold">{currentInformation.fullName}</div>
                       <div className="text-xs text-gray-500">{currentInformation.email}</div>
                   </div>                    
                </div>
                <button
                    onClick={() => logout()}
                    className="p-2 text-gray-500 hover:text-red-500 transition"
                    title="Logout"
                >
                    <LogoutOutlined className="text-lg" />
                </button>
            </div>
        </Sider>
    );
};

export default SideBarAdmin;
