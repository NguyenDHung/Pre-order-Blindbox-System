import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { GetRevenueByTime, GetTopThreeCampaign, GetLastMonthComparison, GetMonthlyReport_byYear } from "../../api/DashBoard/ApiDashBoard";
import { GetWallet } from "../../api/Wallet/ApiWallet";
import { FaMedal } from "react-icons/fa";
import { formatMoney } from "../../utils/FormatMoney";
const { RangePicker } = DatePicker;

const Dashboard = () => {
    const [lastMonthComparison, setLastMonthComparison] = useState({});
    const [wallet, setWallet] = useState({});
    const [monthlyReport, setMonthlyReport] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [dateRangeLineChart, setDateRangeLineChart] = useState([null, null]);
    const [dateRangeTopCampaigns, setDateRangeTopCampaigns] = useState([null, null]);
    const [revenueData, setRevenueData] = useState([]);
    const [TopCampaigns, setTopCampaigns] = useState([])


    // call Api 
    useEffect(() => {
        const fetchRevenueData = async () => {
            if (dateRangeLineChart[0] && dateRangeLineChart[1]) {
                const fromDate = dateRangeLineChart[0].format("YYYY-MM-DD");
                const toDate = dateRangeLineChart[1].format("YYYY-MM-DD");

                try {
                    const data = await GetRevenueByTime(fromDate, toDate);
                    setRevenueData(data);
                } catch (error) {
                    console.error("Failed to fetch revenue data", error);
                }
            }
        };

        const fetchTopCampaigns = async () => {
            if (dateRangeTopCampaigns[0] && dateRangeTopCampaigns[1]) {
                const fromDate = dateRangeTopCampaigns[0].format("YYYY-MM-DD");
                const toDate = dateRangeTopCampaigns[1].format("YYYY-MM-DD");

                try {
                    const data = await GetTopThreeCampaign(fromDate, toDate);
                    setTopCampaigns(data);
                } catch (error) {
                    console.error("Failed to fetch top campaign", error);
                }
            }
        };

        const fetchLastMonthComparison = async () => {
            try {
                const data = await GetLastMonthComparison();
                setLastMonthComparison(data);
                console.log(data);
            } catch (error) {
                console.error("Failed to fetch last month comparison", error);
            }
        }

        const fetchWallet = async () => {
            try {
                // Lấy accessToken từ cookie
                const authData = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('auth='))
                    ?.split('=')[1];

                if (!authData) {
                    console.error("Không tìm thấy accessToken!");
                    return;
                }
                const { accessToken } = JSON.parse(authData);
                const data = await GetWallet(accessToken);
                setWallet(data);
            } catch (error) {
                console.error("Lỗi khi lấy ví điện tử:", error);
            }
        };

        const fetchMonthlyReport_byYear = async () => {
            try {
                const authData = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('auth='))?.split('=')[1];

                if (!authData) {
                    console.error("Không tìm thấy accessToken!");
                    return;
                }

                const { accessToken } = JSON.parse(authData);
                const data = await GetMonthlyReport_byYear(accessToken, selectedYear);

                const ordersPerMonth = Array(12).fill(0);
                data.forEach((item) => {
                    const monthIndex = item.month - 1;
                    ordersPerMonth[monthIndex] = item.order;
                });

                setMonthlyReport(ordersPerMonth);
            } catch (error) {
                console.error("Lỗi khi lấy báo cáo hàng tháng:", error);
            }
        };
        // Gọi API khi dateRange thay đổi
        fetchMonthlyReport_byYear();
        fetchWallet();
        fetchLastMonthComparison();
        fetchRevenueData();
        fetchTopCampaigns();

    }, [dateRangeLineChart, dateRangeTopCampaigns, selectedYear]);

    // Get the year
    const handleDateChange = (date, dateString) => {
        console.log("Selected Date:", date, dateString);
        if (date) {
            setSelectedYear(dayjs(date).year()); // Get the year
        }
        if (!date) {
            setMonthlyReport([]);
        }

    }

    // Giới hạn năm từ năm hiện tại đến 2 năm sau
    const DisabledDate = (current) => {
        const currentYear = dayjs().year();
        return current.year() < currentYear || current.year() > currentYear + 2;
    };
    // Get Date in date range
    const handleDateLineChart = (dates) => {
        if (dates)
            setDateRangeLineChart(dates); // Nếu bỏ chọn
        else if (!dates) {
            setDateRangeLineChart([null, null]);
            setRevenueData([]);
        }

    };

    const handleDateTopCampaign = (dates) => {
        if (dates)
            setDateRangeTopCampaigns(dates); // Nếu bỏ chọn
        else if (!dates) {
            setDateRangeTopCampaigns([null, null]);
            setTopCampaigns([]);
        }

    };


    // Bar Chart (Total orders per month)
    const barChartOptions = {
        chart: { id: "monthly-total_orders" },
        xaxis: {
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // Sử dụng số thay vì chữ
            labels: {
                formatter: (value) => value.toString(), // Chuyển thành chuỗi để hiển thị đúng
            },
        },
        yaxis: {
            min: 0,
            max: 30, // Điều chỉnh theo giá trị lớn nhất
            tickAmount: 6, // Chia trục y thành các phần 0, 5, 10, 15, 20, 25, 30
            labels: {
                formatter: (value) => Math.round(value), // Đảm bảo hiển thị số nguyên
            },
        },
        dataLabels: {
            enabled: false, // Tắt hiển thị số trên thanh
        },
    };



    const barChartSeries = [
        { name: "Total orders", data: monthlyReport },
    ];
    // Line Chart (Statistics)
    // // Generate sample data for last 5 years to next 5 years
    // const startDate = dayjs().subtract(5, "year");
    // const endDate = dayjs().add(5, "year");
    // const allDays = [];
    // let currentDate = startDate;

    // while (currentDate.isBefore(endDate)) {
    //     allDays.push({
    //         date: currentDate.format("YYYY-MM-DD"),
    //         revenue: revenueData.totalRevenue,
    //     });
    //     currentDate = currentDate.add(1, "day");
    // }

    // // Filter data based on selected date range
    // const filteredData = dateRange[0] && dateRange[1]
    //     ? allDays.filter(({ date }) =>
    //         dayjs(date).isAfter(dateRange[0]) &&
    //         dayjs(date).isBefore(dateRange[1].add(1, "day"))
    //     )
    //     : allDays.slice(-30); // Default to last 30 days if no range selected

    // Line Chart Configuration
    const lineChartOptions = {
        chart: { id: "revenue-statistics" },
        xaxis: { categories: revenueData.map(d => dayjs(d.date).format("YYYY-MM-DD")) },
        yaxis: {
            labels: {
                formatter: (value) => value.toLocaleString(), // Hiển thị dạng "XXX,XXX,XXX"
            },
        },
        tooltip: {
            y: {

                formatter: (value) => value.toLocaleString(),
            },
        },
    };

    const lineChartSeries = [
        { name: "Revenue", data: revenueData.map(d => Number(d.totalRevenue)) }, // Giữ nguyên giá trị số
    ];

    // Sample data for top 3 campaigns

    const sortedCampaigns = [...TopCampaigns].sort((a, b) => {
        if (b.totalOrder !== a.totalOrder) {
            return b.totalOrder - a.totalOrder; // Sắp xếp theo số đơn hàng giảm dần
        }
        return a.name.localeCompare(b.name); // Nếu số đơn hàng bằng nhau, sắp xếp theo tên
    });

    // Gán rank và màu sắc
    const formattedCampaigns = sortedCampaigns.map((campaign, index) => ({
        ...campaign,
        rank: index + 1,
        color:
            index === 0
                ? "linear-gradient(135deg, #FFD700, #FFC000)" // Gold
                : index === 1
                    ? "linear-gradient(135deg, #C0C0C0, #A9A9A9)" // Silver
                    : "linear-gradient(135deg, #CD7F32, #B87333)", // Bronze
    }));

    // Đảo vị trí Rank 1 và Rank 2
    if (formattedCampaigns.length >= 2) {
        [formattedCampaigns[0], formattedCampaigns[1]] = [formattedCampaigns[1], formattedCampaigns[0]];
    }

    return (
        <div className="dashboard-container overflow-auto h-screen pr-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-opacity-80">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Thống Kê</h2>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch h-[500px]">
                {/* Left Side */}
                <div className="space-y-6 flex flex-col h-full">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-lg shadow">
                            <p className="text-gray-600">Số dư ví điện tử</p>
                            <span className="text-red-600 flex justify-start">
                                <h3 className="text-2xl font-bold mt-4">{formatMoney(wallet?.balance)}</h3>
                            </span>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow">
                            <p className="text-gray-600">Đơn hàng trong tháng</p>
                            <h3 className="text-2xl font-bold">{lastMonthComparison.currentMonthOrder}</h3>
                            <span className={`text-${lastMonthComparison.percentComparedLastMonth >= 0 ? "green" : "red"}-500`}>
                                {lastMonthComparison.percentComparedLastMonth >= 0 ? "↑" : "↓"}
                                {Math.round(lastMonthComparison.percentComparedLastMonth * 100) / 100}%
                            </span>
                        </div>

                    </div>

                    {/* Total orders Chart */}
                    <div className="p-4 bg-white rounded-lg shadow flex-1 overflow-hidden">
                        <div className="flex justify-start space-x-4">
                            <h3 className="text-lg font-bold">Tổng số đơn hàng trong 1 năm </h3>

                            <DatePicker
                                onChange={handleDateChange}
                                picker="year" // Ensure correct picker type
                                format="YYYY"
                                allowClear
                                placeholder="Chọn năm"
                                disabledDate={DisabledDate} // Giới hạn năm chọn
                            />
                        </div>
                        <Chart options={barChartOptions} series={barChartSeries} type="bar" height={250} />
                    </div>
                </div>

                {/* Right Side - Top 3 Campaigns */}
                <div className="p-6 bg-white rounded-lg shadow text-center flex flex-col h-full">
                    {/* Date Range Picker */}
                    <div className="mb-10 flex justify-center">
                        <RangePicker
                            onChange={handleDateTopCampaign}
                            format="YYYY-MM-DD"
                            allowClear
                            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                            disabledDate={DisabledDate} // Giới hạn năm chọn
                        />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Top 3 chiến dịch nổi bật</h2>
                    <p className="text-gray-600 text-sm mb-4">Các Chiến dịch có số đơn hàng cao nhất</p>

                    <div className="grid grid-cols-3 gap-6 justify-center items-end flex-grow">
                        {formattedCampaigns.map((campaign) => (
                            <div key={campaign.name} className="relative flex flex-col items-center">
                                <FaMedal
                                    className={`text-3xl mb-2 ${campaign.rank === 1 ? 'text-yellow-500' : campaign.rank === 2 ? 'text-gray-400' : 'text-orange-600'
                                        }`}
                                />
                                <p className="mt-1 text-base font-bold text-center leading-tight">{campaign.name}</p>
                                <p className="text-gray-600 text-sm mb-1">{campaign.totalOrder} {campaign.totalOrder > 1 ? 'orders' : 'order'}</p>

                                <div
                                    className="w-20 flex items-center justify-center text-white font-bold text-xl rounded-lg shadow-lg"
                                    style={{
                                        height: `${Math.max(10, campaign.totalOrder * 10)}px`,
                                        background: campaign.color
                                    }}
                                >
                                    {campaign.rank}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Revenue Statistics */}
            <div className="p-4 bg-white rounded-lg shadow mt-6">
                <h3 className="text-lg font-bold">Thống kê doanh thu</h3>
                <p className="text-gray-600">Xem doanh thu trong khoảng thời gian cụ thể</p>
                <div className="mt-2">
                    <RangePicker
                        allowClear
                        onChange={handleDateLineChart}
                        format="YYYY-MM-DD"
                        placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                        disabledDate={DisabledDate} // Giới hạn năm chọn
                    />
                </div>
                {/* Revenue Line Chart */}
                <Chart options={lineChartOptions} series={lineChartSeries} type="line" height={300} />
            </div>
        </div>
    );
};

export default Dashboard;
