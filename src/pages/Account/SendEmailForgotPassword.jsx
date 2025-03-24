import { useLocation } from 'react-router-dom';
import IconMail from '../../assets/ForgotPassword/IconMail.svg'
import { toast } from 'react-toastify';

import { ApiForgotPassword } from '../../api/User/ApiForgotPassword';

function SendEmailForgotPassword() {
   const location = useLocation();
   const { email } = location?.state || {};

   const CallApiForgotPassword = async (payload) => {
      const response = await ApiForgotPassword({ payload });
      if (response.status === 200) {
         // Thông báo kiểm tra email 
         toast.info('Vui lòng kiểm tra email của bạn!');
      }
   }

   const handleResendEmail = async () => {
      if (email) {
         const payload = { email: email }
         CallApiForgotPassword(payload);
      }
   }

   console.log('Check email: ', email);


   return (
      <div className="flex justify-center pt-[40px] bg-[#f3f5f5] justify-items-center h-[100vh]">
         <div>
            <div className="pt-[40px] bg-[#F3F5F5] justify-items-center justify-center flex ">
               <div className="w-[500px] relative p-[24px] rounded-[12px] bg-[#ffffff] shadow-[0_6px_20px_-8px_rgba(0,0,0,0.25)]">
                  <div className="text-[20px] text-center font-normal leading-[1.5] text-[#212529]">
                     <span className='w-[100px] h-[100px] my-[30px] inline-block text-[20px]'>
                        <img className='inline w-full mx-auto align-middle' src={IconMail} alt="Email icon" />
                     </span>
                     <h1 className='text-[20px] font-bold text-[#23313E] mb-[20px] leading-[1.2]'>
                        Quên mật khẩu đăng nhập
                     </h1>
                     <p className='text-[14px] text-[#747373] mb-[25px]'>
                        Đường link kích hoạt/Khôi phục mật khẩu đã gửi tới Email {email || ''}. Vui lòng truy cập Hộp thư và bấm vào đường link để tiếp tục.
                     </p>
                  </div>
                  <div className='mb-[20px] py-[20px] bg-[#f7f7f7] text-center '>
                     <p className='text-[14px] text-[#747373] mb-[10px] '>
                        Bạn chưa nhận được email kích hoạt?
                     </p>
                     <div onClick={handleResendEmail} className={`${email == undefined ? 'cursor-not-allowed' : 'hover:text-[#fff] hover:bg-[#ed6500]'} w-[70%] mx-auto cursor-pointer text-[#ed6500] border-solid border-[1px] border-[#ed6500] text-[14px] leading-[21px] py-[10px] px-[15px] font-bold text-center align-middle rounded-[0.25rem]`}>
                        Gửi lại mail kích hoạt
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SendEmailForgotPassword;