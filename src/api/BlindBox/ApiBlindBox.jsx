import api from "../instance";
import { axiosConfigHeader, axiosConfigSendFileHeader } from "../axiosConfigHeader";
import { toast } from "react-toastify";

const GetTheActiveBlindBox = async (pageSize, pageIndex, keyword = "") => {
  try {
    const response = await api.get("/BlindBox",  {
      ...axiosConfigHeader, // Giữ nguyên cấu hình header
      params: { pageSize, pageIndex,keyword}, // Truyền pageSize và pageIndex vào params
    });
    const data = response.data;
    const paginationHeader = response.headers["x-pagination"]; // Chữ thường
    console.log("Pagination Header:", paginationHeader);
    
    const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;

    return {data, pagination};
  } catch (error) {
    console.log(">>> Api Get Active Blind box Error: ", error);
    toast.error("Get active blind box failed!");

    return { data: [], pagination: null };
  }
};

 const CreateBlindBox = async({ formData: payload})=>{
   try {
      const respone = await api.post('/BlindBox', payload, axiosConfigSendFileHeader);
      toast.success("Create successful!");
      return respone.data;
   } catch (error) {
      console.log('>>> Api create blind box Error: ', error)
      toast.error("Create failed!");
   }
 }
 const EditBlindBox = async({ formData: payload, id})=>{
  try {
     const respone = await api.put(`/BlindBox/${id}`, payload, axiosConfigSendFileHeader);
     toast.success("Update successful!");
     return respone.data;
  } catch (error) {
     console.log('>>> Api Edit blind box Error: ', error)
     toast.error("Update failed!");

  }
}
const GetActiveBlindBoxById = async(id)=>{
  try{
    const respone = await api.get(`/BlindBox/${id}`, axiosConfigHeader);
    return respone.data;
  }catch(error){
    console.log('>>> Api get active blind box by id Error: ', error)
    toast.error("Get active blind box by id failed!");
  }
}
const DeleteBlindBoxById = async(id)=>{
  try{
    const respone = await api.delete(`/BlindBox/${id}`, axiosConfigHeader);
    toast.success("Delete success !");
    return respone.data;
  }catch(error){
    console.log('>>> Api delete blind box by id Error: ', error)
    toast.error("Delete active blind box by id failed!");
  }
}
export { GetTheActiveBlindBox, CreateBlindBox, EditBlindBox, GetActiveBlindBoxById, DeleteBlindBoxById};
