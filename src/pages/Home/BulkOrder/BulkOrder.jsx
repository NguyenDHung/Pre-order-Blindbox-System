import { RightOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/effect-fade';
import 'swiper/css';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import decoration from '../../../assets/BulkOrder/decoration.png'
import rocket from '../../../assets/BulkOrder/rocket.png'
import LeftButton from '../../../assets/BulkOrder/LeftButton.png'
import RightButton from '../../../assets/BulkOrder/RightButton.png'
import ItemBulkOrder from './ItemBulkOrder';
import { ApiGetPreOrderCampaign } from '../../../api/PreOrderCampaign/ApiPreOrderCampaign';


function BulkOrder() {
   const [listBulkOrder, setListBulkOrder] = useState([])

   const navigationLeftRef = useRef()
   const navigationRighttRef = useRef()

   const CallApiGetPreOrderCampaign = async (PageIndex, PageSize, type, isEndingSoon, isNewlyLaunched, isTrending) => {
      const response = await ApiGetPreOrderCampaign({ PageIndex, PageSize, type, isEndingSoon, isNewlyLaunched, isTrending })
      setListBulkOrder(response)
   }

   useEffect(() => {
      CallApiGetPreOrderCampaign(1, 10, 1, undefined, undefined, undefined)
   }, [])

   console.log(listBulkOrder);


   return (
      listBulkOrder?.length != 0 ?
         (<div className="p-[24px] bg-[#e5e5e5] relative">
            <div className="mb-[25px] relative bg-[#707070] rounded-[17px] pb-[40px] ">
               <div className="px-[50px] w-full ">
                  {/* Phần trên */}
                  <div className="text-center mx-auto ">
                     <div className={`px-[50px] py-[20px] text-center bg-no-repeat bg-contain inline-block`}
                        style={{ backgroundImage: `url(${decoration})` }}
                     >
                        <h2 className="uppercase flex items-center text-[#fff] px-[50px] relative font-bold text-[30px] leading-[1.1]">
                           Chọn lựa sản phẩm mở bán
                           <span className='ml-[10px] inline-block'>
                              <img className='align-middle' src={rocket} alt="" />
                           </span>
                        </h2>
                     </div>
                     <Link to='/san-pham'>
                        <div className='relative z-10 mt-[-7px] text-center leading-[1.6] cursor-pointer'>
                           <div className='text-[#fff] px-[20px] py-[7px] inline-block uppercase text-[13px] rounded-[20px] bg-[#535353] shadow-[0px_-4px_0px_0px_#898888] font-bold'>
                              Khám phá thêm <RightOutlined />
                           </div>
                        </div>
                     </Link>
                  </div>
                  {/* Phần slide sản phẩm */}
                  <div className='relative '>
                     <div className='pt-[50px] pb-[20px] mx-auto relative overflow-hidden'>
                        {/* Một item */}
                        <Swiper
                           style={{ overflow: 'visible' }}
                           slidesPerView={3}
                           navigation={listBulkOrder?.length > 1}
                           centeredSlides={listBulkOrder?.length > 1}
                           modules={[Navigation]}
                           loop={listBulkOrder?.length > 3}
                           onBeforeInit={(swiper) => {
                              swiper.params.navigation.prevEl = navigationLeftRef.current;
                              swiper.params.navigation.nextEl = navigationRighttRef.current;
                           }}
                        >
                           {listBulkOrder?.map((item, index) => {
                              return (
                                 <SwiperSlide key={index} className='group'>
                                    <Link to={"/preordercampaign/" + item.slug}>
                                       <ItemBulkOrder data={item} />
                                    </Link>
                                 </SwiperSlide>
                              )
                           })}
                        </Swiper>

                     </div>
                     {/* Nút trái */}
                     <div ref={navigationLeftRef} className='z-40 bg-none w-auto h-auto left-[-35px] right-auto absolute top-[50%] mt-[-22px] cursor-pointer leading-[1.6]'>
                        <img className='max-w-full h-auto align-middle '
                           src={LeftButton} alt="Nút bên trái" />
                     </div>
                     {/* Nút phải */}
                     <div ref={navigationRighttRef} className='z-40 bg-none w-auto h-auto right-[-35px] left-auto absolute top-[50%] mt-[-22px] cursor-pointer leading-[1.6]'>
                        <img className='max-w-full h-auto align-middle '
                           src={RightButton} alt="Nút bên phải" />
                     </div>
                  </div>
               </div>
            </div>
         </div>)
         : <div></div>
   )
}

export default BulkOrder