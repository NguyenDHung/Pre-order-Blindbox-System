import api from "../instance";
import { axiosConfigHeader, axiosConfigSendFileHeader } from "../axiosConfigHeader";
import { toast } from "react-toastify";
import { notification } from "antd";

const GetTheActivePreorderCampaign = async (pageSize, pageIndex) => {
    try {
        const response = await api.get("/PreorderCampaign", {
            ...axiosConfigHeader,
            params: { pageSize, pageIndex },
        });
        const data = response.data;
        const paginationHeader = response.headers["x-pagination"];
        console.log("Pagination Header:", paginationHeader);

        const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;

        return { data, pagination };
    } catch (error) {
        console.log(">>> Api Get Active Preorder Campaign Error: ", error);
        toast.error("Get active preorder campaign failed!");

        return { data: [], pagination: null };
    }
};

const CreatePreorderCampaign = async (payload) => {
    try {
        const response = await api.post('/PreorderCampaign/CreatePreorderCampaignWithMilestone', JSON.stringify(payload), axiosConfigHeader);
        toast.success("Create successful!");
        return true;
    } catch (error) {
        console.log('>>> Api create preorder campaign Error: ', error);
        toast.error("Create failed! "+ error);
        return false;
    }
};

const UpdatePreorderCampaign = async (id, payload) => {
    try {
        const response = await api.put(`/PreorderCampaign/UpdatePreorderCampaignWithMilestone/${id}`, payload, axiosConfigHeader);
        toast.success("Update successful!");
        return response.data;
    } catch (error) {
        console.log('>>> Api update  preorder campaign Error: ', error);
        toast.error("Update failed!");
    }
};

const GetActivePreorderCampaignById = async (id) => {
    try {
        const response = await api.get(`/PreorderCampaign/${id}`, axiosConfigHeader);
        return response.data;
    } catch (error) {
        console.log('>>> Api get active preorder campaign by id Error: ', error);
        toast.error("Get active preorder campaign by id failed!");
    }
};

const GetActivePreorderCampaignBySlug = async (slug) => {
    try {
        const respone = await api.get(`/PreorderCampaign/campaign/${slug}`, axiosConfigHeader);
        return respone.data;
    } catch (error) {
        console.log('>>> Api get active preorder campaign by id Error: ', error)
        toast.error("Get active preorder campaign by slug failed!");
    }
}

const DeletePendingCampaign = async(id)=>{
    try {

        const response = await api.delete(`/PreorderCampaign/${id}`, axiosConfigHeader);

        if (response.status === 200) {
            notification.success({
                message: "Success",
                description: "The campaign has been successfully deleted.",
            });
            return response.status;
        } else {
            throw new Error("Failed to delete campaign.");
        }
    } catch (error) {
        console.error("Error deleting Pre_orderCampaign:", error);
        notification.error({
            message: "Error",
            description: "Failed to delete the campaign.",
        });
    }
}

const GetActiveDetailPreorderCampaign = async (slug) => {
	try {
		const response = await api.get(`/PreorderCampaign/campaign/${slug}`, axiosConfigHeader);
		return response.data;
	} catch (error) {
		console.log('>>> Api Get Blind Box By ID Error: ', error);
        toast.error("Get active blind box by id failed!");
		return null;
	}
}
    const GetAllImagesByBlindBoxId = async (blindBoxId) => {
        try {
            const response = await api.get(`/Image/GetAllByBlindBoxId/${blindBoxId}`, axiosConfigHeader);
            return response.data;
        } catch (error) {
            console.log('>>> Api Get All Images By Blind Box ID Error: ', error);
            return [];
        }
};
const ApproveBulkOrderCampaign = async (tempCampaginId) => {
    try {
        const response = await api.post(`/TempCampaignBulkOrder/${tempCampaginId}/accept`,{

        }, axiosConfigHeader);
        toast.success("Approve successful!");
        return response.data;
    } catch (error) {
        console.log('>>> Api Approve campaign Error: ', error);
        toast.error("Approve failed!");
    }
};
const RejectBulkOrderCampaign = async (tempCampaginId) => {
    try {
        const response = await api.post(`/TempCampaignBulkOrder/${tempCampaginId}/reject`,{

        }, axiosConfigHeader);
        toast.success("Reject successful!");
        return response.data;
    } catch (error) {
        console.log('>>> Api reject campaign Error: ', error);
        toast.error("Reject failed!");
    }
};
const GetCompletedBulkOrderCampaign = async (pageSize, pageIndex) => {
    try {
        const respone = await api.get(`/PreorderCampaign/GetAllCompleteBulkCampaign`,{
            ...axiosConfigHeader,
            params: { pageSize, pageIndex },
        });
        return respone.data;
    } catch (error) {
        console.log('>>> Api Get Completed Bulk order Campaign Error: ', error)
        toast.error("Get Completed Bulk order campaign failed!");
    }
}

export {
    GetTheActivePreorderCampaign, CreatePreorderCampaign,
    UpdatePreorderCampaign, GetActivePreorderCampaignBySlug, GetActivePreorderCampaignById, GetActiveDetailPreorderCampaign,
    GetAllImagesByBlindBoxId, DeletePendingCampaign,ApproveBulkOrderCampaign, RejectBulkOrderCampaign, GetCompletedBulkOrderCampaign};

