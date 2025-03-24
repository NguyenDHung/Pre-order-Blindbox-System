import React, { useEffect, useState } from "react";
import { Modal, Button, message, Card, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import BannerEdit from "./BannerEdit";
import { GetActiveBanner, DeleteBlindBannerById } from "../../../api/Banner/ApiBanner";

const BannerViewDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
    const [detailBanner, setDetailBanner] = useState({});

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const data = await GetActiveBanner(id);
                setDetailBanner(data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchBanner();
    }, [id]);

    const handleDeleteBanner = async () => {
        try {
            await DeleteBlindBannerById(id);
            message.success("Banner deleted successfully!");
            navigate("/admin/banner-management");
        } catch (error) {
            message.error("Failed to delete Banner!");
        }
    };
    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <div className="flex items-center mb-6 cursor-pointer" onClick={() => navigate("/admin/banner-management")}>
                <ArrowLeftOutlined className="text-2xl mr-4" />
                <h1 className="text-3xl font-bold">Thông tin Banner</h1>
            </div>
            <div className="mt-4 flex justify-end gap-4 mb-6">
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    size="large"
                    className="rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 transition-all"
                    onClick={() => setIsModalVisibleEdit(true)}
                >
                    Chỉnh sửa
                </Button>
                <Popconfirm
                    title="Ban có chắc chắn muốn xóa banner này không?"
                    onConfirm={handleDeleteBanner}
                    okText="Có"
                    cancelText="Không"
                >
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        size="large"
                        className="rounded-lg shadow-md"
                    >
                        Xóa
                    </Button>
                </Popconfirm>
            </div>
            <Card className="p-6">
                {/* Title - Priority căn giữa */}
                <div className="flex justify-center items-center mb-4">
                    <h3 className="text-2xl font-semibold">
                        {detailBanner.title} - Độ ưu tiên: {detailBanner.priority}
                    </h3>
                </div>

                {/* Hình ảnh */}
                <img
                    src={detailBanner.imageUrl}
                    alt={detailBanner.title}
                    className="w-full h-full object-cover rounded-lg mb-4"
                />

                {/* Nút Edit & Delete to hơn, căn phải */}

            </Card>

            {/* Modal chỉnh sửa banner */}
            <Modal
                open={isModalVisibleEdit}
                onCancel={() => setIsModalVisibleEdit(false)}
                footer={null}
                width={720}
                closable={false}
                maskClosable={false}
            >
                <BannerEdit
                    bannerId={id}
                    onSuccess={() => setIsModalVisibleEdit(false)}
                />
            </Modal>
        </div>
    );
};

export default BannerViewDetails;
