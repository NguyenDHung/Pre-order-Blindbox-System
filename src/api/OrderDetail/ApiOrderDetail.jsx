import { axiosConfigHeader } from "../axiosConfigHeader";
import api from "../instance";

const GetAllOrderDetailsByOrderID = async (orderID, pageIndex, pageSize) => {
    try {
        const params = {};
        if (pageIndex !== undefined) {
            params.pageIndex = pageIndex;
        }
        if (pageSize !== undefined) {
            params.pageSize = pageSize;
        }
        var result = await api.get(`/OrderDetail/${orderID}`, { ...axiosConfigHeader, params: params });
        if (result.status === 200) {
            return result.data;
        }
    } catch (error) {
        console.log('>>> Api Get All Order Details By Order ID Error ', error);
        return [];
    }
}
const GetAllOrderTempDetailsByTempOrderID = async (orderID, pageIndex, pageSize) => {
    try {
        const params = {};
        if (pageIndex !== undefined) {
            params.pageIndex = pageIndex;
        }
        if (pageSize !== undefined) {
            params.pageSize = pageSize;
        }
        var result = await api.get(`/TempCampaignBulkOrderDetail/${orderID}`, { ...axiosConfigHeader, params: params });
        if (result.status === 200) {
            return result.data;
        }
    } catch (error) {
        console.log('>>> Api Get All Order Details By Order ID Error ', error);
        return [];
    }
}
export { GetAllOrderDetailsByOrderID,GetAllOrderTempDetailsByTempOrderID }