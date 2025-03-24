import { Link, Outlet } from "react-router";


function Wallet() {
   return (
      <>
         <div className='flex items-center flex-col w-full pt-[2rem] bg-[#f7f7f7]'>
            <div className='border-[#EAECEF] border-solid border-b-[2px] max-w-[1200px] items-center justify-between flex w-full h-[40px] '>
               <div className='gap-[24px] flex items-center justify-between'>
                  <Link to='/wallet' className='text-[16px] font-normal leading-[40px] px-[10px] py-[5px] cursor-pointer'>
                     Nạp tiền
                  </Link>
                  <Link to='/wallet/deposit' className='text-[16px] font-normal leading-[40px] px-[10px] py-[5px] cursor-pointer'>
                     Rút tiền
                  </Link>
                  <Link to='/wallet/deposit-history' className='text-[16px] font-normal leading-[40px] px-[10px] py-[5px] cursor-pointer'>
                     Lịch sử nạp tiền
                  </Link>
               </div>
            </div>
         </div>
         <div className="w-full min-h-[80vh] bg-[#f7f7f7]">
            <Outlet />
         </div>

      </>
   )
}

export default Wallet;