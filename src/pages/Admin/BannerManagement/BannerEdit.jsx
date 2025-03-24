import React, { useState, useEffect } from "react";
import { Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { EditBanner, GetActiveBanner } from "../../../api/Banner/ApiBanner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import noThumbnailImage from "../../../assets/noThumbnailImage.jpg";
const BannerEdit = ({ bannerId, onSuccess }) => {
    const [form] = Form.useForm();
    const [imagePreview, setImagePreview] = useState({});
    const navigate = useNavigate();
    const [bannerImage, setBannerImage] = useState(null);
    const handleBannerImageChange = ({ file }) => {
        setBannerImage(file);
    };

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const data = await GetActiveBanner(bannerId);
                form.setFieldsValue({
                    title: data.title,
                    imageUrl: data.imageUrl,
                    callToActionUrl: data.callToActionUrl,
                    priority: data.priority,

                });
                setImagePreview(data); // Cập nhật ảnh preview
                console.log("check data", data);
            } catch (error) {
                console.error("Error when fetching data", error);
            }
        };

        fetchBanner();
    }, [bannerId, form]);




    const handleSubmit = async (values) => {
        try {
            if (!bannerImage) {
                message.error("Vui lòng chọn lại ảnh hoặc chọn ảnh khác!");
                return;
            }

            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("callToActionUrl", values.callToActionUrl);
            formData.append("priority", parseInt(values.priority, 10));
            formData.append("file", bannerImage);

            console.log(">>> check formData: ", formData);
            var result = await EditBanner({ formData, bannerId });
            console.log(">>> check result: ", result);

            if (result) {
                toast.success("Banner edited successfully!");
                onSuccess();
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            navigate("/admin/banner-management");
        } catch (error) {
            message.error("Chỉnh sửa banner thất bại!");
        }
    };


    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <div className="flex items-center mb-6 cursor-pointer" onClick={() => navigate("/admin/banner-management")}>
                <ArrowLeftOutlined className="text-2xl mr-4" />
                <h1 className="text-3xl font-bold">Chỉnh sửa Banner</h1>
            </div>
            <Form.Item name="title" label="Tiêu đề" rules={
                [{ required: true, message: "Vui lòng nhập tiêu đề banner!" },
                {
                    pattern: /^[\p{L}\d\s-]+$/u,
                    message: "Tiêu đề banner chỉ được chứa chữ cái, số, khoảng trắng và các ký tự (-)!"
                }

                ]
            }>
                <Input placeholder="Nhập tiêu đề banner" />
            </Form.Item>
            <Form.Item
                name="callToActionUrl"
                label="Action URL"
                rules={[
                    { required: true, message: "Vui lòng nhập Action URL" },
                    {
                        pattern: /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/,
                        message: "Vui lòng nhập một Action URL!"
                    }
                ]}
            >
                <Input placeholder="Nhập Action URL" />
            </Form.Item>
            <Form.Item name="priority" label="Độ ưu tiên" rules={[{ required: true, message: "Vui lòng nhập độ ưu tiên" }]}>
                <Input type="number" min={1} placeholder="Nhập độ ưu tiên" />
            </Form.Item>
            <Form.Item label="File">
                <Upload
                    beforeUpload={() => false}
                    onChange={handleBannerImageChange}
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>
                {imagePreview == null ? (
                    <div className="mt-2">
                        <img
                            src={noThumbnailImage}
                            alt="Main"
                            className="w-full h-[300px] object-contain mt-2 rounded-md"
                        />
                    </div>
                )
                    : imagePreview != null &&
                        bannerImage == null ? (
                        <div className="mt-2">
                            <img
                                src={imagePreview.imageUrl}
                                alt="Main"
                                className="w-full h-[300px] object-contain mt-2 rounded-md"
                            />
                        </div>
                    ) : (
                        <div className="mt-2">
                            <img
                                src={URL.createObjectURL(bannerImage)}
                                alt="Main"
                                className="w-full h-[300px] object-contain mt-2 rounded-md"
                            />
                        </div>
                    )}
            </Form.Item>

            <div className="flex justify-between gap-4">
                <Button
                    size="large"
                    className="w-1/2 rounded-lg h-12 bg-gray-200 hover:bg-gray-300 text-gray-800"
                    onClick={onSuccess}
                >
                    Hủy
                </Button>
                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="w-1/2 rounded-lg h-12 bg-blue-600 hover:bg-blue-700 text-white"
                >
                    Lưu
                </Button>
            </div>
        </Form>
    );
};

export default BannerEdit;