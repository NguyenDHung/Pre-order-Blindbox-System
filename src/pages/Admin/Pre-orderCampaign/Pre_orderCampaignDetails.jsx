import { React, useState, useEffect } from "react";
import { GetActivePreorderCampaignBySlug, GetActivePreorderCampaignById } from "../../../api/Pre_orderCampaign/ApiPre_orderCampaign";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeftOutlined,
  } from "@ant-design/icons";
const Pre_orderCampaignDetails = () => {
    const { slug } = useParams();
    const [detailPre_orderCampaign, setDetailPre_orderCampaign] = useState({});
    const [detailPre_orderCampaign_Id, setDetailPre_orderCampaign_Id] = useState({});

    useEffect(() => {
        const fetchCampaign_BySlug = async () => {
            try {
                const data = await GetActivePreorderCampaignBySlug(slug);
                setDetailPre_orderCampaign(data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchCampaign_BySlug();
    }, [slug]); // Chạy khi `slug` thay đổi

    useEffect(() => {
        if (detailPre_orderCampaign.preorderCampaignId) {
            const fetchCampaign_ById = async () => {
                try {
                    const data = await GetActivePreorderCampaignById(detailPre_orderCampaign.preorderCampaignId);
                    setDetailPre_orderCampaign_Id(data);
                } catch (error) {
                    console.error("Lỗi khi lấy dữ liệu:", error);
                }
            };

            fetchCampaign_ById();
        }
    }, [detailPre_orderCampaign.preorderCampaignId]); // Chỉ chạy khi `preorderCampaignId` có giá trị

    const mainImageUrl = detailPre_orderCampaign_Id?.blindBox?.images?.mainImage?.url;

    return (
        <div className="container mx-auto p-6 flex justify-center">
            
            <div className="w-full max-w-2xl bg-white border rounded-lg shadow-lg overflow-hidden p-8">
                {/* Hình ảnh lớn hơn */}
                <Link to="/admin/preordercampaign">
                    <ArrowLeftOutlined
                      style={{
                        width: "fit-content",
                        height: "fit-content",
                      }}
                      title="Về lại trang sản phẩm"
                    />
                  </Link>
                {mainImageUrl ? (
                    <img
                        src={mainImageUrl}
                        alt="Blind box"
                        className="w-full h-80 object-contain rounded-lg"
                    />
                ) : (
                    <div className="w-full h-80 flex items-center justify-center bg-gray-100 text-gray-500 text-xl font-semibold rounded-lg">
                        Không có hình ảnh
                    </div>
                )}

                {/* Nội dung */}
                <div className="mt-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        {detailPre_orderCampaign_Id?.blindBox?.name || "No name available"}
                    </h2>
                    <p className="text-lg text-gray-600 mt-3">
                        {detailPre_orderCampaign_Id?.blindBox?.description || "No description available"}
                    </p>

                    {/* Ngày & Trạng thái */}
                    <div className="mt-6 flex flex-wrap gap-3 text-lg">
                        <span className="bg-blue-100 text-blue-600 px-5 py-2 rounded-md">
                            Ngày bắt đầu: {detailPre_orderCampaign.startDate ? new Date(detailPre_orderCampaign.startDate).toLocaleDateString() : "N/A"}
                        </span>
                        <span className="bg-red-100 text-red-600 px-5 py-2 rounded-md">
                            Ngày kết thúc: {detailPre_orderCampaign.endDate ? new Date(detailPre_orderCampaign.endDate).toLocaleDateString() : "N/A"}
                        </span>
                        <span
                            className={`px-5 py-2 rounded-md ${detailPre_orderCampaign.status === "Pending"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-green-100 text-green-600"
                                }`}
                        >
                            {detailPre_orderCampaign.status || "No status"}
                        </span>
                        <span className="bg-gray-100 text-gray-800 px-5 py-2 rounded-md">
                            {detailPre_orderCampaign.type || "No type"}
                        </span>
                    </div>

                    {/* Kích thước */}
                    <p className="mt-8 text-2xl font-semibold">
                        Kích thước: {detailPre_orderCampaign_Id?.blindBox?.size || "No size available"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Pre_orderCampaignDetails;
