import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, message, Space, Spin, Dropdown, Menu } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, SearchOutlined, PlusOutlined, FilterOutlined } from '@ant-design/icons';
import { GetAllStaff, DeleteStaff } from "../../../api/StaffManagement/ApiStaffManager";
import StaffManagementCreate from "./StaffManagementCreate";
import StaffManagementEdit from "./StaffManagementEdit";
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const StaffManagement = () => {
    const navigate = useNavigate();
    const [staffData, setStaffData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [search, setSearch] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState(null);

    const fetchStaffData = async () => {
        setLoading(true);
        try {
            const response = await GetAllStaff();
            setStaffData(response);
            console.log(response);
        } catch (error) {
            console.error("Error fetching staff data:", error);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchStaffData();
    }, []);

    const handleAddStaff = () => setIsModalVisibleCreate(true);
    const handleCancel = () => setIsModalVisible(false);
    const handleEditStaff = (record) => {
        setSelectedUser(record);
        setIsModalVisible(true);
    };
    const handleViewStaff = (record) => navigate(`/admin/staffmanagement-details/${record.userId}`);
    const handleDeleteStaff = (record) => {
        setUserToDelete(record);
        setIsDeleteModalVisible(true);
    };
    const confirmDeleteUser = async () => {
        setIsDeleteModalVisible(false);

        setUserToDelete(null);
        if (!userToDelete.userId) {
            notification.error({
                message: "Error",
                description: "User ID is missing!",
            });
            return;
        }
        try {
            const response = await DeleteStaff(userToDelete.userId);
            message.success(`User "${userToDelete.fullName}" has been deleted.`);
            // setTimeout(() => {
            //     window.location.reload();
            // }, 1000);
            fetchStaffData();

        } catch (error) {
            message.error("Failed to delete staff!");
            console.error("Lỗi khi xóa staff:", error);
        }
    };
    const columns = [
        { title: <span style={{ fontSize: "18px" }}>{"Họ và Tên"}</span>, dataIndex: "fullName", key: "fullName", align: "center" },
        { title: <span style={{ fontSize: "18px" }}>{"Email"}</span>, dataIndex: "email", key: "email", align: "center" },
        { title: <span style={{ fontSize: "18px" }}>{"Địa chỉ"}</span>, dataIndex: "address", key: "address", align: "center" },
        {
            title: <span style={{ fontSize: "18px" }}>{"Chức Năng"}</span>,
            key: "action",
            align: "center",
            render: (_, record) => (
                <Space size="middle">
                    <EyeOutlined className="text-blue-500 text-xl cursor-pointer transition-all hover:scale-110" onClick={() => handleViewStaff(record)} />
                    <EditOutlined className="text-orange-500 text-xl cursor-pointer transition-all hover:scale-110" onClick={() => handleEditStaff(record)} />
                    <DeleteOutlined className="text-red-500 text-xl cursor-pointer transition-all hover:scale-110" onClick={() => handleDeleteStaff(record)} />
                </Space>
            ),
        },

    ];
    const handleSort = (order) => {
        setSortOrder(order);
        setStaffData((prevData) =>
            [...prevData].sort((a, b) => {
                const lastNameA = a.fullName?.trim().split(" ").pop().toLowerCase();
                const lastNameB = b.fullName?.trim().split(" ").pop().toLowerCase();
                return order === 'asc' ? lastNameA.localeCompare(lastNameB) : lastNameB.localeCompare(lastNameA);
            })
        );
    };


    const menu = (
        <Menu>
            <Menu.Item onClick={() => handleSort('asc')}>Sort A → Z</Menu.Item>
            <Menu.Item onClick={() => handleSort('desc')}>Sort Z → A</Menu.Item>
        </Menu>
    );

    const filteredData = staffData.filter((item) =>
        item.fullName?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-5 bg-white rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <Search
                        placeholder="Tìm kiếm nhân viên theo tên..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        style={{ width: 300 }}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <Button icon={<FilterOutlined />} />
                    </Dropdown>
                </div>
                <Button className="bg-blue-500 text-white px-4 py-2 rounded" icon={<PlusOutlined />} onClick={handleAddStaff}>
                    Tạo mới nhân viên
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center">
                    <Spin size="large" />
                </div>
            ) : (
                <Table
                    bordered
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{ pageSize: 5 }}
                    rowKey="id"
                    className="border rounded-md mt-5"
                />
            )}

            <Modal open={isModalVisibleCreate} onCancel={() => setIsModalVisibleCreate(false)} footer={null} width={720} closable={false} maskClosable={false}>
                <StaffManagementCreate onSuccess={() => setIsModalVisibleCreate(false)} />
            </Modal>

            <Modal open={isModalVisible} onCancel={handleCancel} footer={null} width={720} closable={false} maskClosable={false}>
                <StaffManagementEdit onSuccess={() => setIsModalVisible(false)}
                    userId={selectedUser?.userId}
                />
            </Modal>

            <Modal
                title="Xóa Nnân viên"
                open={isDeleteModalVisible}
                onCancel={() => setIsDeleteModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>Cancel</Button>,
                    <Button key="delete" type="primary" danger onClick={confirmDeleteUser}>Delete</Button>
                ]}
                closable={false}
            >
                <p>Bạn có muốn xóa nhân viên "{userToDelete?.fullName}"?</p>
            </Modal>
        </div>
    );
};

export default StaffManagement;
