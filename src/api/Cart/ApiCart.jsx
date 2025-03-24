import api from '../instance';
import { axiosConfigHeader } from '../axiosConfigHeader';
import { toast } from 'react-toastify';

const GetAllCart = async () => {
  try {
    var result = await api.get('/Cart', axiosConfigHeader);
    if (result.status === 200) {
      return result.data;
    }
  } catch (error) {
    console.log('>>> Api Get All Order Error: ', error);
    return [];
  }

}

const GetPriceInCart = async (requestCreateCart = {}, userVoucherDict = {}) => {
  // Chuyển các key của userVoucherDict từ chuỗi sang số
  const numericVoucherDict = Object.keys(userVoucherDict || {}).reduce((acc, key) => {
    acc[Number(key)] = userVoucherDict[key];
    return acc;
  }, {});
  try {
    const result = await api.post('/Cart/GetPriceInCart', numericVoucherDict, {
      ...axiosConfigHeader,
      params: requestCreateCart,
    });
    if (result.status === 200) {
      return result.data;
    }
  } catch (error) {
    console.error('>>> Api GetPriceInCart Error: ', error);
    toast.error(error?.response?.data?.message);
    return []; // Trả về mảng rỗng để tránh lỗi khi sử dụng .map()
  }
};

// API cập nhật số lượng trong giỏ hàng
const UpdateQuantityInCart = async (requestCreateCart) => {
  try {
    const result = await api.put('/Cart', requestCreateCart, axiosConfigHeader);
    if (result.status === 200) {
      return result.data;
    }
  } catch (error) {
    console.error('>>> API UpdateQuantityInCart Error: ', error);
    toast.error(error?.response?.data?.message);
    throw error;
  }
};

// Hàm gọi API ClearAllCart
const ClearAllCart = async () => {
    try {
      const result = await api.put('/Cart/ClearAllCart', null, axiosConfigHeader);
      if (result.status === 200) {
        return result;
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  };

const ApiCreateCart = async ({payload}) => {
  try{
    const result = await  api.post('/Cart',payload)
    if(result?.status === 200){
      return result
    }
  }catch(error){
    console.log('Api Create Cart Error: ', error);
  }
}

export { GetAllCart, GetPriceInCart, UpdateQuantityInCart, ClearAllCart, ApiCreateCart }