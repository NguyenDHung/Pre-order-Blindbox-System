import React from "react";
import { Card, Steps } from "antd";

const { Step } = Steps;

// Giả sử bạn có trạng thái của đơn hàng dưới dạng chuỗi hoặc số,
// ở đây chúng ta sẽ ánh xạ trạng thái thành chỉ số của bước hiện tại.
// placed, proccessing, delivering, delivered, Cancel
import {
  FileSearchOutlined,
  SyncOutlined,
  CarOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

const OrderTrackingSteps = ({ status, TypeOfOrder = "Confirmed" }) => {
  // Xác định bước hiện tại dựa trên trạng thái đơn hàng
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
              style={currentStep == 0 ? { color: "#1890ff" } : null}
            />
          }
        />
        <Step
          title="Xử lý đơn hàng"
          description="Đơn hàng đang được xử lý"
          icon={
            <SyncOutlined
              style={currentStep == 1 ? { color: "#faad14" } : null}
            />
          }
        />
        <Step
          title="Đang giao hàng"
          description="Đơn hàng đang được giao"
          icon={
            <CarOutlined
              style={currentStep == 2 ? { color: "#13c2c2" } : null}
            />
          }
        />
        <Step
          title="Đã giao hàng"
          description="Đơn hàng đã được giao"
          icon={
            <CheckCircleFilled
              style={currentStep == 3 ? { color: "#52c41a" } : null}
            />
          }
        />
      </Steps>
    );
  } else {
    const statusToStepIndex = {
      Waiting: 0,
      Approve: 1,
      Reject: 2,
    };
    const currentStep = statusToStepIndex[status] || 0;
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
                  color:
                    currentStep === 0
                      ? "#1890ff"
                      : currentStep > 0
                      ? "#52c41a"
                      : "#d9d9d9",
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
                  color:
                    currentStep === 1
                      ? "#1890ff"
                      : currentStep > 1
                      ? "#52c41a"
                      : "#d9d9d9",
                }}
              />
            }
          />
          {currentStep === 2 && (
            <Step
              title="Đơn hàng bị từ chối"
              description="Đơn của bạn sẽ được hoàn tiền"
              icon={<CloseCircleOutlined style={{ color: "#f5222d" }} />}
            />
          )}
        </Steps>
      </Card>
    );
  }
};

export default OrderTrackingSteps;
