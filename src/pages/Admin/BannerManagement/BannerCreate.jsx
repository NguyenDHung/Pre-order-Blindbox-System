import React, { useState } from "react";
import { Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { CreateBanner } from "../../../api/Banner/ApiBanner";
import { toast } from "react-toastify";
const BannerCreate = ({ onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const handleBannerImageChange = ({ file }) => {
        setBannerImage(file);
    };

    const handleSubmit = async (values) => {
        // setLoading(true);
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("callToActionUrl", values.callToActionUrl);
        formData.append("priority", parseInt(values.priority, 10));
        formData.append("file", bannerImage); // Gửi file gốc

        try {
            const result = await CreateBanner({ formData }); // Gửi formData trực tiếp
            console.log("Form data:", formData);
            console.log("File binary:", file);
            console.log("Create banner result:", result);
            if (result) {
                toast.success("Banner created successfully!");
            }
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.error("Upload error:", error);
            message.error("Create banner failed");
        }
    };



    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <div className="flex items-center mb-6">
                <h1 className="text-3xl font-bold">Tạo Banner</h1>
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
                {bannerImage && (
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
                    onClick={onSuccess}
                >
                    Tạo
                </Button>
            </div>
        </Form>
    );
};

export default BannerCreate;
