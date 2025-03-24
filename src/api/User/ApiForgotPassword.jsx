import api from "../instance";

const ApiForgotPassword = async ({ payload }) => {
   try {
      const result = await api.post('/Authen/ForgotPassword', payload);
      if (result.status === 200) {
         return result
      }
   } catch (error) {
      console.log('>>> Api Forgot Password Error ', error);
   }
}

const ApiCreateNewPassword = async ({ payload }) => {
   try {
      const result = await api.post('/Authen/AddNewPassword', payload);
      if (result.status === 200) {
         return result
      }
   } catch (error) {
      console.log('>>> Api Create New Password Error ', error);
   }
}

export { ApiForgotPassword, ApiCreateNewPassword }