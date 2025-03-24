import api from '../instance';
import { axiosConfigHeader, axiosConfigSendFileHeader } from '../axiosConfigHeader';
import { toast } from "react-toastify";
const UpdateProfile = async ({ formData: payload }) => {
    try {
        const response = await api.put('/User/UpdateCustomerInformation', payload, axiosConfigSendFileHeader);
        return response.data;
    } catch (error) {
        console.log('>>> Cập nhật thông tin khách hàng thất bại: ', error);
        toast.error('Cập nhật thông tin khách hàng thất bại!');
    }
};

const GetUserInformation = async (accessToken) => {
    try {
        const result = await api.get('/User/user-information', {
            ...axiosConfigHeader,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        });
        return result.data; // Trả về dữ liệu người dùng
    } catch (error) {
        console.log('>>> GetUserInformation error: ', error);
        return null;
    }
};

export {
    UpdateProfile, GetUserInformation
}


