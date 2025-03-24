import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/effect-fade';
import 'swiper/css';

import BackGround from '../../../assets/TimePricing/bgTimePricing.png'
import ItemTimePricing from './ItemTimePricing'
import LeftButton from '../../../assets/BulkOrder/LeftButton.png'
import RightButton from '../../../assets/BulkOrder/RightButton.png'
import { ApiGetPreOrderCampaign } from '../../../api/PreOrderCampaign/ApiPreOrderCampaign';
import { Link } from 'react-router';

function TimePricing() {
   const [filter, setFilter] = useState(1)
   const [listTimePricing, setListTimePricing] = useState([])
   const navigationLeftRef = useRef()
   const navigationRightRef = useRef()

   const CallApiGetPreOrderCampaign = async (PageIndex, PageSize, type, isTrending, isNewlyLaunched, isEndingSoon) => {
      const response = await ApiGetPreOrderCampaign({ PageIndex, PageSize, type, isEndingSoon, isNewlyLaunched, isTrending })
      setListTimePricing(response)
   }

   useEffect(() => {
      if (filter == 1) {
         CallApiGetPreOrderCampaign(1, 10, 0, true, undefined, undefined)
      } else if (filter == 2) {
         CallApiGetPreOrderCampaign(1, 10, 0, undefined, true, undefined)
      } else if (filter == 3) {
         CallApiGetPreOrderCampaign(1, 10, 0, undefined, undefined, true)
      }
   }, [filter])

   console.log('Time pricing: ', listTimePricing);


   return (
      <div className='relative'>
         <div style={{ background: `url(${BackGround})` }}
            className='pt-[45px] pb-[45px] px-[24px] !bg-no-repeat !bg-cover relative'>
            <div className='w-[101rem] px-[15px] mx-auto '>
               <div>
                  <div className='mx-[-15px] '>
                     <div className='w-full relative min-h-[1px] px-[15px]'>
                        <h1 className='flex items-end mb-[20px] justify-center font-bold uppercase text-center text-[36px] leading-[1.1] '>
                           <span className='leading-[1.3] text-left text-[#4F4F4F] relative'>
                              Đặt hàng về tay sớm nhất
                           </span>
                        </h1>
                        <div>
                           {/* Thanh filter */}
                           <div className='text-center '>
                              <div className='bg-[#fff] rounded-[999px] p-[3px] inline-flex gap-[10px] max-w-full '>
                                 <div onClick={() => setFilter(1)} className={`${filter == 1 ? 'bg-[#fdde50]' : ''} uppercase text-[12px] text-[#333] py-[6px] px-[10px] rounded-full font-bold cursor-pointer whitespace-nowrap text-center `}>
                                    Dự án thịnh hành
                                 </div>
                                 <div onClick={() => setFilter(2)} className={`${filter == 2 ? 'bg-[#fdde50]' : ''} uppercase text-[12px] text-[#333] py-[6px] px-[10px] rounded-full font-bold cursor-pointer whitespace-nowrap text-center `}>
                                    Mới ra mắt
                                 </div>
                                 <div onClick={() => setFilter(3)} className={`${filter == 3 ? 'bg-[#fdde50]' : ''} uppercase text-[12px] text-[#333] py-[6px] px-[10px] rounded-full font-bold cursor-pointer whitespace-nowrap text-center `}>
                                    Sắp kết thúc
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div className='h-auto justify-start pt-[24px] relative overflow-hidden'>
                                 {/* Nơi hiện item */}

                                 <Swiper
                                    style={{ overflow: 'visible' }}
                                    slidesPerView={4}
                                    navigation={listTimePricing?.length > 4}
                                    modules={[Navigation]}
                                    loop={listTimePricing?.length > 4}
                                    onBeforeInit={(swiper) => {
                                       swiper.params.navigation.prevEl = navigationLeftRef.current;
                                       swiper.params.navigation.nextEl = navigationRightRef.current;
                                    }}
                                 >
                                    {listTimePricing?.map((item, index) => {
                                       return (
                                          <SwiperSlide key={index} className='group'>
                                             <Link to={"/preordercampaign/"+item.slug}>
                                                <ItemTimePricing data={item} />
                                             </Link>
                                          </SwiperSlide>
                                          
                                       )
                                    })}
                                 </Swiper>
                              </div>

                              <div>
                                 <div>
                                    <div ref={navigationLeftRef} className='z-40 cursor-pointer left-[-70px] absolute top-1/2 translate-y-[50%]'>
                                       <img className='max-w-full h-auto align-middle '
                                          src={LeftButton} alt="" />
                                    </div>
                                    <div ref={navigationRightRef} className='z-40 cursor-pointer right-[-70px] absolute top-1/2 translate-y-[50%]'>
                                       <img className='max-w-full h-auto align-middle '
                                          src={RightButton} alt="" />
                                    </div>
                                 </div>
                              </div>

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

export default TimePricing