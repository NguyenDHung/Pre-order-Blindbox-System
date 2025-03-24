import React, { useState, useCallback } from "react";
import { Table, Space, Input, Button, Modal, Spin, Pagination, notification } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import {
    GetTheActivePreorderCampaign, GetActivePreorderCampaignBySlug,
    DeletePendingCampaign,
} from "../../../api/Pre_orderCampaign/ApiPre_orderCampaign";
import useFetchDataPagination from "../../../hooks/useFetchDataPagination";
import noThumbnailImage from "../../../assets/noThumbnailImage.jpg"
const { Search } = Input;

const Pre_orderCampaign = () => {

        const [search, setSearch] = useState("");
        const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
        const [warning, setWarning] = useState('');
        const [pageSize, setPageSize] = useState(5);
        const [pageIndex, setPageIndex] = useState(1);
        const navigate = useNavigate();
        const [detailPre_orderCampaign_bySlug, setDetailPre_orderCampaign_bySlug] = useState([]);
        const fetchPreorderCampaign = useCallback(
            () => GetTheActivePreorderCampaign(pageSize, pageIndex),
            [pageSize, pageIndex]
        );
        const { data, loading, refetch, pagination } = useFetchDataPagination(fetchPreorderCampaign, [
            pageSize,
            pageIndex,
        ]);
        const handleAddPre_orderCampaign = () => {
            navigate("/admin/preordercampaign/create");

        };

        const handleViewPre_orderCampaign = (record) => {
            navigate(`/admin/preordercampaign/details/${record.slug}`);
        };


        const handleDeletePre_orderCampaign = async (record) => {
            try {
                console.log("Fetching details for campaign:", record.slug);

                const campaignDetails = await GetActivePreorderCampaignBySlug(record.slug);
                if (campaignDetails) {
                    console.log("Received campaign details:", campaignDetails);
                    setDetailPre_orderCampaign_bySlug(campaignDetails);
                    setIsDeleteModalVisible(true);
                } else {
                    notification.error({
                        message: "Error",
                        description: "Failed to fetch campaign details.",
                    });
                }
            } catch (error) {
                console.error("Error fetching campaign details:", error);
                notification.error({
                    message: "Error",
                    description: "Could not fetch campaign details.",
                });
            }
        };

        const confirmDeletePre_orderCampaign = async () => {
            if (!detailPre_orderCampaign_bySlug?.preorderCampaignId) {
                notification.error({
                    message: "Error",
                    description: "Pre-order campaign ID is missing!",
                });
                return;
            }
            if(detailPre_orderCampaign_bySlug.status ==="Pending"){
                var response = await DeletePendingCampaign(detailPre_orderCampaign_bySlug.preorderCampaignId);
                if(response ==200){
                    setIsDeleteModalVisible(false);
                    refetch(); // Refresh data after deletion
                }
            }else{
                notification.error({
                    message: "Error",
                    description: "This campaign must be in pending status to delete",
                });
                return;
            }
            
        };



        const columns = [
            {
                title: <span style={{ fontSize: "18px" }}>{"STT"}</span>,
                key: "index",
                align: "center",
                render: (_, __, index) =>
                    <div className="text-center text-red-500 font-bold">
                        {(pagination.current - 1) * pagination.pageSize + index + 1}
                    </div>,
            },
            {
                title: <span style={{ fontSize: "18px" }}>{"Hình ảnh"}</span>,
                key: "mainImage",
                align: "center",
                render: (_, record) => (
                    <div className="flex justify-center items-center">
                        <img
                            src={record.blindBox?.images.mainImage?.url || noThumbnailImage}
                            alt="Main"
                            className="w-24 h-24 object-cover rounded-md shadow-md transition-all duration-300 hover:scale-105"
                        />
                    </div>
                ),
            },
            {
                title: <span style={{ fontSize: "18px" }}>{"Tên"}</span>,
                key: "name",
                align: "center",
                sorter: (a, b) => (a.blindBox?.name || "").localeCompare(b.blindBox?.name || ""),
                render: (_, record) => <div className="text-center font-semibold">{record.blindBox?.name || "N/A"}</div>,
            },
            {
                title: <span style={{ fontSize: "18px" }}>{"Loại chiến dịch"}</span>,
                key: "type",
                align: "center",
                render: (_, record) => <div className="text-center">{record.type || "Unknown"}</div>,
            },
            {
                title: <span style={{ fontSize: "18px" }}>{"Kích cỡ"}</span>,
                key: "size",
                align: "center",
                render: (_, record) => <div className="text-center">{record.blindBox?.size || "Unknown"}</div>,
            },
            {
                title: <span style={{ fontSize: "18px" }}>{"Ngày bắt đầu"}</span>,
                key: "startDate",
                align: "center",
                render: (_, record) =>
                    <div className="text-center">
                        {record.startDate
                            ? new Date(record.startDate).toLocaleDateString("vi-VN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })
                            : "N/A"}
                    </div>,
            },
            {
                title: <span style={{ fontSize: "18px" }}>{"Ngày kết thúc"}</span>,
                key: "endDate",
                align: "center",
                render: (_, record) =>
                    <div className="text-center">
                        {record.endDate
                            ? new Date(record.endDate).toLocaleDateString("vi-VN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })
                            : "N/A"}
                    </div>,
            },
            {
                title: <span style={{ fontSize: "18px" }}>{"Hành động"}</span>,
                key: "action",
                align: "center",
                render: (_, record) => (
                    <Space size="middle" className="justify-between">
                        <EyeOutlined className="text-blue-500 text-xl cursor-pointer transition-all hover:scale-110"
                            onClick={() => handleViewPre_orderCampaign(record)}
                        />
                        <Link to={`/admin/preordercampaign/edit/${record.slug}`}>
                        <EditOutlined className="text-orange-500 text-xl cursor-pointer transition-all hover:scale-110"/>
                        </Link>
                        <DeleteOutlined className="text-red-500 text-xl cursor-pointer transition-all hover:scale-110"
                            onClick={() => handleDeletePre_orderCampaign(record)}
                        />
                    </Space>
                ),
            },
        ];

        const filteredData = data.filter((item) =>
            item.blindBox?.name?.toLowerCase().includes(search.toLowerCase())
        );

        return (
            <div className="dashboard-container overflow-auto h-screen pr-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-opacity-80">
                <div className="w-full mx-auto mt-5 p-5 bg-white shadow-lg rounded-lg">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold mb-4">Quản lý các chiến dịch</h2>
                        <div>
                            <Button className="bg-blue-500 text-white px-4 py-2 rounded mt-8" icon={<PlusOutlined />} onClick={handleAddPre_orderCampaign}>
                               Tạo mới chiến dịch
                            </Button>
                        </div>
                    </div>

                    <Search placeholder="Search products..." allowClear enterButton={<SearchOutlined />} style={{ width: 300 }} onChange={(e) => setSearch(e.target.value)} />

                    {warning && <div className="w-full text-right text-red-500 mt-2">{warning}</div>}

                    {loading ? (
                        <div className="flex justify-center ">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <>
                            <Table
                                bordered={true}
                                columns={columns}
                                dataSource={filteredData}
                                pagination={false}
                                rowKey={(row) => row.preorderCampaignId}

                                className="border rounded-md mt-5"
                            />


                            <div className="flex justify-end mt-4">
                                <Pagination
                                    current={pagination.current}
                                    total={pagination.total}
                                    pageSize={pagination.pageSize}
                                    showSizeChanger
                                    showQuickJumper
                                    pageSizeOptions={["5", "10", "20"]}
                                    onChange={(page, pageSize) => {
                                        setPageIndex(page);
                                        setPageSize(pageSize);
                                    }}
                                    className="shadow-md p-2 rounded-md bg-gray-100 transition-all duration-300 hover:bg-gray-200"
                                />

                            </div>
                        </>
                    )}
                    <Modal
                        title="Delete product"
                        open={isDeleteModalVisible}
                    onCancel={() => setIsDeleteModalVisible(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
                            Từ chối
                        </Button>,
                        <Button key="delete" type="primary" danger onClick={confirmDeletePre_orderCampaign} disabled={detailPre_orderCampaign_bySlug.status!=="Pending"}>
                            Delete
                        </Button>,
                    ]}
                >
                    <p>Bạn có muốn xoá chiến dịch "{detailPre_orderCampaign_bySlug.blindBox?.name}"?</p>
                </Modal>
            </div>
        </div>
    );
};

export default Pre_orderCampaign;
