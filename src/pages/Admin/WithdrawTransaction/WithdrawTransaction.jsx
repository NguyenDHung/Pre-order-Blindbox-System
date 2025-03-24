import React, { useCallback, useState, useEffect } from "react";
import { Card, Pagination, Table } from "antd";
import { GetTheWithdrawTransactionRequest } from "../../../api/Transaction/ApiTransaction";
import useFetchDataPagination from "../../../hooks/useFetchDataPagination";
import {formatMoney} from "../../../utils/FormatMoney"
import { Link } from "react-router";
function WithdrawTransaction() {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const fetchTransactions = useCallback(
    () => GetTheWithdrawTransactionRequest(pageSize, pageIndex),
    [pageSize, pageIndex]
  );

  const { data, loading, pagination, refetch} = useFetchDataPagination(
    fetchTransactions,
    [pageSize, pageIndex]
  );

  return (
    <Card
      className="mt-4"
      title={
        <h2 className="text-2xl font-bold">
          Các yêu cầu rút tiền ra khỏi hệ thống
        </h2>
      }
    >
      <Table
        dataSource={data}
        loading={loading}
        rowKey="transactionId"
        pagination={{
          pageSize: pageSize,
          current: pageIndex,
          total: pagination.total,
          onChange: (page) => setPageIndex(page),
        }}
      >
        <Table.Column
          title="Tên khách hàng"
          key="customerName"
          render={(_, record) => (
            <span>
              {record.wallet?.userBankingInformation?.fullName ||
                "Chưa cập nhật"}
            </span>
          )}
        />
        {/* Cột hiển thị ngày tạo */}
        <Table.Column
          title="Ngày tạo"
          dataIndex="createdDate"
          key="createdDate"
          render={(text) => new Date(text).toLocaleString()}
        />
        {/* Cột hiển thị số tiền */}
        <Table.Column
          title="Amount"
          dataIndex="money"
          key="money"
          render={(text) => <span>{formatMoney(text)}</span>}
        />
         <Table.Column
          title="Hành động"
          dataIndex="transactionId"
          key="transactionId"
          render={(text) => <Link to={"/admin/withdraw-request/"+text}>Xem chi tiết</Link>}
        />
      </Table>
        <div className="flex justify-end mt-4">
          <Pagination
            current={pagination.current}
            total={pagination.total}
            pageSize={pagination.pageSize}
            showSizeChanger
            pageSizeOptions={["5", "10", "20"]}
            onChange={(page, pageSize) => {
              setPageIndex(page);
              setPageSize(pageSize);
            }}
            className="shadow-md p-2 rounded-md bg-gray-100 transition-all duration-300 hover:bg-gray-200"
          />
        </div>
    </Card>
  );
}

export default WithdrawTransaction;
