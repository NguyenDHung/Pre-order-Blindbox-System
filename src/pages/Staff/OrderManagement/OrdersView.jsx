import React, { useCallback, useEffect, useState } from "react";
import { Dropdown, Pagination, Spin } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from "react-router";
import { GetAllOrder } from "../../../api/Order/ApiOrder";
const OrdersView = () => {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [orderBy, setOrderBy] = useState("increase");
    const [pageIndex, setPageIndex] = useState(1);
    const [pagination, setPagination] = useState({
        PageSize: 10,
        TotalPage: 0,
        TotalCount: 0
    })
    const [loading, setLoading] = useState(false);

    const handlePageChange = (page) => {
        setPageIndex(page);
    };
    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const result = await GetAllOrder(pageIndex, pagination.PageSize, search, orderBy);
            if (result.status === 200) {
                const paginationData = JSON.parse(result?.headers?.get('x-pagination'))
                console.log('Pagination Data: ', paginationData);
                setPagination({
                    ...pagination,
                    TotalPage: paginationData.TotalPages,
                    TotalCount: paginationData.TotalCount
                })
            }
            setOrders([...result.data]);
        } catch (error) {
            console.error("Fetch Orders Error:", error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    }, [pagination.PageSize, pageIndex, search, orderBy]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders])

    const handleSearchKeyWord = (e) => {
        console.log(e.target.value);
        setSearch(e.target.value);
    }

    return (
        <div className="flex-1 h-full p-1 flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
            </div>

            <div className="bg-white p-4 rounded shadow flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-1">
                    <div className="relative">
                        <input
                            type="text"
                            className="bg-gray-100 border border-gray-300 rounded py-2 px-4 w-64"
                            placeholder="Tìm kiếm đơn hàng"
                            value={search}
                            onChange={(e) => handleSearchKeyWord(e)}
                        />
                        <i className="fas fa-search absolute top-3 right-3 text-gray-500"></i>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center text-gray-500" onClick={() => {
                            orderBy === "increase" ? setOrderBy("decrease") : setOrderBy("increase");
                        }}
                        >
                            <i className="fas fa-filter mr-2"></i> Sắp xếp
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto">
                    {loading ? (
                        <div className="flex justify-center">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <table className="table-auto w-full border-collapse text-left">
                            <thead>
                                <tr className="text-gray-500">
                                    <th className="px-2 py-1">Mã đơn hàng</th>
                                    <th className="px-2 py-1">Người nhận</th>
                                    <th className="px-2 py-1">Địa chỉ</th>
                                    <th className="px-2 py-1">Số điện thoại</th>
                                    <th className="px-2 py-1">Số tiền</th>
                                    <th className="px-2 py-1">Ngày tạo</th>
                                    <th className="px-2 py-1">Trạng thái</th>
                                    <th className="px-2 py-1">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((data, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="px-2 py-2">{data.orderId}</td>
                                        <td className="px-2 py-2">{data.receiver}</td>
                                        <td className="px-2 py-2">{data.receiverAddress}</td>
                                        <td className="px-2 py-2">{data.receiverPhone}</td>
                                        <td className="px-2 py-2">{data.amount} VND</td>
                                        <td className="px-2 py-2">{data.createdDate}</td>

                                        <td
                                            className={`px-2 py-2 ${data.status === 'Delivered' ? 'text-green-500' : 'text-red-500'
                                                }`}
                                        >
                                            {data.status}
                                        </td>
                                        <td className="px-2 py-2 text-center align-middle">
                                            <Dropdown
                                                menu={{
                                                    items: [
                                                        {
                                                            key: "0",
                                                            label: (
                                                                <Link
                                                                    to={`${data.orderId}`}
                                                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                >
                                                                    <EditOutlined /> <span>Chỉnh sửa đơn hàng</span>
                                                                </Link>
                                                            ),
                                                        },
                                                    ]
                                                }}
                                                trigger={['click']}
                                                placement="bottomLeft"
                                            >
                                                <button
                                                    onClick={(e) => e.preventDefault()}
                                                    className="inline-flex items-center justify-center text-gray-400 text-2xl gap-1"
                                                >
                                                    <i className="fas fa-ellipsis-v" />
                                                    <MoreOutlined />
                                                </button>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="flex justify-between items-center mt-4 p-4 bg-white shadow rounded">
                    <Pagination
                        current={pageIndex}
                        total={pagination.TotalCount}
                        pageSize={pagination.PageSize}
                        onChange={handlePageChange}
                        className="shadow-md p-2 rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default OrdersView;