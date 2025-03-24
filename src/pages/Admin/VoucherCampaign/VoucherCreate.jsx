import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Row, Col, Slider, InputNumber, Card, message } from "antd";
import { CreateVoucher } from "../../../api/VoucherCampaign/ApiVoucherCampaign";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';
import {
    ArrowLeftOutlined,
} from "@ant-design/icons";
const { RangePicker } = DatePicker;

const VoucherCreate = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        setLoading(true); // Bật loading khi bắt đầu gửi request

        const payload = {
            name: values.name,
            startDate: values.dateRange[0].toISOString(),
            endDate: values.dateRange[1].toISOString(),
            quantity: values.quantity,
            maximumUserCanGet: values.maximumUserCanGet,
            percentDiscount: values.percentDiscount,
            maximumMoneyDiscount: values.maximumMoneyDiscount,
            setNumberExpirationDate: values.setNumberExpirationDate
        };

        try {
            const config = { headers: { 'Content-Type': 'application/json' } };

            const result = await CreateVoucher(payload, config);
            if (result) {
                toast.success('Voucher created successfully!');
                navigate('/admin/voucher');
                // setTimeout(() => {
                //     window.location.reload();
                // }, 1000);
            }

        } catch (error) {
            message.error("Tạo voucher thất bại: " + (error.response?.data?.message || error.message));
        }
    };


    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-10">
            <Card className="w-full max-w-7xl p-10 shadow-2xl rounded-2xl">
                <div className="flex items-center mb-6">
                    <Link to="/admin/voucher" className="h-full flex">
                        <ArrowLeftOutlined className="text-2xl mr-6" />
                    </Link>
                    <h1 className="text-3xl font-bold">Tạo mới voucher</h1>
                </div>
                <Form form={form} layout="vertical" onFinish={handleSubmit} className="space-y-6">
                    <Button type="primary"
                        htmlType="submit"
                        size="large"
                        className="rounded-xl px-8 py-3 text-xl">
                        Tạo
                    </Button>
                    <Row gutter={[32, 20]}>
                        <Col span={12}>
                            <Form.Item label="Tên" name="name" rules={[{ required: true, message: "Vui lòng nhập tên của Voucher!" },
                            {
                                pattern: /^[a-zA-Z\d]+$/,
                                message: "Tên Voucher chỉ được chứa chữ cái và số!"
                            }]
                            }>
                                <Input placeholder="Nhập tên của voucher" className="rounded-xl h-12 text-lg" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Mức giảm giá tối đa"
                                name="maximumMoneyDiscount"
                                rules={[{ required: true, message: "Vui lòng nhập mức giảm giá tối đa!" }]}
                            >
                                <InputNumber
                                    style={{ width: "100%", height: "48px" }}
                                    min={0}
                                    disabled={status === "Active"}
                                    placeholder="Nhập Mức giảm giá tối đa"
                                    formatter={(value) =>
                                        value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND" : "0 VND"
                                    }
                                    parser={(value) =>
                                        value.replace(/[^0-9]/g, "") // Loại bỏ mọi ký tự không phải số
                                    }
                                    className="rounded-xl text-lg"
                                />
                            </Form.Item>

                        </Col>
                    </Row>

                    <Row gutter={[32, 20]}>
                        <Col span={12}>
                            <Form.Item label="Số Lượng" name="quantity" rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}>
                                <Input type="number" placeholder="Nhập số lượng" min={1} className="rounded-xl h-12 text-lg" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Thời hạn hiệu lực" name="setNumberExpirationDate" rules={[{ required: true, message: "Vui lòng nhập  thời hạn hiệu lực!" }]}>
                                <Input type="number" placeholder="Nhập  thời hạn hiệu lực" min={1} className="rounded-xl h-12 text-lg" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[32, 20]}>
                        <Col span={24}>
                            <Form.Item label="Ngày bắt đầu và kết thúc" name="dateRange" rules={[{ required: true, message: "Vui lòng nhập  Ngày bắt đầu và kết thúc!" }]}>
                                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"
                                    placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                                    className="w-full rounded-xl h-12 text-lg" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[32, 20]}>
                        <Col span={12}>
                            <Form.Item label="Mức tối đa người dùng có thể nhận" name="maximumUserCanGet">
                                <Slider min={0} max={10} marks={{ 0: '0', 5: '5', 10: '10' }} tooltipVisible={{ always: true }} className="h-8" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Phần trăm giảm giá" name="percentDiscount">
                                <Slider min={0} max={100} marks={{ 0: '0%', 50: '50%', 100: '100%' }} tooltipVisible={{ always: true }} className="h-8" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default VoucherCreate;
