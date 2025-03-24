import api from "../instance";
import { axiosConfigHeader } from "../axiosConfigHeader";
const ApiGetWalletInfomation = async () => {
   try {
      const result = await api.get('/Wallet')
      if (result.status === 200) {
         return result.data;
      }
   } catch (error) {
      console.log('Api Get Wallet Infomation Error: ', error);
   }
}

const ApiDepositByMono = async ({ payload }) => {
   try {
      const response = await api.post('/Wallet/CreatePaymentUrlMomo', payload);
      if (response.status === 200) {
         return response.data;
      }
   } catch (error) {
      console.log('Api Deposit By Mono Error: ', error);
   }
}

const ApiDepositByVnpay = async ({ payload }) => {
   try {
      const response = await api.post('/Wallet/CreatePaymentUrlVnpay', payload);
      if (response.status === 200) {
         return response.data;
      }
   } catch (error) {
      console.log('Api Deposit By Vnpay Error: ', error);
   }
}

const ApiVerifyPaymentByMomo = async (queryString) => {
   try {
      const response = await api.get(`/Wallet/DepositConfirmFromMomo?${queryString}`);
      return response.data;
   } catch (error) {
      console.log('Api verify payment By Momo Error: ', error);
   }
}
const ApiVerifyPaymentByVnpay = async (queryString) => {
   try {
      const response = await api.get(`/Wallet/DepositConfirmFromVnPay?${queryString}`);
      return response.data;
   } catch (error) {
      console.log('Api verify payment By Vnpay Error: ', error);
   }
}

const GetWallet = async (accessToken) => {
   try {
      const result = await api.get('/Wallet', {
         ...axiosConfigHeader,
         headers: {
            "Authorization": `Bearer ${accessToken}`,
         }
      });
      return result.data;
   } catch (error) {
      console.log('>>> GetUserInformation error: ', error);
      return null;
   }
};

const GetTransactions = async (accessToken, Month, Year) => {
   try {
      const result = await api.get('/Wallet/transactions', {
         ...axiosConfigHeader,
         headers: {
            "Authorization": `Bearer ${accessToken}`,
         },
         params: {
            Month, Year
         }
      });
      return result.data;
   } catch (error) {
      console.log('>>> GetUserInformation error: ', error);
      return null;
   }
};


export {
   ApiGetWalletInfomation, ApiDepositByMono, ApiDepositByVnpay, ApiVerifyPaymentByMomo, ApiVerifyPaymentByVnpay,
   GetWallet, GetTransactions
}