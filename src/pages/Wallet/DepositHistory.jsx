import React, { useState, useCallback, useEffect } from "react";
import { Table, Space, Button, Pagination, Spin, DatePicker, Dropdown } from "antd";
import useFetchDataPagination from "../../hooks/useFetchDataPagination";
import { MoreOutlined, EyeOutlined } from '@ant-design/icons'
import { GetListOfAllTransactionByUser } from "../../api/Transaction/ApiTransaction";
import { GetTransactions, GetWallet } from "../../api/Wallet/ApiWallet";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import { formatMoney } from '../../utils/FormatMoney';
import CircularChart from "../../components/Chart/CircularChart";
const DepositHistory = () => {
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(1);
    // Nếu hôm nay là tháng 3 thì sẽ in ra 2 (vì chỉ mục bắt đầu từ 0)
    // In ra 3, tức là tháng thực tế
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(null);
    const [wallet, setWallet] = useState({});
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const Month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    // Fetch dữ liệu giao dịch
    const fetchListOfAllTransactionByUser = useCallback(async () => {
        const authData = document.cookie
            .split("; ")
            .find((row) => row.startsWith("auth="))
            ?.split("=")[1];

        if (!authData) {
            console.error("Không tìm thấy accessToken!");
            return { data: [], pagination: null };
        }

        const { accessToken } = JSON.parse(decodeURIComponent(authData));

        return await GetListOfAllTransactionByUser(accessToken, pageIndex, pageSize,
        );
    }, [pageSize, pageIndex]);

    const { data: transactions, loading, pagination } = useFetchDataPagination(fetchListOfAllTransactionByUser, [
        pageSize, pageIndex
    ]);

    useEffect(() => {
        const fetchTransaction = async () => {
            const authData = document.cookie
                .split("; ")
                .find((row) => row.startsWith("auth="))
                ?.split("=")[1];

            if (!authData) {
                console.error("Không tìm thấy accessToken!");
                return;
            }

            const { accessToken } = JSON.parse(decodeURIComponent(authData));

            try {
                const data = await GetTransactions(accessToken, selectedMonth, selectedYear);
                setSelectedTransaction(data);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin giao dịch:", error);
            }
        };


        // const fetchWallet = async () => {
        //     try {
        //         // Lấy accessToken từ cookie
        //         const authData = document.cookie
        //             .split('; ')
        //             .find(row => row.startsWith('auth='))
        //             ?.split('=')[1];

        //         if (!authData) {
        //             console.error("Không tìm thấy accessToken!");
        //             return;
        //         }
        //         const { accessToken } = JSON.parse(authData);
        //         const data = await GetWallet(accessToken);
        //         setWallet(data);
        //     } catch (error) {
        //         console.error("Lỗi khi lấy ví điện tử:", error);
        //     }
        // };
        // fetchWallet();
        fetchTransaction();
    }, [selectedMonth, selectedYear]);
    // Get the year
    const handleDateChange = (date, dateString) => {
        console.log("Selected Date:", date, dateString);
        if (date) {
            setSelectedYear(dayjs(date).year());
        }
    };
    // Giới hạn năm từ năm hiện tại đến 2 năm sau
    const DisabledDate = (current) => {
        const currentYear = dayjs().year();
        return current.year() < currentYear || current.year() > currentYear + 2;
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
        },
        {
            title: "Hành động",
            key: "action",
            align: "center",
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: "0",
                                label: (
                                    <Link
                                        to={`details/${record.transactionId}`}
                                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <EyeOutlined /> <span>Xem chi tiết giao dịch</span>
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
            ),
        },
    ];

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cashflow Section */}
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-semibold text-gray-800">Thông tin giao dịch</h2>
                    <div className="flex items-center space-x-4">
                        {/* Dropdown chọn tháng */}
                        <Dropdown
                            overlay={
                                <div className="bg-white border rounded shadow-lg p-2">
                                    {Month.map((month) => (
                                        <div
                                            key={month}
                                            onClick={() => setSelectedMonth(month)}
                                            className={`p-2 cursor-pointer hover:bg-gray-200 ${selectedMonth === month ? "bg-gray-300" : ""}`}
                                        >
                                            Tháng {month}
                                        </div>
                                    ))}
                                </div>
                            }
                            trigger={['click']}
                        >
                            <Button>
                                Tháng {selectedMonth} <MoreOutlined />
                            </Button>
                        </Dropdown>

                        {/* DatePicker chọn năm */}
                        <DatePicker
                            onChange={handleDateChange}
                            picker="year" // Ensure correct picker type
                            format="YYYY"
                            placeholder="Chọn năm"
                            disabledDate={DisabledDate} // Giới hạn năm chọn
                        />
                    </div>

                </div>


                <div className="mt-6 grid grid-cols-3 gap-6 text-center text-gray-600">
                    {/* Tổng số tiền đã hoàn trả */}
                    <div className="border rounded-lg p-4 shadow-md flex flex-col items-center">
                        <p className="text-xl">Tổng số tiền đã hoàn trả</p>
                        <p className="text-2xl font-bold min-h-[50px] mt-2">{formatMoney(selectedTransaction.totalRefundAtTime)}</p>
                    </div>

                    {/* Tổng số tiền rút đang chờ duyệt */}
                    <div className="border rounded-lg p-4 shadow-md flex flex-col items-center">
                        <p className="text-xl">Tổng số tiền rút đang chờ duyệt</p>
                        <p className="text-2xl font-bold min-h-[50px]">{formatMoney(selectedTransaction.totalWithdrawPendingAtTime)}</p>
                    </div>

                    {/* Tổng số tiền đã thanh toán */}
                    <div className="border rounded-lg p-4 shadow-md flex flex-col items-center">
                        <p className="text-xl">Tổng số tiền đã thanh toán</p>
                        <p className="text-2xl font-bold min-h-[50px]">{formatMoney(selectedTransaction.totalPayAtTime)}</p>
                    </div>
                </div>
                {/* Số dư hiện tại */}
                {/* Circular Chart */}
                <div className="mt-6 flex items-center justify-center relative scale-100">
                    <div className="relative w-72 h-72 flex items-center justify-center">
                        {/* <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" stroke="#E67E22" strokeWidth="6" fill="none" strokeDasharray="40,100" />
                            <circle cx="50" cy="50" r="45" stroke="#3498DB" strokeWidth="6" fill="none" strokeDasharray="60,100" strokeDashoffset="-40" />
                        </svg> */}
                        <div className="text-center px-2">
                            <CircularChart value={selectedTransaction.balanceAtTime} />

                            {/* <p className="text-4xl font-bold text-gray-900">{formatMoney(selectedTransaction.balanceAtTime)}</p>
                            <p className="text-base text-gray-500">Số dư hiện tại</p> */}
                        </div>
                    </div>
                </div>

                {/* Tổng tiền đã rút & Tổng tiền đã nạp */}
                <div className="mt-20 flex justify-between items-center space-x-4 scale-100">
                    <div className="flex items-center bg-orange-100 text-orange-700 px-6 py-4 rounded-xl">
                        <span className="text-2xl">↓</span>
                        <div className="ml-3">
                            <p className="text-3xl font-bold">{formatMoney(selectedTransaction.totalWithdrawAtTime)}</p>
                            <p className="text-lg">Rút Ra</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-green-100 text-green-700 px-6 py-4 rounded-xl">
                        <span className="text-2xl">↑</span>
                        <div className="ml-3">
                            <p className="text-3xl font-bold">{formatMoney(selectedTransaction.totalDepositAtTime)}</p>
                            <p className="text-lg">Nạp vào</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Latest Transactions Section */}
            <div className="bg-white p-6 rounded-2xl shadow-md w-full">
                <h2 className="text-lg font-semibold text-gray-700">Các giao dịch gần nhất</h2>
                <div className="mt-4">
                    {/* {[
                        { date: "Today", category: "Fashion", type: "Card payment", item: "Clothes", amount: "- 15,00 $", color: "text-red-500" },
                        { date: "20/05", category: "Food", type: "Card payment", item: "Food", amount: "- 8,00 $", color: "text-red-500" },
                        { date: "18/05", category: "Invest Money", type: "Transfer", item: "Business", amount: "+ 249,00 $", color: "text-blue-500" },
                        { date: "18/05", category: "My Company", type: "Transfer", item: "Salary", amount: "+ 1300,00 $", color: "text-blue-500" },
                        { date: "08/05", category: "Medical Checkup", type: "Card payment", item: "Pharmacy", amount: "- 39,50 $", color: "text-red-500" },
                        { date: "08/05", category: "Food", type: "Card payment", item: "Food", amount: "- 6,00 $", color: "text-red-500" },
                        { date: "04/05", category: "Financial", type: "Transfer", item: "Trading", amount: "+ 150,00 $", color: "text-blue-500" },
                    ].map((transaction, index) => (
                        <div key={index} className="flex justify-between py-2 border-b border-gray-200 last:border-none">
                            <span className="text-gray-600">{transaction.date}</span>
                            <span className="text-gray-700 font-medium">{transaction.category}</span>
                            <span className="text-gray-500 text-sm">{transaction.type}</span>
                            <span className={transaction.color}>{transaction.amount}</span>
                        </div>
                    ))} */}
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
            </div>
        </div>
    );
};

export default DepositHistory;
