import { Button, Form, Input } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

import IconMail from '../../assets/ForgotPassword/IconMail.svg'
import { ApiCreateNewPassword } from '../../api/User/ApiForgotPassword';

function AddNewPassword() {

   const [form] = Form.useForm();
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();

   const [dataNewPassword, setDataNewPassword] = useState({
      newPassword: '',
      confirmNewPassword: '',
      forgotPasswordToken: searchParams.get('token'),
      email: searchParams.get('email')
   });

   console.log('Check: ', dataNewPassword);

   const CallApiCreateNewPassword = async (payload) => {
      const response = await ApiCreateNewPassword({ payload });
      if (response.status === 200) {
         // Thông báo mật khẩu mới đã được cập nhật chuyển về trang login
         toast.info('Mật khẩu mới đã được cập nhật!');
         navigate('/login');
      }
   }

   const validateConfirmPassword = (_, value) => {
      if (!value || form.getFieldValue('password') === value) {
         return Promise.resolve();
      }
      return Promise.reject('Confirm password not match!');
   }

   const onFinish = async () => {
      console.log(dataNewPassword);
      await CallApiCreateNewPassword(dataNewPassword);
   }

   return (
      <div className="flex justify-center pt-[40px] bg-[#f3f5f5] justify-items-center h-[100vh]">
         <div>
            <div className="pt-[40px] bg-[#F3F5F5] justify-items-center justify-center flex ">
               <div className="w-[500px] relative p-[24px] rounded-[12px] bg-[#ffffff] shadow-[0_6px_20px_-8px_rgba(0,0,0,0.25)]">
                  <div className="text-[20px] text-center ">
                     <span className='w-[100px] h-[100px] my-[30px] inline-block text-[20px]'>
                        <img className='inline w-full mx-auto align-middle' src={IconMail} alt="Email icon" />
                     </span>
                     <h1 className='text-[20px] font-bold text-[#23313E] mb-[20px] leading-[1.2]'>
                        Khai báo mật khẩu đăng nhập mới
                     </h1>
                     <p></p>
                  </div>
                  {/* Form */}
                  <div>
                     <Form form={form} layout='vertical' onFinish={onFinish}>
                        <Form.Item
                           className='font-bold text-[14px] leading-[1.5] text-[#747373] '
                           label="Mật khẩu đăng nhập mới"
                           name="password"
                           rules={[
                              {
                                 required: true,
                                 message: 'Vui lòng nhập mật khẩu mới!',
                              }
                           ]}
                        >
                           <Input className='px-[10px] py-[10px] font-normal'
                              onChange={(e) =>
                                 setDataNewPassword((prev) => ({
                                    ...prev,
                                    newPassword: e.target.value,
                                 }))
                              } />
                        </Form.Item>

                        <Form.Item
                           className='font-bold text-[14px] leading-[1.5] text-[#747373] '
                           label="Nhập lại mật khẩu"
                           name="confirmPassword"
                           dependencies={['password']}
                           rules={[
                              {
                                 required: true,
                                 message: 'Vui lòng nhập lại mật khẩu!',
                              }, {
                                 validator: validateConfirmPassword
                              }
                           ]}
                        >
                           <Input className='px-[10px] py-[10px] font-normal'
                              onChange={(e) =>
                                 setDataNewPassword((prev) => ({
                                    ...prev,
                                    confirmNewPassword: e.target.value,
                                 }))
                              }
                           />
                        </Form.Item>

                        <Form.Item className='mb-0'>
                           <Button className='h-full cursor-pointer border-[1px] border-solid border-[#f47a20] rounded-[5px] text-[#fff] bg-[#f47a20] hover:!bg-[#f47a20] py-[8.5px] px-[14px] font-bold text-center w-full' type="primary"
                              htmlType='submit'
                           >
                              Hoàn tất
                           </Button>
                        </Form.Item>
                     </Form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default AddNewPassword;   