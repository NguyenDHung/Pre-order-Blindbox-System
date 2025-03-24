import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Upload, message } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { UpdateProfile, GetUserInformation } from "../../api/Profile/ApiProfile";
import { toast } from "react-toastify";


const Profile = () => {
    const [form] = Form.useForm();
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleProfileImageChange = ({ file }) => {
        setProfileImage(file); // Lưu file để gửi lên API
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Lấy accessToken từ cookie
                const authData = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('auth='))
                    ?.split('=')[1];

                if (!authData) {
                    console.error("Không tìm thấy accessToken!");
                    return;
                }

                const { accessToken } = JSON.parse(authData);

                // Gọi API GetUserInformation
                const data = await GetUserInformation(accessToken);

                if (data.fullName) {
                    form.setFieldsValue({
                        fullName: data.fullName,
                        phone: data.phone,
                        address: data.address,
                        bankName: data.bankName,
                        bankAccountNumber: data.bankAccountNumber,
                    });
                    setImagePreview(data.thumbnail);
                }

                console.log("check data", data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu hồ sơ:", error);
            }
        };

        fetchProfile();
    }, [form]);




    const onFinish = async (values) => {
        if (!profileImage) {
            message.error("Vui lòng chọn lại ảnh hoặc chọn ảnh khác!");
            return;
        }
        const formData = new FormData();
        formData.append("fullName", values.fullName);
        formData.append("phone", values.phone);
        formData.append("thumbnail", profileImage);
        formData.append("address", values.address);
        formData.append("bankName", values.bankName);
        formData.append("bankAccountNumber", values.bankAccountNumber);
        try {
            const result = await UpdateProfile({ formData });
            if (result) {
                toast.success("Cập nhật thông tin cá nhân thành công!");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }

        } catch (error) {
            message.error("Cập nhật thất bại!");
        }
    };

    return (


        <div className="max-w-3xl mx-auto mb-4 mt-4">
            <Card className="p-4 rounded-xl shadow-lg bg-white">
                <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Thông tin cá nhân</h1>
                <Form form={form} layout="vertical" onFinish={onFinish}>

                    {/* Avatar Upload */}
                    <Form.Item>
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
                                {profileImage ? (

                                    <img
                                        src={URL.createObjectURL(profileImage)}
                                        alt="Main"
                                        className="w-full h-full object-cover"
                                    />
                                ) : imagePreview ? (
                                    <img src={imagePreview} alt="Current Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <UserOutlined className="text-gray-400 text-6xl flex items-center justify-center w-full h-full" />
                                )}
                                <Upload
                                    showUploadList={false}
                                    onChange={handleProfileImageChange}
                                    beforeUpload={() => false}
                                >
                                    <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-center py-2 cursor-pointer text-white text-sm hover:bg-opacity-70 transition-all">
                                        <UploadOutlined /> Chọn ảnh
                                    </div>
                                </Upload>
                            </div>
                        </div>
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item label="Họ và Tên*" name="fullName"
                            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" },
                            {
                                pattern: /^[\p{L}\s]+$/u,
                                message: "Họ và Tên chỉ được chứa chữ cái!"
                            }]}>
                            <Input size="large" className="rounded-lg border-gray-300" />
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
                                        if (value.length < 10) {
                                            return Promise.reject("Số điện thoại phải có ít nhất 10 số!");
                                        }
                                        if (value.length > 10) {
                                            return Promise.reject("Số điện thoại chỉ được chứa tối đa 10 số!");
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Input size="large" className="rounded-lg border-gray-300" />
                        </Form.Item>

                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item label="Ngân hàng" name="bankName" rules={[{ required: true, message: "Vui lòng nhập tên ngân hàng!" },
                        {
                            pattern: /^[a-zA-Z]+$/,
                            message: "Tên Ngân Hàng chỉ được chứa chữ cái!"
                        }
                        ]}>
                            <Input size="large" className="rounded-lg border-gray-300" />
                        </Form.Item>

                        <Form.Item
                            label="Số tài khoản"
                            name="bankAccountNumber"

                            rules={[
                                {
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.reject("Vui lòng nhập số tài khoản!");
                                        }
                                        if (!/^[0-9]+$/.test(value)) {
                                            return Promise.reject("Số điện thoại chỉ được chứa số!");
                                        }
                                        if (value.length > 10) {
                                            return Promise.reject("Số tài khoản chỉ được chứa tối đa 10 số!");
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Input size="large" className="rounded-lg border-gray-300" />
                        </Form.Item>
                    </div>

                    <Form.Item label="Địa chỉ" name="address"
                        rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" },
                        {
                            pattern: /^[\p{L}\d\s/,.-]+$/u,
                            message: "Địa chỉ chỉ được chứa chữ cái, số, khoảng trắng và các ký tự (/ , . -)!"
                        }
                        ]
                        }>
                        <Input size="large" className="rounded-lg border-gray-300" />
                    </Form.Item>
                    {/* Buttons */}
                    <div className="flex justify-center gap-4 mt-4">
                        <Button type="primary" htmlType="submit" size="large" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                            Lưu thay đổi
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>

    );
};

export default Profile;