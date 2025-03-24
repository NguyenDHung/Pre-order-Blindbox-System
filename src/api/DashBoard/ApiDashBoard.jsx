import api from "../instance";
import { axiosConfigHeader } from "../axiosConfigHeader";
import { toast } from "react-toastify";
const GetRevenueByTime = async (fromDate, toDate) => {
    try {
        const response = await api.get("/DashBoard/GetRevenueByTime", {
            ...axiosConfigHeader,
            params: { fromDate, toDate },
        });

        const data = response.data;
        console.log("Raw API Response:", data); // In dữ liệu trả về

        return data;
    } catch (error) {
        console.log(">>> API Get Revenue By Time Error: ", error);
        toast.error("Get revenue by time failed!");
        return [];
    }
};


const GetTopThreeCampaign = async (fromDate, toDate) => {
    try {
        const response = await api.get("/DashBoard/GetTopThreeCampaign", {
            ...axiosConfigHeader, // Giữ nguyên cấu hình header
            params: { fromDate, toDate }, // Truyền fromDate và toDate vào query params
        });

        const data = response.data;
        console.log("Raw API Response:", data); // In dữ liệu trả về

        return data;
    } catch (error) {
        console.log(">>> API Get Top Three Campaign Error: ", error);
        toast.error("Get top three campaign failed!");
        return [];
    }
};

const GetLastMonthComparison = async () => {
    try {
        const response = await api.get("/DashBoard/last-month-comparison", axiosConfigHeader);
        console.log("Raw API Response:", response.data); // In dữ liệu trả về
        return response.data;
    } catch (error) {
        console.log(">>> API Get last month comparison  Error: ", error);
        toast.error("Get last month comparison failed!");
        return [];
    }
};

const GetMonthlyReport_byYear = async (accessToken, Year) => {
    try {
        const result = await api.get(`/DashBoard/monthly-report/${Year}`, {
            ...axiosConfigHeader,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        });
        return result.data;
    } catch (error) {
        console.log('>>> GetUserInformation error: ', error);
        return null;
    }
};
export { GetRevenueByTime, GetTopThreeCampaign, GetLastMonthComparison, GetMonthlyReport_byYear };