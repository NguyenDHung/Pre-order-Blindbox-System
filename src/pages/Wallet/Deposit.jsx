import { Button, Form, Input, InputNumber, Radio } from 'antd';
import { useEffect, useState } from 'react';

import MomoImage from '../../assets/Wallet/momo.webp';
import VnpayImage from '../../assets/Wallet/vnpay.webp';
import { ApiDepositByVnpay, ApiGetWalletInfomation, ApiDepositByMono } from '../../api/Wallet/ApiWallet';
import { formatMoney } from '../../utils/FormatMoney';

function DepositPage() {
   const [form] = Form.useForm();
   const [walletInfo, setWalletInfo] = useState();

   const CallApiDepositByVnpay = async (data) => {
      const payload = {
         amount: data
      }
      const response = await ApiDepositByVnpay({ payload });
      window.location.href = response;
   }

   const CallApiDepositByMono = async (data) => {
      const payload = {
         amount: data
      }
      const response = await ApiDepositByMono({ payload });
      window.location.href = response;
   }

   const CallApiGetWalletInfomation = async () => {
      const walletInfo = await ApiGetWalletInfomation();
      setWalletInfo(walletInfo);
   }

   const onFinish = async (values) => {
      console.log(values);
      if (values.method === 'momo') {
         CallApiDepositByMono(values.amount);
      } else if (values.method === 'vnpay') {
         CallApiDepositByVnpay(values.amount);
      }
   }

   const validateInputDeposit = (_, value) => {
      if (value < 10000) {
         return Promise.reject('Số tiền tối thiểu nạp là 10,000 VND!');
      }
      return Promise.resolve();
   }

   useEffect(() => {
      CallApiGetWalletInfomation();
   }, [])

   console.log(walletInfo);


   return (
      <>
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
               {/* Input nạp tiền */}
               <div className="rounded-[10px] bg-[#ffffff] mt-[1rem] w-[60%]">
                  <div className="px-[28px] py-[24px] ">
                     <Form layout='vertical' form={form} onFinish={onFinish}>
                        <Form.Item
                           className='font-bold text-[16px] leading-[20px] text-[#111] mb-[10px]'
                           label={<span className='uppercase text-[16px]'>Số tiền nạp</span>}
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

                        <Form.Item name="method" label={<span className='uppercase text-[16px] font-bold'>Phương thức nạp tiền</span>}
                           className='mt-[2rem] font-bold'
                           rules={[
                              {
                                 required: true,
                                 message: 'Vui lòng chọn phương thức thanh toán!',
                              }
                           ]}
                        >
                           <Radio.Group className='flex gap-6'>
                              <Radio.Button value="momo" className='flex items-center justify-center w-[5rem] h-[4rem] border border-gray-300 rounded-lg'>
                                 <img className='w-[4rem] h-[4rem] object-contain' src={MomoImage} alt="Hinh logo momo" />
                              </Radio.Button>
                              <Radio.Button value="vnpay" className='flex items-center justify-center w-[5rem] h-[4rem] border border-gray-300 rounded-lg'>
                                 <img className='w-[4rem] h-[4rem] object-contain' src={VnpayImage} alt="Hinh logo vnpay" />
                              </Radio.Button>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item className='mb-0 '>
                           <Button className='bg-[#f47a20] mt-[1rem] h-[50px] py-[15px] px-[22px] flex items-center justify-center text-[16px] font-bold leading-[20px] w-full' type="primary"
                              htmlType='submit'
                           >
                              Nạp tiền vào ví
                           </Button>
                        </Form.Item>

                     </Form>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default DepositPage;