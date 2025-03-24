import { toast } from "react-toastify";
import api from "../instance";
import { axiosConfigHeader } from "../axiosConfigHeader";
import { message } from "antd";

const GetTheWithdrawTransactionRequest = async (pageSize, pageIndex) => {
    try {
        const response = await api.get("/Transaction/withdrawals", {
            ...axiosConfigHeader,
            params: { pageSize, pageIndex },
        });
        const data = response.data;
        const paginationHeader = response.headers["x-pagination"];
        const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;

        return { data, pagination };
    } catch (error) {
        console.log(">>> Api Get Withdraw Transaction Request Error: ", error);
        toast.error("Get Withdraw Transaction list failed!");

        return { data: [], pagination: null };
    }
};
const GetWithdrawTransactionDetailRequest = async (transactionId) => {
    try {
        const response = await api.get(`/Transaction/withdrawals/${transactionId}`, axiosConfigHeader);
        return response.data;
    } catch (error) {
        console.log('>>> Api get detail withdraw transaction by id Error: ', error);
        toast.error("Get detail withdraw transaction by id failed!");
    }
}
const ApproveWithdrawTransactionRequest = async (transactionId) => {
    try {
        const response = await api.post(`/Transaction/withdrawals/${transactionId}/approval`, axiosConfigHeader);
        message.success("Chấp nhận rút tiền thành công");
        return response.data;
    } catch (error) {
        console.log('>>> Api approve withdraw transaction by id Error: ', error);
        toast.error("Approve withdraw transaction by id failed!");
    }
}
const GetListOfAllTransaction = async (accessToken, { Type, FromDate, EndDate, PageIndex, PageSize }) => {
    try {
        if (PageIndex === undefined || PageSize === undefined) {
            throw new Error("PaginationParameter is required");
        }
        // Chỉ thêm vào params nếu có giá trị

        let params = {
            "PaginationParameter.PageIndex": PageIndex,
            "PaginationParameter.PageSize": PageSize
        };
        if (Type) params["Type"] = Type;
        if (FromDate) params["FromDate"] = FromDate;
        if (EndDate) params["EndDate"] = EndDate;
        const response = await api.get('/Transaction/GetListOfAllTransaction', {
            ...axiosConfigHeader,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
            params: params,
            paramsSerializer: (params) => {
                return new URLSearchParams(params).toString();
            }
        });

        const data = response.data;
        const paginationHeader = response.headers["x-pagination"];
        console.log("Pagination Header:", paginationHeader);

        const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;

        return { data, pagination };
    } catch (error) {
        console.log('>>> Lấy danh sách giao dịch thất bại: ', error);
        return null;
    }
};

const ApiWithdrawMoney = async ({ payload }) => {
    try {
        const response = await api.post('/Transaction/withdrawals', payload)
        if (response?.status === 200) {
            return response
        }
    } catch (error) {
        console.log('>>> APi Withdraw Money Error: ', error)
    }
}

const GetListOfAllTransactionByUser = async (accessToken, PageIndex, PageSize) => {
    try {
        const response = await api.get('/Transaction/GetListOfAllTransactionByUser',

            {
                ...axiosConfigHeader,
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
                params: { PageIndex, PageSize },
                paramsSerializer: (params) => {
                    return new URLSearchParams(params).toString();
                }
            }
        );
        const data = response.data;
        const paginationHeader = response.headers["x-pagination"];
        console.log("Pagination Header:", paginationHeader);

        const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;

        return { data, pagination };
    } catch (error) {
        console.log('>>> Lấy danh sách giao dịch của khacsk hàng thất bại: ', error);
        return null;
    }
}

const GetTransactionDetailVerifyUserPayment = async (accessToken, transactionId) => {
    try {
        const response = await api.get("/Transaction/GetTransactionDetailVerifyUserPayment",

            {
                ...axiosConfigHeader,
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
                params: { transactionId },
                paramsSerializer: (params) => {
                    return new URLSearchParams(params).toString();
                }
            }
        );
        const data = response.data;
        console.log("fetch data:", data);
        return data;
    } catch (error) {
        console.log('>>> Lấy danh sách giao dịch của khách hàng thất bại: ', error);
        return null;
    }
}

export {
    GetTheWithdrawTransactionRequest, GetWithdrawTransactionDetailRequest, ApproveWithdrawTransactionRequest
    , GetListOfAllTransaction, ApiWithdrawMoney, GetListOfAllTransactionByUser,
    GetTransactionDetailVerifyUserPayment
};