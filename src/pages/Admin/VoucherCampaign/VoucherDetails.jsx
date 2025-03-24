import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Card, Popconfirm, message } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    CalendarOutlined,
    ShoppingCartOutlined,
    PercentageOutlined,
    CheckCircleOutlined,
    UserOutlined,
    DollarCircleOutlined
} from "@ant-design/icons";
import { GetTheActiveVoucherCampaignByID, DeleteVoucher } from "../../../api/VoucherCampaign/ApiVoucherCampaign";
import { ArrowLeftOutlined } from "@ant-design/icons";
const VoucherDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [voucherDetail, setVoucherDetail] = useState({});

    useEffect(() => {
        const fetchVoucher = async () => {
            try {
                const data = await GetTheActiveVoucherCampaignByID(id);
                setVoucherDetail(data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu từ API:", error);
            }
        };
        fetchVoucher();
    }, [id]);

    const handleUpdateVoucher = () => {
        navigate(`/admin/voucher/update/${id}`);
    };

    const handleDeleteVoucher = async () => {
        try {
            await DeleteVoucher(id);
            message.success("Voucher deleted successfully!");
            navigate("/admin/voucher"); // Chuyển hướng về danh sách voucher
        } catch (error) {
            message.error("Failed to delete voucher!");
            console.error("Lỗi khi xóa voucher:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <Card className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <Link to="/admin/voucher" className="h-full flex">
                        <ArrowLeftOutlined className="text-xl ml-1" />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                        🎟️ Thông tin Voucher
                    </h1>
                    <div className="flex space-x-2">
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            size="large"
                            className="rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 transition-all"
                            onClick={handleUpdateVoucher}
                        >
                            Chỉnh sửa
                        </Button>
                        <Popconfirm
                            title="Are you sure to delete this voucher?"
                            onConfirm={handleDeleteVoucher}
                            okText="Yes"
                            cancelText="No"
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
                </div>

                {/* Nội dung */}
                <div className="space-y-4 text-lg text-gray-700">
                    <p><strong>📢 Tên:</strong> {voucherDetail.name}</p>
                    <p className="flex items-center">
                        <CalendarOutlined className="mr-2 text-blue-500" />
                        <strong>Ngày bắt đầu:</strong> {voucherDetail.startDate}
                    </p>
                    <p className="flex items-center">
                        <CalendarOutlined className="mr-2 text-red-500" />
                        <strong>Ngày kết thúc:</strong> {voucherDetail.endDate}
                    </p>
                    <p className="flex items-center">
                        <ShoppingCartOutlined className="mr-2 text-green-500" />
                        <strong>Số Lượng:</strong> {voucherDetail.quantity} (Đã nhận: {voucherDetail.takenQuantity})
                    </p>
                    <p className="flex items-center">
                        <UserOutlined className="mr-2 text-purple-500" />
                        <strong>Số lượng voucher tối đa cho mỗi người:</strong> {voucherDetail.maximumUserCanGet}
                    </p>
                    <p className="flex items-center">
                        <PercentageOutlined className="mr-2 text-orange-500" />
                        <strong>Ưu đãi:</strong> {voucherDetail.percentDiscount}%
                    </p>
                    <p className="flex items-center">
                        <CheckCircleOutlined className={`mr-2 ${voucherDetail.status === "Active" ? "text-green-500" : "text-red-500"}`} />
                        <strong>Trạng Thái:</strong> {voucherDetail.status}
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default VoucherDetails;
