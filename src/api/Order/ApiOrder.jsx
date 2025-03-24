import api from '../instance';
import { axiosConfigHeader } from '../axiosConfigHeader';
import { param } from 'framer-motion/client';

const GetAllOrder = async (pageIndex, pageSize, searchKeyWords, orderBy) => {
    try {
        const params = {};
        if (pageIndex !== undefined) {
            params.pageIndex = pageIndex;
        }
        if (pageSize !== undefined) {
            params.pageSize = pageSize;
        }
        if (searchKeyWords !== undefined) {
            params.searchKeyWords = searchKeyWords;
        }
        params.orderBy = orderBy;
        var result = await api.get('/Order', { ...axiosConfigHeader, params: params });
        if (result.status === 200) {
            return result;
        }
    } catch (error) {
        console.log('>>> Api Get All Order Error: ', error);
        return [];
    }
}

const GetOrderById = async (orderId) => {
    try {
        var result = await api.get(`/Order/customer/${orderId}`, axiosConfigHeader)
        if (result.status === 200) {
            return result.data;
        }
    } catch (error) {
        console.log('>>> Api Get Order Id Error ', error);
        return null;
    }
}
const GetOrderByIdForStaff = async (orderId) => {
    try {

        var result = await api.get(`/Order/staff/${orderId}`, axiosConfigHeader)
        if (result.status === 200) {
            return result.data;
        }
    } catch (error) {
        console.log('>>> Api Get Order Id Error ', error);
        return null;
    }
}
const GetTempOrderById = async (orderId) => {
    try {
        var result = await api.get(`/TempCampaignBulkOrder/customer/${orderId}`, axiosConfigHeader)
        if (result.status === 200) {
            return result.data;
        }
    } catch (error) {
        console.log('>>> Api Get Temp Order by Id Error ', error);
        return null;
    }
}

const GetApproveOrderByUser = async (pageSize, pageIndex) => {
    try {
        const params = {};
        if (pageIndex !== undefined) {
            params.pageIndex = pageIndex;
        }
        if (pageSize !== undefined) {
            params.pageSize = pageSize;
        }
        var result = await api.get('/Order/view-history-orders', { ...axiosConfigHeader, params: params });
        return result;
    } catch (error) {
        console.log('>>> Api Get Approve Order By User Error: ', error);
        return [];
    }
}
const UpdateStatusInOrder = async (orderId, status) => {
    try {
        const payload = { status };
        var result = await api.put(`/Order/${orderId}`, payload, axiosConfigHeader)
        if (result.status === 200) {
            return result;
        }
    } catch (error) {
        console.log('>>> Api Set Update status in order By User Error: ', error);
        return [];
    }
}

const GetPendingOrderByUser = async (pageSize, pageIndex, searchKeyWords, orderBy) => {
    try {
        const params = {};
        if (pageIndex !== undefined) {
            params.pageIndex = pageIndex;
        }
        if (pageSize !== undefined) {
            params.pageSize = pageSize;
        }
        if (searchKeyWords !== undefined) {
            params.searchKeyWords = searchKeyWords;
        }
        params.orderBy = orderBy;
        var result = await api.get('/TempCampaignBulkOrder/view-history-temp-orders', { ...axiosConfigHeader, params: params });
        if (result.status === 200) {
            return result;
        }
    } catch (error) {
        console.log('>>> Api Get Pending Order By User Error: ', error);
        return [];
    }
}

export { GetAllOrder, GetOrderById, GetApproveOrderByUser, GetPendingOrderByUser, GetTempOrderById, UpdateStatusInOrder, GetOrderByIdForStaff }

