import React, { useState, useEffect, useCallback } from "react";
import { Card, Button, Dropdown, Menu, Pagination, Modal, Spin } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { GetAllBanner } from "../../../api/Banner/ApiBanner";
import BannerCreate from "./BannerCreate";
import useFetchDataPagination from "../../../hooks/useFetchDataPagination";
import { Link } from "react-router-dom";

const BannerView = () => {
    const [sortOrder, setSortOrder] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [pageSize, setPageSize] = useState(4);
    const [pageIndex, setPageIndex] = useState(1);

    // Fetch dữ liệu từ API
    const fetchBanner = useCallback(() => GetAllBanner(pageSize, pageIndex), [pageSize, pageIndex]);
    const { data, loading, refetch, pagination } = useFetchDataPagination(fetchBanner, [pageSize, pageIndex]);

    // Sắp xếp dữ liệu theo priority
    const sortedBanners = [...data].sort((a, b) => {
        if (sortOrder === "priority-asc") return a.priority - b.priority;
        if (sortOrder === "priority-desc") return b.priority - a.priority;
        return 0;
    });

    const filterMenu = (
        <Menu onClick={(e) => setSortOrder(e.key)}>
            <Menu.Item key="priority-asc">Độ ưu tiên (Thấp đến cao)</Menu.Item>
            <Menu.Item key="priority-desc">Độ ưu tiên (Cao đến thấp)</Menu.Item>
        </Menu>
    );

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <div className="p-6 bg-white shadow-md rounded-lg">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Banners</h2>
                            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsCreateModalOpen(true)}>
                                Tạo mới Banner
                            </Button>
                        </div>

                        {/* Filter */}
                        <div className="flex gap-4 items-center mb-4">
                            <Dropdown overlay={filterMenu} trigger={["click"]}>
                                <Button icon={<FilterOutlined />}>Lọc</Button>
                            </Dropdown>
                        </div>

                        {/* Cards Layout - Banners thon dài */}
                        <div className="grid grid-cols-2 gap-4">  {/* Chỉnh thành 2 cột */}
                            {sortedBanners.map((banner) => (
                                <Card
                                    key={banner.bannerId}
                                    hoverable
                                    className="rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
                                >
                                    <Link to={`/admin/banner-management-details/${banner.bannerId}`}>
                                        <img
                                            src={banner.imageUrl}
                                            alt={banner.title}
                                            className="w-full h-[200px] object-cover rounded-md"  // Giữ tỷ lệ thon dài
                                        />
                                    </Link>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex justify-center">
                            <Pagination
                                current={pagination.current}
                                total={pagination.total}
                                pageSize={pagination.pageSize}
                                onChange={(page) => setPageIndex(page)}
                                showSizeChanger={false}
                            />
                        </div>

                        {/* Modal for Creating Banner */}
                        <Modal
                            open={isCreateModalOpen}
                            onCancel={() => setIsCreateModalOpen(false)}
                            footer={null}
                            width={720}
                            closable={false}
                            maskClosable={false}
                        >
                            <BannerCreate onSuccess={() => setIsCreateModalOpen(false)} />
                        </Modal>
                    </div>
                </>
            )}
        </div>
    );
};

export default BannerView;
