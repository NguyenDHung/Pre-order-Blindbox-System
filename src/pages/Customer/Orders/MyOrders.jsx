import { Breadcrumb, Table } from "antd";
import React, { useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import PendingOrderTable from "../../../components/Orders/PendingOrderTable";
import ApproveOrderTable from "../../../components/Orders/ApproveOrderTable";
function MyOrders() {
  return (
    <div>
      <div className="max-w-screen-xl w-full mx-auto h-[90vh]">
        <h1 className="text-center text-2xl py-2">Đơn hàng của tôi</h1>
        <Breadcrumb
          items={[
            {
              title: (
                <Link to="/">
                  <HomeOutlined />
                </Link>
              ),
            },
            {
              title: "My Order",
            },
          ]}
        />
        {/* Table to display orders */}
        <h2 className="text-xl">Các đơn hàng đã được duyệt </h2>
        <ApproveOrderTable />
        <h2 className="text-xl">Các đơn hàng đang chờ được duyệt </h2>
        <PendingOrderTable />
      </div>
    </div>
  );
}

export default MyOrders;
