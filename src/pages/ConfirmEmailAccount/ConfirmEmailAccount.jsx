import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';

import { ApiConfirmEmailAccount } from '../../api/User/ApiAuthentication';

function ConfirmEmailAccount() {
   const [searchParams] = useSearchParams();
   const token = searchParams.get('token');
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);

   const validateToken = (token) => {
      if (!token) {
         navigate('/');
      } else {
         setLoading(true);
      }
   }

   const CallApiConfirmEmailAccount = async (confirmToken) => {
      const result = await ApiConfirmEmailAccount({ confirmToken });
      if (result.status === 200) {
         // Thông báo xác nhận thành công

         navigate('/login');
      }
   }

   useEffect(() => {
      validateToken(token);
      CallApiConfirmEmailAccount(token);

   }, [])

   const customIcon = <LoadingOutlined style={{ fontSize: '6rem' }} spin />;

   return (
      (loading && <div className='w-[100vw] h-[100vh] flex items-center justify-center flex-col'>
         <div className='font-bold text-[3rem]'>
            Waiting for account confirmation
         </div>
         <div className='mt-[1rem]'>
            <Spin indicator={customIcon} size='large' />
         </div>
      </div>)
   )
}

export default ConfirmEmailAccount;