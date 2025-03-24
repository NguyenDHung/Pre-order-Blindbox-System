import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Descriptions, Button, message } from "antd";
import {
  GetWithdrawTransactionDetailRequest,
  ApproveWithdrawTransactionRequest,
} from "../../../api/Transaction/ApiTransaction";

function WithdrawTransactionDetail() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(false);
  const navigate = useNavigate();
  const fetchTransactionDetail = useCallback(async () => {
    setLoading(true);
    try {
      const data = await GetWithdrawTransactionDetailRequest(id);
      setTransaction(data);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết giao dịch:", error);
      message.error("Lỗi khi lấy chi tiết giao dịch");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchTransactionDetail();
    }
  }, [id, fetchTransactionDetail]);
  useEffect(() => {
    if (
      transaction != null &&
      transaction.status !== "Pending" &&
      transaction.type !== "Withdraw"
    ) {
      navigate("/admin/withdraw-request");
      message.error("Giao dịch không hợp lệ để duyệt");
    }
  }, [transaction]);
  const handleApprove = async () => {
    setApproving(true);
    try {
      await ApproveWithdrawTransactionRequest(id);
      message.success("Đã đồng ý giao dịch rút tiền");
      navigate("/admin/withdraw-request");
    } catch (error) {
      console.error("Lỗi khi đồng ý giao dịch:", error);
      message.error("Lỗi khi đồng ý giao dịch");
    } finally {
      setApproving(false);
    }
  };

  if (!transaction) {
    return <Card loading={loading}>Đang tải...</Card>;
  }

  const {
    transactionId,
    description,
    status,
    type,
    money,
    createdDate,
    wallet,
  } = transaction;
  const { userBankingInformation } = wallet || {};

  return (
    <Card title="Chi tiết giao dịch rút tiền" loading={loading}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Transaction ID">
          {transactionId}
        </Descriptions.Item>
        <Descriptions.Item label="Mô tả">{description}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái">{status}</Descriptions.Item>
        <Descriptions.Item label="Loại giao dịch">{type}</Descriptions.Item>
        <Descriptions.Item label="Số tiền">{money}</Descriptions.Item>
        <Descriptions.Item label="Ngày tạo">
          {new Date(createdDate).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Wallet ID">
          {wallet?.walletId}
        </Descriptions.Item>
        {userBankingInformation && (
          <>
            <Descriptions.Item label="Tên khách hàng">
              {userBankingInformation.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {userBankingInformation.email}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {userBankingInformation.phone || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {userBankingInformation.address}
            </Descriptions.Item>
            <Descriptions.Item label="Tên ngân hàng">
              {userBankingInformation.bankName || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Số tài khoản ngân hàng">
              {userBankingInformation.bankAccountNumber || "N/A"}
            </Descriptions.Item>
          </>
        )}
      </Descriptions>
      <div style={{ marginTop: 16 }}>
        <Button type="primary" onClick={handleApprove} loading={approving}>
          Đồng ý
        </Button>
      </div>
    </Card>
  );
}

export default WithdrawTransactionDetail;
