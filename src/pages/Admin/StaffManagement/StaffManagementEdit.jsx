import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, message, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { GetActiveStaff, EditStaff } from "../../../api/StaffManagement/ApiStaffManager";
import noThumbnailImage from "../../../assets/noThumbnailImage.jpg";
const StaffManagementEdit = ({ userId, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [imagePreviewStaff, setImagePreviewStaff] = useState({});
    const [staffImage, setStaffImage] = useState(null);
    const handleStaffImageChange = ({ file }) => {
        setStaffImage(file);
    };
    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const staffData = await GetActiveStaff(userId);

                form.setFieldsValue({
                    fullName: staffData.fullName,
                    address: staffData.address,
                    phone: staffData.phone || "",
                    thumbnail: staffData.thumbnail || ""
                });
                setImagePreviewStaff(staffData);

                console.log("check data", staffData);
            } catch (error) {
                message.error("Failed to fetch staff details!");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchStaff();
        }
    }, [userId, form]);

    const onFinish = async (values) => {
        if (!staffImage) {
            message.error("Vui lòng chọn lại ảnh hoặc chọn ảnh khác!");
            return;
        }
        const formData = new FormData();
        formData.append("fullName", values.fullName);
        formData.append("phone", values.phone);
        formData.append("thumbnail", staffImage);
        formData.append("address", values.address);


        try {
            const result = await EditStaff({ formData, userId });
            if (result) {
                message.success("Staff updated successfully!");
                onSuccess();
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }

        } catch (error) {
            message.error("Update failed!");
        }
    };



    return (
        <Card className="max-w-lg mx-auto p-6 shadow-lg rounded-xl bg-white">
            <h2 className="text-2xl font-semibold text-center mb-6">Chỉnh sửa nhân viên</h2>
            <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-4">
                <Form.Item label="Họ và tên" name="fullName" rules={
                    [{ required: true, message: "Vui lòng nhập họ và tên!" },
                    {
                        pattern: /^[\p{L}\s]+$/u,
                        message: "Họ và Tên chỉ được chứa chữ cái!"
                    }

                    ]}>
                    <Input size="large" className="w-full border-gray-300 rounded-lg" />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                        {
                            validator: (_, value) => {
                                if (!value) {
                                    return Promise.reject("Vui lòng nhập số điện thoại!");
                                }
                                if (!/^[0-9]+$/.test(value)) {
                                    return Promise.reject("Số điện thoại chỉ được chứa số!");
                                }
                                if (!/^0/.test(value)) {
                                    return Promise.reject("Số điện thoại phải bắt đầu bằng số 0!");
                                }
                                if (value.length > 10) {
                                    return Promise.reject("Số điện thoại chỉ được chứa tối đa 10 số!");
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <Input size="large" className="w-full border-gray-300 rounded-lg" />
                </Form.Item>


                <Form.Item label="Địa chỉ" name="address" rules={
                    [{ required: true, message: "Vui lòng nhập địa chỉ!" },
                    {
                        pattern: /^[\p{L}\d\s/,.-]+$/u,
                        message: "Địa chỉ chỉ được chứa chữ cái, số, khoảng trắng và các ký tự (/ , . -)!"
                    }

                    ]}>
                    <Input size="large" className="w-full border-gray-300 rounded-lg" />
                </Form.Item>

                <Form.Item label="Hình đại diện">
                    <Upload
                        beforeUpload={() => false}
                        onChange={handleStaffImageChange}
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                    {imagePreviewStaff == null ? (
                        <div className="mt-2">
                            <img
                                src={noThumbnailImage}
                                alt="Main"
                                className="w-full h-[300px] object-contain mt-2 rounded-md"
                            />
                        </div>
                    )
                        : imagePreviewStaff != null &&
                            staffImage == null ? (
                            <div className="mt-2">
                                <img
                                    src={imagePreviewStaff.thumbnail}
                                    alt="Main"
                                    className="w-full h-[300px] object-contain mt-2 rounded-md"
                                />
                            </div>
                        ) : (
                            <div className="mt-2">
                                <img
                                    src={URL.createObjectURL(staffImage)}
                                    alt="Main"
                                    className="w-full h-[300px] object-contain mt-2 rounded-md"
                                />
                            </div>
                        )}
                </Form.Item>

                <div className="flex justify-center gap-4 mt-4">
                    <Button size="large" onClick={onSuccess} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg">Hủy</Button>
                    <Button type="primary" htmlType="submit" size="large" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Lưu</Button>
                </div>
            </Form>
        </Card>
    );
};

export default StaffManagementEdit;
