import api from '../instance.jsx'
import { axiosConfigHeader } from '../axiosConfigHeader.jsx'
import { jwtDecode } from 'jwt-decode'

const ApiLoginByEmailAndPassword = async ({ payload }) => {
   try {
      const result = await api.post('/Authen/login', payload)
      if (result.status === 200) {
         const decodedToken = jwtDecode(result.data.accessToken)
         const maxAge = decodedToken.exp - Math.floor(Date.now() / 1000);
         document.cookie = `auth=${JSON.stringify(result.data)}; path=/; max-age=${maxAge}`;
      }
      return result
   } catch (error) {
      console.log('>>> Api login by email and password error: ', error)
   }
}

const ApiGetCurrentAccountRole = async () => {
   try {
      const result = await api.get('/Authen/CurrentAccountRole')
      if (result.status === 200) {
         return result.data
      }
   } catch (error) {
      console.log('>>> Api get current account role error: ', error)
   }
}

const ApiRegisterByEmailAndPassword = async ({ payload }) => {
   try {
      const result = await api.post('/Authen/RegisterCustomer', payload)
      if (result.status === 200) {
         return result
      }
   } catch (error) {
      console.log('>>> Api register by email and password error: ', error)
   }
}

const GetAccessToken = () => {
   const authCookie = document.cookie.split("; ").find(row => row.startsWith("auth="))
   return authCookie ? JSON.parse(authCookie.split("=")[1])?.accessToken : null
}

const ApiConfirmEmailAccount = async ({ confirmToken }) => {
   try {
      const result = await api.post('/Authen/confirm-email', null, {
         params: {
            confirmToken: confirmToken
         }
      })
      if (result.status === 200) {
         return result
      }
   } catch (error) {
      console.log('>>> Api confirm email account error: ', error)
   }
}

const GetInformationOfUser = async (userId) => {
   try {
      const result = await api.get(`/User/${userId}`, axiosConfigHeader)
      if (result.status === 200) {
         return result.data
      }
   } catch (error) {
      console.log('>>> Api get information of user error: ', error)
   }
}

const ApiLoginWithGoogle = async (credential) => {
   try {
      const result = await api.post('/Authen/LoginGoogle', `"${credential}"`, {
         headers: {
            'Content-Type': 'application/json'
         }
      })
      if (result.status === 200) {
         const decodedToken = jwtDecode(result.data.accessToken)
         const maxAge = decodedToken.exp - Math.floor(Date.now() / 1000);
         document.cookie = `auth=${JSON.stringify(result.data)}; path=/; max-age=${maxAge}`;
      }
      return result
   } catch (error) {
      console.log('>>> Api login with google error: ', error);

   }
}

const ApiUpdatePassword = async ({ payload }) => {
   try {
      const response = await api.post('/Authen/ChangePassword', payload)
      if (response?.status === 200) {
         return response
      }
   } catch (error) {
      console.log('>>> Api update password error: ', error);
   }
}

export {
   ApiLoginByEmailAndPassword, ApiGetCurrentAccountRole, GetAccessToken, ApiRegisterByEmailAndPassword
   , ApiConfirmEmailAccount, GetInformationOfUser, ApiLoginWithGoogle, ApiUpdatePassword
}