import { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { formatMoney } from "../../utils/FormatMoney";
import { ApiGetWalletInfomation } from "../../api/Wallet/ApiWallet";
import { ApiGetUserInFormation } from "../../api/User/ApiGetUserInformation";
import { ApiWithdrawMoney } from "../../api/Transaction/ApiTransaction";

function Withdraw() {
   const [walletInfo, setWalletInfo] = useState();
   const [userData, setUserData] = useState();
   const [form] = Form.useForm();
   const [isLoading, setIsLoading] = useState(false)

   const CallApiGetWalletInfomation = async () => {
      const walletInfo = await ApiGetWalletInfomation();
      setWalletInfo(walletInfo);
   }

   const CallApiGetUserInFormation = async () => {
      const response = await ApiGetUserInFormation()
      setUserData(response)
   }

   const CallApiWithdrawMoney = async (payload) => {
      try {
         setIsLoading(true)
         const response = await ApiWithdrawMoney({ payload })
         if (response?.status === 200) {
            toast.success('Yêu cầu rút tiền đã được gửi')
            await CallApiGetWalletInfomation()
         } else {
            toast.error('Gửi yêu cầu rút tiền thất bại')
         }
      } catch (error) {
         toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
      } finally {
         setIsLoading(false)
      }

   }

   const onFinish = async (values) => {
      console.log(values);
      await CallApiWithdrawMoney(values)
   }

   const validateInputDeposit = (_, value) => {
      if (value < 10000) {
         return Promise.reject('Số tiền tối thiểu rút là 10,000 VND!');
      }
      return Promise.resolve();
   }

   useEffect(() => {
      CallApiGetWalletInfomation();
      CallApiGetUserInFormation();
   }, [])

   console.log('User: ', userData);


   return (
      <div className="w-full min-h-[90vh] bg-[#f7f7f7]">
         <div className="flex max-w-[1200px] mx-auto pt-[5rem] justify-between">
            {/* Thông tin về ví */}
            <div className="p-[20px] rounded-[10px] bg-[#ffffff] mt-[1rem] w-[33%]">
               <div className="flex items-center justify-between pb-[16px] pl-[10px] uppercase">
                  Ví của tôi
               </div>
               <div className="pb-[1rem] flex">
                  <div className="px-[10px] w-full">
                     <div className="text-[#747373] ">
                        Số dư tổng
                     </div>
                     <h5 className="mb-[0.5rem] font-normal leading-[1.2] text-[1.25rem] line-clamp-1">
                        {formatMoney(walletInfo?.balance)}
                     </h5>
                  </div>
               </div>
               <div className="py-[15px] border-solid border-t-[2px] border-t-[#dadada] bg-[#f7f7f7] mb-[1rem] text-[14px] font-normal text-[#212529] leading-[1.5]">
                  <div className="flex ">
                     <div className="px-[10px] w-[50%] text-[14px] text-[#212529] font-normal leading-[1.5]">
                        <div className="text-[#747373] ">
                           Số dư khả dụng
                        </div>
                        <h5 className="line-clamp-1 text-[1.25rem] mb-[0.5rem] font-normal leading-[1.2]">
                           {formatMoney(walletInfo?.balance)}
                        </h5>
                     </div>
                     <div className="hidden px-[10px] w-[50%] text-[14px] text-[#212529] font-normal leading-[1.5]">
                        <div className="text-[#747373] ">
                           Số tiền chờ hoàn
                        </div>
                        <h5 className="line-clamp-1 text-[1.25rem] mb-[0.5rem] font-normal leading-[1.2]">
                           100.000 đ
                        </h5>
                     </div>
                  </div>
               </div>
            </div>

            {/* Thông tin rút tiền */}
            <div className="rounded-[10px] bg-[#ffffff] mt-[1rem] w-[60%]">
               <div className="px-[28px] py-[24px] ">
                  <Form layout='vertical' form={form} onFinish={onFinish}>
                     <Form.Item
                        className='font-bold text-[16px] leading-[20px] text-[#111] mb-[10px]'
                        label={<span className='uppercase text-[16px]'>Số tiền rút</span>}
                        name="amount"
                        rules={[
                           {
                              required: true,
                              message: 'Vui lòng nhập số tiền hợp lệ!',
                           },
                           {
                              validator: validateInputDeposit
                           }
                        ]}
                     >
                        <Input type='number' className='px-[22px] py-[14px] font-normal'
                           style={{ fontSize: '16px' }} />
                     </Form.Item>


                     <Form.Item className='mb-0 '>
                        <Button className='bg-[#f47a20] mt-[1rem] h-[50px] py-[15px] px-[22px] flex items-center justify-center text-[16px] font-bold leading-[20px] w-full' type="primary"
                           htmlType='submit' disabled={isLoading || userData?.bankName == undefined || userData?.bankName == '' || userData?.bankAccountNumber == undefined || userData?.bankAccountNumber == ''}
                           loading={isLoading}
                        >
                           Yêu cầu rút tiền
                        </Button>
                     </Form.Item>

                  </Form>

                  {userData?.bankName == undefined || userData?.bankName == '' || userData?.bankAccountNumber == undefined || userData?.bankAccountNumber == '' ? (
                     <div className="mt-[15px]">
                        <h1 className="text-[16px]">
                           Bạn cần cập nhật thông tin tài khoản ngân hàng.
                           <Link to='/profile'>
                              <span className="cursor-pointer text-[red]"> Cập nhật ngay</span>
                           </Link>
                        </h1>
                     </div>
                  ) : (
                     <div></div>
                  )}

               </div>
            </div>
         </div>
      </div >
   )
}

export default Withdraw;