import { formatMoney } from '../../../utils/FormatMoney'

function ItemTimePricing({ data }) {

   return (
      <>

         <div className="w-[23rem] flex  min-h-[1px] float-left relative">
            <div className="mx-[6px] my-[5px] h-full ">
               <div className="bg-[#fff] rounded-[22px] border-[#ccc] border-solid border-[1px] shadow-[2px_5px_5px_0_rgba(0,0,0,0.1)] ">
                  {/* Phần trên */}
                  <div className="relative ">
                     <div className="relative w-full ">
                        <div className='overflow-hidden rounded-tl-[22px] rounded-tr-[22px] '>
                           <img className="block max-w-full object-cover align-middle w-[349.25px] h-[349.25px]"
                              src={data?.blindBox?.images?.mainImage?.url} alt="" />
                        </div>
                     </div>
                  </div>

                  {/* Phần dưới */}
                  <div className='p-[10px] pb-[15px] min-h-[142.5px]'>
                     <div className='min-h-[51px]'>
                        <h4 className='font-bold min-h-[58px] text-[16px] leading-[1.8] text-[#000] line-clamp-2 mb-[10px] '>
                           {data?.blindBox?.name}
                        </h4>
                     </div>
                     <div className='flex flex-col gap-[5px] '>
                        <div className='text-[13px] leading-[1.6]'>
                           Giá niêm yết: {formatMoney(data?.blindBox?.listedPrice)}
                        </div>
                        <div>
                           <span className='inline-block text-[16px] font-bold mr-[6px] '>
                              {formatMoney(data?.priceAtTime)}
                           </span>
                           <span className='inline-block bg-[#d7322d] py-[2px] px-[10px] text-[#fff] rounded-full text-[12px] font-bold'>
                              -{Math.floor(data?.discountPercent)}%
                           </span>
                        </div>
                        {/* Phần Xem thêm và mua ngay */}
                        <div className='flex text-center mt-[8px] h-auto hidden'>
                           <div className={`hover:shadow-[0_0_2px_0_#ff0000_inset,_0_0_10px_2px_#ff0000] bg-[#e9e9e9] cursor-pointer text-[#4E5054] basis-[35%] inline-block py-[2px] px-[10px] rounded-l-full font-bold text-[12px]`}>
                              <span className='uppercase inline-block text-[#4E5054]'>
                                 Xem thêm
                              </span>
                           </div>
                           <div className={`hover:shadow-[0_0_2px_0_#ff0000_inset,_0_0_10px_2px_#ff0000] bg-[#fde066] cursor-pointer text-[#333] basis-[65%] inline-block py-[2px] px-[10px] text-[12px] rounded-r-full font-bold text-center align-middle`}>
                              <span className='uppercase inline-block text-[#4E5054]'>
                                 Mua ngay
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* {showPopup && (
            <div className='w-[100rem] px-[15px] mx-auto '>
               <div className='bg-[#fff] border-[2px] border-solid border-[#ccc] rounded-[20px] p-[20px] max-w-[39rem] flex items-center mx-auto relative flex-wrap text-[#333] pt-[25px] pb-[85px] z-10 '>

               </div>
            </div>
         )} */}
      </>
   )
}

export default ItemTimePricing