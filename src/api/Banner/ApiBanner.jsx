import api from "../instance";
import { axiosConfigHeader, axiosConfigSendFileHeader } from "../axiosConfigHeader";
import { toast } from "react-toastify";

const GetAllBanner = async (pageSize, pageIndex) => {
    try {
        const response = await api.get("/Banner", {
            ...axiosConfigHeader, // Giữ nguyên cấu hình header
            params: { pageSize, pageIndex }, // Truyền pageSize và pageIndex vào params
        });
        const data = response.data;
        const paginationHeader = response.headers["x-pagination"]; // Chữ thường
        console.log("Pagination Header:", paginationHeader);

        const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;

        return { data, pagination };
    } catch (error) {
        console.log(">>> Api Get All Banner Error: ", error);
        toast.error("Get All banner failed!");

        return { data: [], pagination: null };
    }
};



const EditBanner = async ({ formData: payload, bannerId }) => {
    try {
        const respone = await api.put(`/Banner/${bannerId}`, payload, axiosConfigSendFileHeader);
        toast.success("Update successful!");
        return respone.data;
    } catch (error) {
        console.log('>>> Api Edit banner Error: ', error)
        toast.error("Update failed!");

    }
}

const CreateBanner = async ({ formData: payload }) => {
    try {
        const respone = await api.post('/Banner', payload, axiosConfigSendFileHeader);
        toast.success("Create successful!");
        return respone.data;
    } catch (error) {
        console.log('>>> Api create banner Error: ', error)
        toast.error("Create failed!");
    }
}

const GetActiveBanner = async (id) => {
    try {
        const response = await api.get(`/Banner/${id}`, axiosConfigHeader);
        return response.data;
    } catch (error) {
        console.log('>>> Api get active banner by id Error: ', error);
        toast.error("Get active banner by id failed!");
    }
};

const DeleteBlindBannerById = async (id) => {
    try {
        const respone = await api.delete(`/Banner/${id}`, axiosConfigHeader);
        toast.success("Delete success !");
        return respone.data;
    } catch (error) {
        console.log('>>> Api delete banner by id Error: ', error)
        toast.error("Delete active banner by id failed!");
    }
}

export { GetAllBanner, CreateBanner, EditBanner, GetActiveBanner, DeleteBlindBannerById };