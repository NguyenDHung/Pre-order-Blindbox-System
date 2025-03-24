import axios from "axios";
import { GetAccessToken } from "./User/ApiAuthentication";

const api = axios.create({
   baseURL: import.meta.env.VITE_PREORDERBLINDBOX_API_URL
})
api.interceptors.request.use(
   (config) => {
      const accessToken = GetAccessToken();
      if (accessToken) {
         config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config
   },
   (error) => {
      return Promise.reject(error);
   }
)

export default api;