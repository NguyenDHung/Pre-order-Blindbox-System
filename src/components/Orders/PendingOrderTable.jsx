import { Pagination, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { GetPendingOrderByUser } from "../../api/Order/ApiOrder";
import useFetchDataPagination from "../../hooks/useFetchDataPagination";

// Define the columns for the table

function PendingOrderTable() {
  const [pageSize, setPageSize] = useState(4);
  const [pageIndex, setPageIndex] = useState(1);
  const { data, loading, refetch, pagination } = useFetchDataPagination(
    GetPendingOrderByUser,
    [pageSize, pageIndex]
  );
  useEffect(()=>{
    console.log("Data received:", data);
  },[data])
  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Ngày đặt đơn",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "Tổng tiền",
      dataIndex: "amount",
      key: "amount",
      render: (value) => `${value} VND`,
    },
    {
      title: "Người nhận",
      dataIndex: "receiver",
      key: "receiver",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Link to={`pending-orders/detail/${record.tempCampaignBulkOrderId}`}>View Detail</Link>
      ),
    },
  ];
  return loading ? (
    <Spin />
  ) : (
    <>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.tempCampaignBulkOrderId}
        pagination={{ pageSize: 5 }}
        bordered
      />
      <div className="flex justify-end mt-4">
        <Pagination
          current={pagination.current}
          total={pagination.total}
          pageSize={pagination.pageSize}
          showSizeChanger
          showQuickJumper
          pageSizeOptions={["5", "10", "20"]}
          onChange={(page, pageSize) => {
            setPageIndex(page);
            setPageSize(pageSize);
          }}
          className="shadow-md p-2 rounded-md bg-gray-100 transition-all duration-300 hover:bg-gray-200"
        />
      </div>
    </>
  );
}

export default PendingOrderTable;
