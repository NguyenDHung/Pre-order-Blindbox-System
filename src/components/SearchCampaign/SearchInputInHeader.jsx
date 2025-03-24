import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ApiSearchCampaign } from '../../api/SearchCampaign/ApiSearchCampaign';
import { formatMoney } from '../../utils/FormatMoney';

function SearchInputInHeader() {
   const [searchInput, setSearchInput] = useState('')
   const [searchCampaignData, setSearchCampaignData] = useState([])
   const [isInputFocus, setIsInputFocus] = useState(false)
   const navigate = useNavigate()
   const location = useLocation();

   const CallApiSearchCampaign = async (BlindBoxName, PageIndex, PageSize) => {
      const result = await ApiSearchCampaign({ BlindBoxName, PageIndex, PageSize })
      setSearchCampaignData(result?.data)
   }

   const handleInputChange = (e) => {
      console.log(e.target.value);
      setSearchInput(e.target.value?.trim())
      if (e.target.value?.trim() !== '') {
         CallApiSearchCampaign(e.target.value.trim(), 1, 5)
      } else {
         setSearchCampaignData([])
      }
   }

   const handleKeyDown = (e) => {
      if (e.key == 'Enter' && searchInput !== '') {
         setIsInputFocus(false)
         navigate(`/campaign/search/?q=${encodeURIComponent(searchInput)}`)
      }
   }

   useEffect(() => {
      setIsInputFocus(false);
   }, [location]);

   useEffect(() => {
      console.log(isInputFocus);
   }, [isInputFocus])

   return (
      <div className="relative hidden md:block">
         <input
            type="search"
            placeholder="Tìm sản phẩm"
            className="h-10 w-[300px] rounded-xl bg-yellow-300 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-200"
            onChange={handleInputChange}
            onFocus={() => setIsInputFocus(true)}
            onKeyDown={handleKeyDown}
            onBlur={(e) => {
               if (!e.relatedTarget || !e.relatedTarget.classList.contains('search-link')) {
                  setIsInputFocus(false);
               }
            }}
         />
         <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <Search className="h-4 w-4 text-gray-500" />
         </button>
         {/* Kết quả tìm kiếm */}
         <div className={`search-link absolute top-[140%] right-0 ${searchCampaignData?.length === 0 || isInputFocus === false ? 'hidden' : ''}`}>
            <div className="w-[33rem]  bg-[#fff] shadow-[0_5px_12px_0_rgba(0,0,0,0.35)] py-[20px] px-[22px] rounded-[24px]">
               <div className="mt-[5px]">
                  <div className="bg-[#FFDE50] rounded-[30px] mr-[5px] leading-[26px] px-[20px] text-[15px] font-bold py-[6px] text-center whitespace-nowrap align-middle max-w-[33.3333%]">
                     Sản phẩm
                  </div>
                  <div className="border-solid border-b-[1px] border-[#ccc] mt-[15px]"></div>
                  {/* Kết quả tìm kiếm */}
                  <div className="mt-[14px]">
                     <ul>
                        {/* Một item */}
                        {
                           searchCampaignData?.map((item, index) => {
                              return (
                                 <Link key={index} to={"/preordercampaign/" + item.slug} onMouseDown={(e) => e.preventDefault()}>
                                    <li className="cursor-pointer" >
                                       <div className="flex hover:bg-[#eee] px-[10px] py-[6px] rounded-[15px]">
                                          <div className="float-left mr-[10px] w-[62px] h-[62px] overflow-hidden">
                                             <img className="w-full h-auto align-middle object-contain" src={item?.blindBox?.images?.mainImage?.url} alt="hinh anh chinh cua san pham campaign" />
                                          </div>
                                          <div>
                                             <h5 className="font-bold mt-[3px] text-[15px] line-clamp-1 mb-[2px] ">
                                                {item?.blindBox?.name}
                                             </h5>
                                             <span className="text-[15px]">
                                                {formatMoney(item?.priceFrom)} - {formatMoney(item?.priceTo)}
                                             </span>
                                          </div>
                                       </div>
                                    </li>
                                 </Link>
                              )
                           })
                        }

                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SearchInputInHeader;