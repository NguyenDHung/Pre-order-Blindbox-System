import React, { useState, useEffect } from "react";
import { Button, Pagination } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { GetTheActiveVoucherCampaign } from "../../../api/VoucherCampaign/ApiVoucherCampaign";

const ProjectCard = ({ projectList }) => {
    const navigate = useNavigate();

    const handleCardClick = (voucherCampaignId) => {
        navigate(`/admin/voucher-details/${voucherCampaignId}`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {projectList.length > 0 ? (
                projectList.map((project) => (
                    <div
                        key={project.voucherCampaignId}
                        className="bg-white shadow-lg rounded-2xl p-6 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                        onClick={() => handleCardClick(project.voucherCampaignId)}
                    >
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{project.name}</h3>
                        <p className="text-gray-600 text-lg">💰 Ưu đãi: <span className="font-semibold">{project.percentDiscount}%</span></p>
                        <p className="text-gray-600 text-lg">📦 Số Lượng: <span className="font-semibold">{project.quantity}</span></p>
                        <p className="text-gray-600 text-lg">📌 Trạng Thái: <span className="font-semibold">{project.status}</span></p>
                        <p className="text-gray-600 text-lg">
                            💵Mức giảm giá tối đa: <span className="font-semibold">
                                {project.maximumMoneyDiscount.toLocaleString()} VNĐ
                            </span>
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 mt-4">No vouchers available.</p>
            )}
        </div>
    );
};

const Voucher = () => {
    const [projectList, setProjectList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const data = await GetTheActiveVoucherCampaign();
                if (Array.isArray(data)) {
                    console.log("Dữ liệu từ API:", data);
                    setProjectList(data);
                } else {
                    console.error("Dữ liệu API không hợp lệ:", data);
                    setProjectList([]);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu từ API:", error);
                setProjectList([]);
            }
        };

        fetchVouchers();
    }, [projectList]);

    const handleAddVoucher = () => {
        navigate("/admin/voucher/add");
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedProjects = Array.isArray(projectList)
        ? projectList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        : [];

    return (
        <div className="bg-gray-50 min-h-screen p-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">🎟️ Ưu đãi hấp dẫn</h1>
                        <p className="text-gray-600 text-lg mt-2">
                            Nhận ngay những ưu đãi cực sốc với các voucher mới nhất.Nhấp vào bất kỳ voucher nào để xem chi tiết!
                        </p>
                    </div>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        className="rounded-xl px-6 py-3 text-lg shadow-md bg-blue-500 hover:bg-blue-600 transition-all"
                        onClick={handleAddVoucher}
                    >
                        Thêm mới voucher
                    </Button>
                </div>

                {/* Card danh sách voucher */}
                <ProjectCard projectList={paginatedProjects} />

                {/* Phân trang */}
                {projectList.length > 0 && (
                    <div className="flex justify-center mt-10">
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={projectList.length}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                            className="text-lg"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Voucher;
