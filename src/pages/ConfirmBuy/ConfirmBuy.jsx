import { WarningOutlined } from '@ant-design/icons';
import { data, Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ConfirmBuyBLock from "../../components/ConfirmBuy/ConfirmBuyBlock"
import { ApiGetPriceOrder, ApiOrderCampaign } from '../../api/CustomerOrder/ApiGetPriceOrder';
import { formatMoney } from '../../utils/FormatMoney';
import PreorderCampaignDetailService from '../../Services/SignalR/PreorderCampaignDetailService';

function ConfirmBuy() {
   const location = useLocation()
   const navigate = useNavigate()
   const [form] = Form.useForm()
   const buyData = location.state?.buyData
   const [loading, setLoading] = useState(false)

   const [formData, setFormData] = useState({
      receiver: '',
      phone: '',
      address: '',
   });
   const [orderData, setOrderData] = useState()
   const [caculateMoney, setCaculateMoney] = useState()

   const handleChange = (changedValues) => {
      setFormData((prevData) => ({
         ...prevData,
         ...changedValues,
      }));
   };

   const CaculateMoney = (data) => {
      let totalTemp = 0;
      let totalDiscount = 0;
      let totalMoney = 0;
      data?.forEach(item => {
         totalTemp += Number(item?.tempTotal)
         totalDiscount += Number(item?.discountMoney)
         totalMoney += Number(item?.total)
      })

      return { totalTemp, totalDiscount, totalMoney }
   }

   const CallApiGetPriceOrder = async () => {
      const response = await ApiGetPriceOrder({ buyData });
      if(response==null){
         toast.error('Lấy thông tin giỏ hàng thất bại!');
         navigate("/",{replace:true});
      }
      setOrderData(response)
      const result = CaculateMoney(response)
      setCaculateMoney(result)
   }

   const CallApiOrderCampaign = async (payload) => {
      const response = await ApiOrderCampaign({ payload })
      if (response?.status === 200) {
         // Chuyển trang và thông báo
         toast.success('Mua hàng thành công')
         navigate('/')
      } else {
         // Thông báo có thể là không đủ tiền
         toast.error('Tài khoản không đủ tiền')
      }
   }
   const CheckingNewOrderIsInCart = (idCampaign)=>{
      if(orderData!=null){
        for(let i=0; i<orderData.length; i++){
          if(orderData[i].responseCarts[0].preorderCampaignId===idCampaign){
            return true;
          }
        }
      }
      return false;
    }
   useEffect(()=>{
      console.log(orderData);
      if(orderData!=null){
            PreorderCampaignDetailService.startConnection().then(() => {
              PreorderCampaignDetailService.joinGroup("Cart_Preordercampaign");
            });
            PreorderCampaignDetailService.addMessageListener((message)=>{
              console.log(message)
            })
            PreorderCampaignDetailService.addOrderCartPageListener((preorderCampaginUpdate) => {
              console.log(preorderCampaginUpdate);
              if(CheckingNewOrderIsInCart(preorderCampaginUpdate)){
               CallApiGetPriceOrder();
              };
            });
        
            return () => {
              PreorderCampaignDetailService.leaveGroup("Cart_Preordercampaign");
            };
      }
   },[orderData])

   const handleConfirmBuy = async () => {
      setLoading(true)
      try {
         const values = await form.validateFields();

         const payload = {
            userVoucherIdForPreorderCampaign: {
               ...buyData?.Voucher
            },
            receiverName: formData?.receiver,
            receiverPhone: formData?.phone,
            receiverAddress: formData?.address,
            requestCreateCart: {
               preorderCampaignId: buyData?.PreorderCampaignId,
               quantity: buyData?.Quantity
            }
         }
         await CallApiOrderCampaign(payload)

      } catch (error) {
         console.error("Order failed:", error);
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      if (!buyData) {
         navigate('/')
      } else {
         CallApiGetPriceOrder()
      }
   }, [buyData, navigate])

   return (
      <div>
         {/* Header */}
         <div>
            <div className="z-50 h-[4.5rem] bg-[#fff] flex shadow-[0_2px_4px_rgba(6,17,118,0.08),0_4px_12px_rgba(6,17,118,0.08)] justify-between items-center px-[2.4rem] relative">
               <a href="">
                  <img src="" alt="" />
               </a>
               <Link to='/'>
                  <button className="bg-transparent">
                     <span className="font-bold text-[18px]">Hủy</span>
                  </button>
               </Link>
            </div>
         </div>
         <div className="flex min-w-full min-h-full absolute bg-[linear-gradient(90deg,transparent_60%,#f6f7f9_40%)]">
            <div className="flex mx-auto w-[70rem]">
               {/* Bên trái */}
               <div className="max-w-[40rem] pl-[24px] pr-[48px] bg-[#fff] min-w-[37rem]">
                  <h1 className="my-[1.5rem] font-bold text-[20px]">
                     Thanh toán
                  </h1>
                  {/* Thông tin thanh toán */}
                  <div className="flex flex-col mb-[1.3rem] ">
                     <h1 className="mb-[1rem] font-bold text-[20px]">
                        Địa chỉ nhận hàng
                     </h1>
                     <Form
                        layout="vertical"
                        onValuesChange={handleChange}
                        initialValues={formData}
                        form={form}
                     >
                        <Form.Item
                           label={<span className='text-[16px]'>Người nhận</span>}
                           name="receiver"
                           rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]}
                        >
                           <Input className='text-[16px]' placeholder="Nhập tên người nhận" />
                        </Form.Item>

                        <Form.Item
                           label={<span className='text-[16px]'>Số điện thoại</span>}
                           name="phone"
                           rules={[
                              { required: true, message: 'Vui lòng nhập số điện thoại!' },
                              { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
                           ]}
                        >
                           <Input className='text-[16px]' placeholder="Nhập số điện thoại" />
                        </Form.Item>

                        <Form.Item
                           label={<span className='text-[16px]'>Địa chỉ</span>}
                           name="address"
                           rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                        >
                           <Input.TextArea className='text-[16px]' rows={3} placeholder="Nhập địa chỉ giao hàng" />
                        </Form.Item>
                     </Form>
                  </div>

                  {/* Thông tin đơn hàng */}
                  <div className="flex flex-col mb-[1.3rem] ">
                     <h1 className="mb-[1rem] font-bold text-[20px]">
                        Thông tin đặt hàng
                     </h1>

                     {
                        orderData?.map((item, index) => {
                           return (
                              <ConfirmBuyBLock key={index} data={item} />
                           )
                        })
                     }

                  </div>
               </div>

               {/* Bên phải */}
               <div className="bg-[#f6f7f9]">
                  <div className="w-[22rem] pl-[48px] pr-[32px] mt-[4.6rem] text-[#303141] ">
                     {/* Thông tin tổng quát */}
                     <div>
                        <h2 className="mb-[1rem] text-[20px] align-middle w-full font-bold leading-[1.2]">
                           Tóm tắt đơn đặt hàng
                        </h2>
                        <div className="flex mb-[0.5rem] font-normal ">
                           <span className="flex-1">
                              Giá gốc:
                           </span>
                           <span>
                              {formatMoney(caculateMoney?.totalTemp)}
                           </span>
                        </div>
                        <div className="flex mb-[0.5rem] font-normal ">
                           <span className="flex-1">
                              Tổng giảm:
                           </span>
                           <span>
                              ({formatMoney(caculateMoney?.totalDiscount)})
                           </span>
                        </div>

                        <div className="border-[1px] border-[#d1d2e0] mb-[0.5rem]"></div>

                        <div className="flex mb-[0.5rem] font-normal ">
                           <span className="flex-1 font-bold">
                              Tổng tiền:
                           </span>
                           <span className="font-bold">
                              {formatMoney(caculateMoney?.totalMoney)}
                           </span>
                        </div>
                     </div>

                     {/* Xác nhận thanh toán */}
                     <div className="flex flex-col my-[2rem]">
                        <div className="text-center text-[red] mb-[0.5rem]">
                           <p>
                              <WarningOutlined /> Đơn hàng không thể hủy sau khi thanh toán
                           </p>
                        </div>

                        <div className="mb-[0.5rem] w-full">
                           <button onClick={handleConfirmBuy} disabled={loading} className={`${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FFDE50]'} h-[45px] inline-flex px-[0.8rem] w-full items-center justify-center align-bottom min-w-[5rem]  text-[#000] rounded-full`}>
                              <span className="text-[20px] font-bold">
                                 {loading ? 'Đang xử lý...' : 'Thanh toán'}
                              </span>
                           </button>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ConfirmBuy