import { useEffect, useState } from 'react';

import FakeImage from '../../../assets/BulkOrder/FakeImage.webp'
import Bell from '../../../assets/BulkOrder/bell.png'
import ImportantIcon from '../../../assets/BulkOrder/important.png'
import { CalendarOutlined } from '@ant-design/icons';
import { FormatDateTime } from '../../../utils/FormatDateTime';

function ItemBulkOrder({ data }) {
   const calculateTimeLeft = () => {
      const difference = new Date(data?.endDate) - new Date();
      let timeLeft = {};

      if (difference > 0) {
         timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
         };
      }

      return timeLeft;
   };

   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

   useEffect(() => {
      // Tạo interval để cập nhật countdown mỗi giây
      const timer = setInterval(() => {
         setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
   }, []);

   return (
      <div className="w-[585.667px] h-full relative cursor-pointer">
         <div className="group-[.swiper-slide-active]:scale-[1.05] max-w-full transition-all duration-[250ms] ease-out scale-[0.88] origin-center flex flex-wrap p-[15px] bg-[#fff] rounded-[12px] leading-[1.6]">
            {/* Hình ảnh */}
            <div className="flex-[0_0_60%] w-[60%] p-0">
               <div className="relative flex items-center">
                  {/* Hình bên trái */}
                  <div className="w-[43%] flex-[0_0_43%] relative">
                     {/* Hình 1 */}
                     <div className="relative w-[160px] h-[189px]">
                        <img className="rotate-[3deg] z-10 object-cover rounded-[5px] top-0 left-0 h-full w-full align-middle"
                           src={data?.blindBox?.images?.galleryImages[0]?.url} alt="" />
                     </div>
                     {/* Hình 2 */}
                     <div className='relative w-[150px] h-[150px]'>
                        <img className='object-cover rounded-[5px] top-0 left-0 h-full w-full align-middle max-w-full '
                           src={data?.blindBox?.images?.galleryImages[1]?.url} alt="" />
                     </div>
                  </div>
                  {/* Hình bên phải */}
                  <div className='w-[57%] flex-[0_0_57%] relative'>
                     <img className='w-[212px] h-[260px] z-[2] rotate-[-3deg] object-cover rounded-[5px]  top-0 left-0 align-middle'
                        src={data?.blindBox?.images?.mainImage?.url} alt="" />
                  </div>
               </div>
            </div>
            {/* Nội dung */}
            <div className='flex-[0_0_40%] w-[40%] pl-[15px] pt-[20px]'>
               <div>
                  <div className='bg-[#25CF88] w-[70px] h-[70px] uppercase text-center text-[#fff] rounded-[50%] font-bold absolute z-50 right-[5px] top-[-35px] cursor-pointer flex items-center justify-center
                  before:content[""] before:absolute before:top-[5px] before:left-[5px] before:w-[60px] before:h-[60px] before:rounded-[50%] before:border-dashed before:border-[#fff] before:border-[1px]'>
                     <span className='font-bold text-[12px]'>
                        PRE <br></br> ORDER
                     </span>
                     <div className='absolute inline-block w-[20px] h-[20px] leading-[20px] bg-[#fff] rounded-[50%] top-0 right-0 text-center cursor-pointer'>
                        <img className='inline-block w-auto align-middle mt-[-2px] ml-[1px] h-auto '
                           src={ImportantIcon} alt="" />
                     </div>
                  </div>
               </div>
               <div>
                  <span className='text-[#000] font-bold text-[16px] line-clamp-2 mb-[5px]'>
                     {data?.blindBox?.name}
                  </span>
                  <div>
                     <div className='text-[13px] text-center'>
                        <p className='flex items-center justify-center mb-[5px]'>
                           <span className='ml-[5px] text-[15px] text-center font-bold leading-[1.6] text-[#222] '>
                              <CalendarOutlined /> Thời gian kết thúc:
                           </span>
                        </p>
                        <p></p>
                        <time className='bg-[rgb(15,208,127)] py-1 rounded-[20px] h-[30px] font-bold text-[15px] leading-normal text-white block' >{FormatDateTime(data?.endDate)}</time>
                     </div>
                     <div>
                        <div className='mt-[10px] '>
                           <div className='bg-transparent text-[10px] h-auto rounded-[5px] py-[5px] px-[7px] grid grid-cols-4 gap-[20px]'>
                              <div className='text-[#000] bg-transparent relative text-center rounded-[3px] '>
                                 <b className='text-[15px] leading-[1] font-bold text-[#000]'>{timeLeft?.days}</b> <span className='block'>ngày</span>
                              </div>

                              <div className='text-[#000] bg-transparent relative text-center rounded-[3px] before:content-[""] before:top-[10px] before:bg-[#000]  before:rounded-[50%] before:w-[3px] before:h-[3px] before:absolute before:right-[calc(100%+8px)] 
                              after:content-[""] after:absolute after:bottom-[12px] after:bg-[#000]  after:rounded-[50%] after:w-[3px] after:h-[3px] after:top-auto after:right-[calc(100%+8px)]'>
                                 <b className='text-[15px] leading-[1] font-bold text-[#000]'>{timeLeft?.hours}</b> <span className='block'>giờ</span>
                              </div>

                              <div className='text-[#000] bg-transparent relative text-center rounded-[3px] before:content-[""] before:top-[10px] before:bg-[#000]  before:rounded-[50%] before:w-[3px] before:h-[3px] before:absolute before:right-[calc(100%+8px)]
                              after:content-[""] after:absolute after:bottom-[12px] after:bg-[#000]  after:rounded-[50%] after:w-[3px] after:h-[3px] after:top-auto after:right-[calc(100%+8px)]'>
                                 <b className='text-[15px] leading-[1] font-bold text-[#000]'>{timeLeft?.minutes}</b> <span className='block'>phút</span>
                              </div>

                              <div className='text-[#000] bg-transparent relative text-center rounded-[3px] before:content-[""] before:top-[10px] before:bg-[#000]  before:rounded-[50%] before:w-[3px] before:h-[3px] before:absolute before:right-[calc(100%+8px)]
                              after:content-[""] after:absolute after:bottom-[12px] after:bg-[#000]  after:rounded-[50%] after:w-[3px] after:h-[3px] after:top-auto after:right-[calc(100%+8px)]'>
                                 <b className='text-[15px] leading-[1] font-bold text-[#000]'>{timeLeft?.seconds}</b><span className='block'>giây</span>
                              </div>
                           </div>
                        </div>
                        <div className='mt-[5px] '>
                           <div className='flex items-center justify-center bg-[#FF0000] h-[30px] uppercase text-[#fff] text-[15px] relative cursor-pointer font-bold rounded-full '>
                              <b className='font-bold '>
                                 Đặt sản phẩm
                              </b>
                              <i className='flex text-center items-center justify-center bg-[#fff] rounded-[50%] absolute right-[3px]'>
                                 <img
                                    className='w-[17px] h-[17px] align-middle '
                                    src={Bell} alt="" />
                              </i>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ItemBulkOrder