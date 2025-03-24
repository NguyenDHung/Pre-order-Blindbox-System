import { Form, Input, Button } from "antd";
import { toast } from "react-toastify";

import { ApiUpdatePassword } from "../../api/User/ApiAuthentication";
import { ApiGetUserInFormation } from "../../api/User/ApiGetUserInformation";
import { useEffect, useState } from "react";

function UpdatePassword() {
   const [form] = Form.useForm();
   const [userData, setUserData] = useState()

   const onFinish = async (values) => {
      await CallApiUpdatePassword(values)
   }

   const CallApiUpdatePassword = async (payload) => {
      const response = await ApiUpdatePassword({ payload })
      if (response?.status === 200) {
         toast.success('Đổi mật khẩu thành công')
         // Có thể đăng xuất hoặc dời về trang home
      } else {
         toast.error('Đổi mật khẩu thất bại')
      }
   }

   const CallApiGetUserInFormation = async () => {
      const response = await ApiGetUserInFormation()
      setUserData(response)
   }

   const validateConfirmPassword = (_, value) => {
      if (!value || form.getFieldValue('newPassword') === value) {
         return Promise.resolve();
      }
      return Promise.reject('Confirm password not match!');
   }

   useEffect(() => {
      CallApiGetUserInFormation()
   }, [])

   return (
      <div className="bg-gray-100 h-screen pt-[3%]">

         <div className="max-w-3xl mx-auto rounded-xl shadow-lg bg-[#fff]">
            <div className="py-[16px] border-solid border-b-[1px] border-[#d1d2e0]">
               <div className="max-w-[40rem] text-center mx-auto px-[24px] ">
                  <h1 className="font-bold leading-[1.2] text-[30px]">
                     Tài khoản
                  </h1>
                  <p className="mt-[8px] font-normal text-[18px]">
                     Thay đổi mật khẩu của bạn tại đây.
                  </p>
               </div>
            </div>

            <div className="py-[24px]">
               <div>
                  <div className="max-w-[40rem] mx-auto px-[24px]">
                     <label className="font-bold text-[16px] pb-[8px] inline-block">
                        Email:
                     </label>
                     <div className="border-[1px] border-[#9194ac] border-solid flex items-center h-[3rem] px-[16px] whitespace-nowrap">
                        <span className="font-normal text-[16px]">
                           Địa chỉ email của bạn là <b>{userData?.email}</b>
                        </span>
                     </div>
                  </div>
               </div>

               <div className="mt-[24px] pt-[24px] border-solid border-t-[1px] border-[#d1d2e0]">
                  <div className="max-w-[40rem] mx-auto px-[24px]">
                     {userData?.googleId == undefined ? (
                        <Form layout='vertical' form={form} onFinish={onFinish}>
                           <Form.Item
                              className='font-bold text-[14px] leading-[20px] text-[#111] mb-[10px]'
                              label={<span className="font-bold text-[16px]">Old password</span>}
                              name="oldPassword"
                              rules={[
                                 {
                                    required: true,
                                    message: 'Please input your password!',
                                 }
                              ]}
                           >
                              <Input.Password className='px-[22px] py-[14px] font-normal' />
                           </Form.Item>

                           <Form.Item
                              className='font-bold text-[14px] leading-[20px] text-[#111] mb-[10px]'
                              label={<span className="font-bold text-[16px]">New password</span>}
                              name="newPassword"
                              rules={[
                                 {
                                    required: true,
                                    message: 'Please input your password!',
                                 },
                                 {
                                    min: 6,
                                    message: 'Password must be at least 6 characters!'
                                 }
                              ]}
                           >
                              <Input.Password className='px-[22px] py-[14px] font-normal' />
                           </Form.Item>

                           <Form.Item
                              className='font-bold text-[14px] leading-[20px] text-[#111] mb-[10px]'
                              label={<span className="font-bold text-[16px]">Confirm new password</span>}
                              name="confirmNewPassword"
                              dependencies={['password']}
                              rules={[
                                 {
                                    required: true,
                                    message: 'Please input confirm password!',
                                 },
                                 {
                                    validator: validateConfirmPassword
                                 }
                              ]}
                           >
                              <Input.Password className='px-[22px] py-[14px] font-normal' />
                           </Form.Item>

                           <Form.Item className="mb-0">
                              <Button className='mt-[1rem] h-[50px] py-[15px] px-[22px] flex items-center justify-center text-[14px] font-bold leading-[20px] w-full' type="primary"
                                 htmlType='submit'
                              >
                                 Đổi mật khẩu
                              </Button>
                           </Form.Item>
                        </Form>
                     ) : (
                        <div>
                           <h1 className="font-bold leading-[1.2] text-[20px]">
                              Tài khoản của bạn không thể đổi mật khẩu
                           </h1>
                        </div>
                     )}

                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default UpdatePassword