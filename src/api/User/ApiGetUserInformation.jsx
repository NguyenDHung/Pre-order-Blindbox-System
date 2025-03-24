import api from "../instance";

const ApiGetUserInFormation = async () => {
   try {
      const response = await api.get('/User/user-information')
      if (response?.status === 200) {
         return response?.data
      }
   } catch (error) {
      console.log('>>> Api get user information error: ', error);
   }
}

export { ApiGetUserInFormation }