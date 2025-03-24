import api from '../instance';
import { axiosConfigHeader } from '../axiosConfigHeader';
import { toast } from "react-toastify";
const GetTheActiveVoucherCampaignBaseUser = async () => {
   try {
      const respone = await api.get('/VoucherCampaign/GetAllVoucherCampaignBaseUser', axiosConfigHeader);
      return respone.data;
   } catch (error) {
      console.log('>>> Api Get Active voucher campaign Error: ', error)
   }
}

const CollectActiveVoucherCampaign = async (voucherCampaignId) => {
   try {
      const respone = await api.post('/UserVouchers', { voucherCampaignId }, axiosConfigHeader);
      return respone.data;
   } catch (error) {
      console.log('>>> Api Collect Active voucher campaign Error: ', error)
   }
}
const CreateVoucher = async (payload) => {
   try {
      const response = await api.post('/VoucherCampaign', payload, axiosConfigHeader);
      return response.data;
   } catch (error) {
      console.log('>>> Api create voucher Error: ', error);
   }
};

const UpdateVoucher = async (voucherCampaignId, payload) => {
   try {
      const response = await api.put(`/VoucherCampaign/${voucherCampaignId}`, payload, axiosConfigHeader);
      return response.data;
   } catch (error) {
      console.log('>>> Api update  voucher Error: ', error);
   }
};

const GetTheActiveVoucherCampaign = async () => {
   try {
      const respone = await api.get('/VoucherCampaign/GetAllVoucherCampaign', axiosConfigHeader);
      return respone.data;
   } catch (error) {
      console.log('>>> Api Get Active voucher campaign Error: ', error)
   }
}

const GetTheActiveVoucherCampaignByID = async (voucherCampaignId) => {
   try {
      const respone = await api.get(`/VoucherCampaign/${voucherCampaignId}`, axiosConfigHeader);
      return respone.data;
   } catch (error) {
      console.log('>>> Api Get Active voucher campaign Error: ', error)
   }
}

const DeleteVoucher = async (voucherCampaignId) => {
   try {
      const respone = await api.delete(`/VoucherCampaign/${voucherCampaignId}`, axiosConfigHeader);
      return respone.data;
   } catch (error) {
      console.log('>>> Api Delete voucher campaign Error: ', error)
   }
}

export {
   GetTheActiveVoucherCampaignBaseUser, CollectActiveVoucherCampaign, CreateVoucher,
   UpdateVoucher, GetTheActiveVoucherCampaign, GetTheActiveVoucherCampaignByID,
   DeleteVoucher
}