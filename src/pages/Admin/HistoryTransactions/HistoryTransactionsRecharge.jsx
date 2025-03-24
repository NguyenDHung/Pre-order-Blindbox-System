import React, { useState, useCallback } from "react";
import { Table, Space, Button, Pagination, Spin, DatePicker, Dropdown, Menu } from "antd";
import useFetchDataPagination from "../../../hooks/useFetchDataPagination";
import { GetListOfAllTransaction } from "../../../api/Transaction/ApiTransaction";
import { DownOutlined, CalendarOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const HistoryTransactionsRecharge = () => {
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(1);
    const [selectedDate, setSelectedDate] = useState("Qua 90 ngày");
    const [fromDate, setFromDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [type, setType] = useState("Recharge");
    // Danh sách bộ lọc ngày
    const dateRanges = {
        "Qua 7 ngày": 7,
        "Qua 14 ngày": 14,
        "Qua 30 ngày": 30,
        "Qua 45 ngày": 45,
        "Qua 90 ngày": 90,
    };

    // Xử lý chọn ngày từ bộ lọc dropdown
    const handleDateSelection = (range) => {
        setSelectedDate(range);
        const days = dateRanges[range];
        const now = new Date();
        const pastDate = new Date();
        pastDate.setDate(now.getDate() - days); // Lùi lại số ngày

        setFromDate(pastDate.toISOString());
        setEndDate(now.toISOString());
    };


    // Xử lý chọn ngày từ RangePicker
    const handleDateChange = (dates) => {
        if (dates && dates.length === 2) {
            setFromDate(dates[0].startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS"));
            setEndDate(dates[1].endOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS"));
        } else {
            setFromDate(null);
            setEndDate(null);
        }
    };


    // Fetch dữ liệu giao dịch
    const fetchTransactions = useCallback(async () => {
        const authData = document.cookie
            .split("; ")
            .find((row) => row.startsWith("auth="))
            ?.split("=")[1];

        if (!authData) {
            console.error("Không tìm thấy accessToken!");
            return { data: [], pagination: null };
        }

        const { accessToken } = JSON.parse(decodeURIComponent(authData));

        return await GetListOfAllTransaction(accessToken, {
            Type: type,
            FromDate: fromDate ? fromDate : null,
            EndDate: endDate ? endDate : null,
            PageIndex: pageIndex,
            PageSize: pageSize,

        });
    }, [pageSize, pageIndex, fromDate, endDate]);

    const { data: transactions, loading, pagination } = useFetchDataPagination(fetchTransactions, [
        pageSize, pageIndex, fromDate, endDate,
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "text-yellow-500";
            case "Failed":
                return "text-red-500";
            case "Success":
                return "text-green-500";
            case "Completed":
                return "text-gray-500";
            default:
                return "text-black";
        }
    };

    const columns = [
        {
            title: "STT",
            key: "index",
            align: "center",
            render: (_, __, index) => (
                <div className="text-center font-bold text-red-500">
                    {(pagination.current - 1) * pagination.pageSize + index + 1}
                </div>
            ),
        },
        {
            title: "Nội Dung",
            dataIndex: "description",
            key: "description",
            align: "center",
            render: (text) => <div className="text-center">{text || "N/A"}</div>,
        },
        {
            title: "Số tiền",
            dataIndex: "money",
            key: "money",
            align: "center",
            render: (money) => (
                <div className="text-center font-semibold">
                    {money.toLocaleString("vi-VN")} VNĐ
                </div>
            ),
        },
        {
            title: "Loại giao dịch",
            dataIndex: "type",
            key: "type",
            align: "center",
            render: (type) => <div className="text-center">{type}</div>,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            align: "center",
            render: (status) => (
                <div className={`text-center font-semibold ${getStatusColor(status)}`}>
                    {status}
                </div>
            ),
        },
        {
            title: "Thời gian giao dịch",
            dataIndex: "createdDate",
            key: "createdDate",
            align: "center",
            render: (date) =>
                date
                    ? new Date(date).toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false, // Hiển thị giờ ở dạng 24h
                    })
                    : "N/A",
        }

    ];

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Lịch sử Nạp tiền </h2>

                <div className="flex space-x-4">
                    <Dropdown
                        overlay={
                            <Menu>
                                {Object.keys(dateRanges).map((range) => (
                                    <Menu.Item key={range} onClick={() => handleDateSelection(range)}>
                                        {range}
                                    </Menu.Item>
                                ))}
                            </Menu>
                        }
                        trigger={["click"]}
                    >
                        <Button className="border-[#D9D9D9] flex items-center space-x-2 text-lg">
                            <CalendarOutlined />
                            <span>{selectedDate}</span>
                            <DownOutlined />
                        </Button>
                    </Dropdown>

                    <RangePicker className="border-[#D9D9D9] text-lg"
                        onChange={(dates) => handleDateChange(dates)}
                        format="YYYY-MM-DDTHH:mm:ss.SSS"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center">
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <Table
                        bordered={true}
                        columns={columns}
                        dataSource={transactions}
                        pagination={false}
                        rowKey="transactionId"
                        className="border rounded-md mt-5"
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
            )}
        </div>
    );
}

export default HistoryTransactionsRecharge