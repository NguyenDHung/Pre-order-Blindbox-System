import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ApiForgotPassword } from '../../api/User/ApiForgotPassword';

function ForgotPassword() {
   const navigate = useNavigate();

   const CallApiForgotPassword = async (payload) => {
      const response = await ApiForgotPassword({ payload });
      if (response.status === 200) {
         // Thông báo kiểm tra email và chuyển qua trang SendEmailForgotPassword
         toast.info('Vui lòng kiểm tra email của bạn!');
         navigate('/user-forget-password/verify-email', { state: { email: payload.email } });
      }
   }

   const onFinish = async (values) => {
      if (values) {
         CallApiForgotPassword(values);
      }
   }
   return (
      <div className="flex justify-center pt-[40px] bg-[#f3f5f5] justify-items-center h-[100vh]">
         <div>
            <div className="pt-[40px] bg-[#F3F5F5] justify-items-center justify-center flex ">
               <div className="w-[500px] relative p-[24px] rounded-[12px] bg-[#ffffff] shadow-[0_6px_20px_-8px_rgba(0,0,0,0.25)]">
                  {/* Logo */}
                  <div></div>
                  <div className="text-[20px] text-center font-normal">
                     <h1 className="text-[20px] font-bold text-[#23313E] mb-[10px] leading-[1.2]">
                        Quên mật khẩu/Xác thực tài khoản
                     </h1>
                  </div>
                  <p className="text-[14px] text-[#747373] mb-[25px]">
                     Nhập địa chỉ email đã khai báo trên tài khoản Pre-order Blindbox. Hệ thống sẽ gửi một Link kích hoạt/Khôi phục mật khẩu tới email của bạn.
                  </p>
                  <div>
                     <Form layout='vertical' onFinish={onFinish}>
                        <Form.Item
                           className='font-bold text-[14px] leading-[20px] text-[#111] '
                           label="Email tài khoản"
                           name="email"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please input your email address!',
                              },
                              {
                                 type: 'email',
                                 message: 'Invalid email'
                              }
                           ]}
                        >
                           <Input className='px-[10px] py-[10px] font-normal' />
                        </Form.Item>

                        <div className='flex w-full justify-between gap-3'>
                           <div className='w-[50%]'>
                              <Link to='/login'>
                                 <button className='cursor-pointer border-[1px] border-solid border-[#f47a20] rounded-[5px] text-[#f47a20] bg-[#ffffff] py-[8.5px] px-[14px] font-bold text-center w-full'>
                                    Quay lại
                                 </button>
                              </Link>
                           </div>

                           <Form.Item className='mb-0 w-[50%] '>
                              <Button className='h-full cursor-pointer border-[1px] border-solid border-[#f47a20] rounded-[5px] text-[#fff] bg-[#f47a20] hover:!bg-[#f47a20] py-[8.5px] px-[14px] font-bold text-center w-full' type="primary"
                                 htmlType='submit'
                              >
                                 Tiếp tục
                              </Button>
                           </Form.Item>
                        </div>
                     </Form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ForgotPassword;