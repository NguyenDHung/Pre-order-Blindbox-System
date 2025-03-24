import React, { useState, useEffect } from "react";
import { GetTransactionDetailVerifyUserPayment } from "../../api/Transaction/ApiTransaction";
import { useParams } from "react-router";
import { Card, Typography, Spin, Tag } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const DepositHistoryDetails = () => {
  const { id } = useParams();
  const [transactionDetail, setTransactionDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionDetail = async () => {
      try {
        const authData = document.cookie
          .split("; ")
          .find((row) => row.startsWith("auth="))
          ?.split("=")[1];

        if (!authData) {
          console.error("Không tìm thấy accessToken!");
          return;
        }

        const { accessToken } = JSON.parse(decodeURIComponent(authData));
        const data = await GetTransactionDetailVerifyUserPayment(accessToken, id);
        setTransactionDetail(data);
      } catch (error) {
        console.error("Failed to fetch transaction detail", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactionDetail();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><Spin size="large" /></div>;
  }

  if (!transactionDetail) {
    return <p className="text-center text-gray-500">Không có dữ liệu giao dịch.</p>;
  }

  // Màu sắc và icon theo trạng thái giao dịch
  const statusMapping = {
    Pending: { color: "bg-yellow-500", icon: <ClockCircleOutlined className="text-white text-xl" />, label: "Chờ xử lý" },
    Completed: { color: "bg-green-500", icon: <CheckCircleOutlined className="text-white text-xl" />, label: "Hoàn tất" },
    Failed: { color: "bg-red-500", icon: <CloseCircleOutlined className="text-white text-xl" />, label: "Thất bại" },
    Success: { color: "bg-blue-500", icon: <CheckCircleOutlined className="text-white text-xl" />, label: "Thành công" },
  };

  const status = statusMapping[transactionDetail.status] || { color: "bg-gray-500", icon: null, label: "Không xác định" };

  return (
    <div className="flex justify-center items-center mb-5 bg-gray-100 p-6">
      <Card className="w-[500px] rounded-2xl shadow-2xl bg-gradient-to-br from-blue-50 to-white p-8">
        <Title level={3} className="text-center mb-4 font-bold text-gray-900">
          Chi tiết giao dịch
        </Title>
        {
          transactionDetail.type === "Purchase" ? (<div className="mb-4">
            <Text strong className="text-lg block">Mô tả:</Text>
            <Text className="text-lg font-medium text-gray-700 break-words">
              {transactionDetail.description}
            </Text>
          </div>
          ) : (<div className="mb-4 flex items-center">
            <Text strong className="text-lg">Mô tả:</Text>
            <Text className="text-lg font-medium text-gray-700 ml-5">{transactionDetail.description}</Text>
          </div>
          )
        }

        <div className="mb-4 flex items-center">
          <Text strong className="text-lg">Loại:</Text>
          <Text className="text-lg font-medium text-gray-700 ml-10">{transactionDetail.type}</Text>
        </div>

        <div className="mb-4 flex items-center">
          <Text strong className="text-lg">Số tiền:</Text>
          {
            transactionDetail.type === "Withdraw" ? (
              <Text className="text-lg font-medium text-red-600 ml-5">
                {transactionDetail.money.toLocaleString()} VNĐ
              </Text>)
              : (
                <Text className="text-lg font-bold text-green-600 ml-5">
                  {transactionDetail.money.toLocaleString()} VNĐ
                </Text>
              )
          }
        </div>

        <div className="mb-4 flex  items-center">
          <Text strong className="text-lg">Ngày tạo:</Text>
          <Text className="text-lg font-medium text-gray-700 ml-2">
            {new Date(transactionDetail.createdDate).toLocaleString()}
          </Text>
        </div>

        <div className="mt-6 flex items-center justify-center space-x-2">
          <div className={`w-12 h-12 flex items-center justify-center rounded-full ${status.color} shadow-md`}>
            {status.icon}
          </div>
          <Tag
            className={`text-lg px-4 py-2 rounded-full font-semibold shadow-md ${status.color === "bg-blue-500" ? "bg-blue-500 text-white" :
              status.color === "bg-green-500" ? "bg-green-500 text-white" :
                status.color === "bg-yellow-500" ? "bg-yellow-500 text-gray-900" :
                  status.color === "bg-red-500" ? "bg-red-500 text-white" :
                    "bg-gray-500 text-white"
              }`}
          >
            {status.label}
          </Tag>
        </div>

      </Card>
    </div>
  );
};

export default DepositHistoryDetails;
