import React from "react";
import { Card, Steps } from "antd";

const { Step } = Steps;
import {
  FileSearchOutlined,
  SyncOutlined,
  CarOutlined,
  CheckCircleFilled,
  CloseCircleOutlined,
} from "@ant-design/icons";

const OrderTrackingSteps = ({ status, TypeOfOrder = "Confirmed" }) => {
  if (TypeOfOrder === "Confirmed") {
    const statusToStepIndex = {
      Placed: 0,
      Processing: 1,
      Delivering: 2,
      Delivered: 3,
    };
    const currentStep = statusToStepIndex[status] || 0;
    return (
      <Steps current={currentStep} direction="horizontal">
        <Step
          title="Kiểm duyệt đơn hàng"
          description="Đơn hàng đã được xác nhận"
          icon={
            <FileSearchOutlined
              style={currentStep === 0 ? { color: "#1890ff" } : null}
            />
          }
        />
        <Step
          title="Xử lý đơn hàng"
          description="Đơn hàng đang được xử lý"
          icon={
            <SyncOutlined
              style={currentStep === 1 ? { color: "#faad14" } : null}
            />
          }
        />
        <Step
          title="Đang giao hàng"
          description="Đơn hàng đang được giao"
          icon={
            <CarOutlined
              style={currentStep === 2 ? { color: "#13c2c2" } : null}
            />
          }
        />
        <Step
          title="Đã giao hàng"
          description="Đơn hàng đã được giao"
          icon={
            <CheckCircleFilled
              style={currentStep === 3 ? { color: "#52c41a" } : null}
            />
          }
        />
      </Steps>
    );
  } else {
    // Trường hợp khác, ví dụ như đơn hàng chưa Confirm, có thể là Waiting, Approve hay Reject.
    if (status === "Reject") {
      // Nếu đơn hàng bị từ chối, chỉ hiển thị 2 bước: kiểm duyệt và từ chối
      return (
        <Card title="Tình trạng của đơn hàng" style={{ marginTop: 24 }}>
          <Steps current={1}>
            <Step
              title="Kiểm duyệt đơn hàng"
              description="Đơn hàng đã được duyệt"
              icon={
                <FileSearchOutlined style={{ color: "#52c41a" }} />
              }
            />
            <Step
              title="Đơn hàng bị từ chối"
              description="Đơn của bạn sẽ được hoàn tiền"
              icon={
                <CloseCircleOutlined style={{ color: "#f5222d" }} />
              }
            />
          </Steps>
        </Card>
      );
    } else {
      // Trường hợp còn lại: Waiting hoặc Approve
      const currentStep = status === "Approve" ? 1 : 0;
      return (
        <Card title="Tình trạng của đơn hàng" style={{ marginTop: 24 }}>
          <Steps current={currentStep}>
            <Step
              title="Kiểm duyệt đơn hàng"
              description={
                currentStep === 0
                  ? "Đơn hàng đang chờ được xác nhận"
                  : "Đơn hàng đã được xác nhận"
              }
              icon={
                <FileSearchOutlined
                  style={{
                    color: currentStep === 0 ? "#1890ff" : "#52c41a",
                  }}
                />
              }
            />
            <Step
              title="Thành Công"
              description="Đơn hàng đã được duyệt"
              icon={
                <CheckCircleFilled
                  style={{
                    color: currentStep === 1 ? "#1890ff" : "#d9d9d9",
                  }}
                />
              }
            />
          </Steps>
        </Card>
      );
    }
  }
};

export default OrderTrackingSteps;
