import { Pagination, Spin, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router";
import { GetApproveOrderByUser } from "../../api/Order/ApiOrder";
import useFetchDataPagination from "../../hooks/useFetchDataPagination";

function ApproveOrderTable() {
  const [pageSize, setPageSize] = useState(4);
  const [pageIndex, setPageIndex] = useState(1);
  const { data, loading, refetch, pagination } = useFetchDataPagination(
    GetApproveOrderByUser,
    [pageSize, pageIndex]
  );
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
        <Link to={`detail/${record.orderId}`}>View Detail</Link>
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
        rowKey={(record) => record.orderId+"OrderIdTable"}
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

export default ApproveOrderTable;
