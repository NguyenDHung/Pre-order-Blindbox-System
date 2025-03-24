import { ArrowRightOutlined } from '@ant-design/icons';

import { formatMoney } from '../../utils/FormatMoney';

function SearchResultItem({ data }) {

   return (
      <div className='px-[10px] cursor-pointer group'>
         <div className='shadow-[0_2px_10px_-3px_rgba(0,0,0,0.65)] group-hover:shadow-[0_6px_20px_-5px_rgba(0,0,0,0.65)] rounded-[22px] '>
            {/* Phần trên */}
            <div className='relative'>
               {data?.type == 'BulkOrder' ?
                  (<div>
                     <div className='absolute z-10 text-center uppercase text-[#fff] bg-[#e02417] rounded-[50%] w-[3.75rem] h-[3.75rem] right-[6px] top-[-12px] text-[12px] flex items-center justify-center
                            before:content-[""] before:absolute before:top-[2px] before:left-[2.6px] before:w-[3.4rem] before:h-[3.4rem] before:rounded-[50%] before:border-dashed before:border-[#fff] before:border-[1px]' >
                        <span className='leading-[1.4] text-center'>
                           PRE <br></br> ORDER
                        </span>
                     </div>
                  </div>)
                  :
                  (<div></div>)}

               <a href="" className='absolute z-10 bottom-0 right-0 block bg-transparent '>
                  <div className='text-right'>
                     <div className='rounded-tl-[20px] py-[9px] px-[13px] bg-[rgba(0,0,0,0.6)] text-right w-auto'>
                        <span className='text-[20px] font-normal text-[#fff] text-right'>
                           {formatMoney(data?.priceTo)}
                        </span>
                     </div>
                  </div>
               </a>
               <div className='relative w-[245px] h-[245px] overflow-hidden rounded-t-[22px]'>
                  <img className='group-hover:scale-105 object-cover rounded-t-[22px] w-[245px] h-[245px]' src={data?.blindBox?.images?.mainImage?.url} alt="Hinh anh cua campaign" />
               </div>
            </div>
            {/* Phần dưới */}
            <div className='p-[25px] bg-[#fff] rounded-b-[22px]'>
               <div>
                  <h4 className='group-hover:text-[#ebbc00] min-h-[38px] leading-[1.2] text-[15px] font-bold line-clamp-2 mb-[10px] '>
                     {data?.blindBox?.name}
                  </h4>
               </div>
               <div className='line-clamp-4 text-[13px] text-[#333] leading-[1.6] min-h-[84px]'>
                  {data?.blindBox?.description}
               </div>
               <div className='text-center mt-[10px] h-[2.2rem]'>
                  <p className='inline-block font-bold text-[1rem] text-[#337ab7] text-center leading-[1.6] '>
                     XEM THÊM
                  </p>
                  <i className='ml-[5px]'>
                     <ArrowRightOutlined />
                  </i>
               </div>
            </div>
         </div>
      </div>
   );
}

export default SearchResultItem;