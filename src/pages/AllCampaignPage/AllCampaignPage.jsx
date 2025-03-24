import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Pagination } from 'antd';

import Background from '../../assets/SearchInHeader/background.jpg'
import SortIcon from '../../assets/SearchInHeader/sort.webp'
import SearchResultItem from '../../components/SearchCampaign/SearchResultItem'
import { ApiSearchCampaign } from '../../api/SearchCampaign/ApiSearchCampaign';

function AllCampaignPage() {
   const [filter, setFilter] = useState(0)
   const [pagination, setPagination] = useState({
      PageSize: 12,
      TotalPage: 0,
      TotalCount: 0
   })
   const [pageIndex, setPageIndex] = useState(1)
   const [campaignData, setCampaignData] = useState([])

   const handlePageChange = (page) => {
      setPageIndex(page)
   };

   const CallApiSearchCampaign = async (BlindBoxName, PageIndex, PageSize, SortOrder) => {
      const result = await ApiSearchCampaign({ BlindBoxName, PageIndex, PageSize, SortOrder })
      setCampaignData(result?.data)
      if (result.status === 200) {
         const paginationData = JSON.parse(result?.headers?.get('x-pagination'))
         setPagination({
            ...pagination,
            TotalPage: paginationData.TotalPages,
            TotalCount: paginationData.TotalCount
         })
      }
   }

   useEffect(() => {
      CallApiSearchCampaign(undefined, pageIndex, pagination.PageSize, filter)
   }, [filter, pageIndex])

   return (
      <div style={{ backgroundImage: `url(${Background})` }}>
         <div className="w-[67rem] mx-auto px-[15px] min-h-[100vh]" >
            {/* Thông tin kết quả tìm kiếm */}
            <div className="p-[15px]]">
               <h1 className="text-[36px] mb-[10px] pt-[20px] font-bold">
                  Tất cả sản phẩm Blind Box
               </h1>
            </div>

            {/* Phần giao diện filter */}
            <div className="max-w-[36rem] mt-[40px] mb-[70px] mx-auto flex justify-center items-center">
               <p className="text-[20px] font-medium mr-[20px] ">
                  Sắp xếp theo:
               </p>
               <div className="grid grid-cols-6 gap-[25px]">
                  <div onClick={() => setFilter(0)} className={`${filter === 0 ? 'bg-[#FFDE50]' : 'bg-[#fff]'} group w-[3rem] h-[3rem] rounded-[50%] relative shadow-[0_5px_12px_0_rgba(0,0,0,0.35)] cursor-pointer`}>
                     <div className='w-full h-full bg-[${SortIcon}] bg-no-repeat bg-[length:270px] '
                        style={{ backgroundImage: `url(${SortIcon})`, backgroundPositionY: '11px', backgroundPositionX: '11px' }}
                     >
                     </div>
                     <span className='hidden group-hover:block absolute bottom-[-35px] leading-[23px] whitespace-nowrap rounded-[15px] bg-[#FFDE50] px-[20px] text-[13px] font-normal left-[50%] translate-x-[-50%] shadow-[0px_4px_4px_rgba(0,0,0,0.15)] '>
                        Từ A-Z
                     </span>
                  </div>
                  <div onClick={() => setFilter(1)} className={`${filter === 1 ? 'bg-[#FFDE50]' : 'bg-[#fff]'} group w-[3rem] h-[3rem] rounded-[50%] relative shadow-[0_5px_12px_0_rgba(0,0,0,0.35)] cursor-pointer`}>
                     <div className='w-full h-full bg-[${SortIcon}] bg-no-repeat bg-[length:270px] '
                        style={{ backgroundImage: `url(${SortIcon})`, backgroundPositionY: '11px', backgroundPositionX: '-37px' }}
                     >
                     </div>
                     <span className='hidden group-hover:block absolute bottom-[-35px] leading-[23px] whitespace-nowrap rounded-[15px] bg-[#FFDE50] px-[20px] text-[13px] font-normal left-[50%] translate-x-[-50%] shadow-[0px_4px_4px_rgba(0,0,0,0.15)] '>
                        Từ Z-A
                     </span>
                  </div>
                  <div onClick={() => setFilter(2)} className={`${filter === 2 ? 'bg-[#FFDE50]' : 'bg-[#fff]'} group w-[3rem] h-[3rem] rounded-[50%] relative shadow-[0_5px_12px_0_rgba(0,0,0,0.35)] cursor-pointer`}>
                     <div className='w-full h-full bg-[${SortIcon}] bg-no-repeat bg-[length:270px] '
                        style={{ backgroundImage: `url(${SortIcon})`, backgroundPositionY: '11px', backgroundPositionX: '-88px' }}
                     >
                     </div>
                     <span className='hidden group-hover:block absolute bottom-[-35px] leading-[23px] whitespace-nowrap rounded-[15px] bg-[#FFDE50] px-[20px] text-[13px] font-normal left-[50%] translate-x-[-50%] shadow-[0px_4px_4px_rgba(0,0,0,0.15)] '>
                        Mới nhất
                     </span>
                  </div>
                  <div onClick={() => setFilter(3)} className={`${filter === 3 ? 'bg-[#FFDE50]' : 'bg-[#fff]'} group w-[3rem] h-[3rem] rounded-[50%] relative shadow-[0_5px_12px_0_rgba(0,0,0,0.35)] cursor-pointer`}>
                     <div className='w-full h-full bg-[${SortIcon}] bg-no-repeat bg-[length:270px] '
                        style={{ backgroundImage: `url(${SortIcon})`, backgroundPositionY: '11px', backgroundPositionX: '-137px' }}
                     >
                     </div>
                     <span className='hidden group-hover:block absolute bottom-[-35px] leading-[23px] whitespace-nowrap rounded-[15px] bg-[#FFDE50] px-[20px] text-[13px] font-normal left-[50%] translate-x-[-50%] shadow-[0px_4px_4px_rgba(0,0,0,0.15)] '>
                        Bán chạy
                     </span>
                  </div>
                  <div onClick={() => setFilter(4)} className={`${filter === 4 ? 'bg-[#FFDE50]' : 'bg-[#fff]'} group w-[3rem] h-[3rem] rounded-[50%] relative shadow-[0_5px_12px_0_rgba(0,0,0,0.35)] cursor-pointer`}>
                     <div className='w-full h-full bg-[${SortIcon}] bg-no-repeat bg-[length:270px] '
                        style={{ backgroundImage: `url(${SortIcon})`, backgroundPositionY: '11px', backgroundPositionX: '-183px' }}
                     >
                     </div>
                     <span className='hidden group-hover:block absolute bottom-[-35px] leading-[23px] whitespace-nowrap rounded-[15px] bg-[#FFDE50] px-[20px] text-[13px] font-normal left-[50%] translate-x-[-50%] shadow-[0px_4px_4px_rgba(0,0,0,0.15)] '>
                        Giá tăng
                     </span>
                  </div>
                  <div onClick={() => setFilter(5)} className={`${filter === 5 ? 'bg-[#FFDE50]' : 'bg-[#fff]'} group w-[3rem] h-[3rem] rounded-[50%] relative shadow-[0_5px_12px_0_rgba(0,0,0,0.35)] cursor-pointer`}>
                     <div className='w-full h-full bg-[${SortIcon}] bg-no-repeat bg-[length:270px] '
                        style={{ backgroundImage: `url(${SortIcon})`, backgroundPositionY: '11px', backgroundPositionX: '-232px' }}
                     >
                     </div>
                     <span className='hidden group-hover:block absolute bottom-[-35px] leading-[23px] whitespace-nowrap rounded-[15px] bg-[#FFDE50] px-[20px] text-[13px] font-normal left-[50%] translate-x-[-50%] shadow-[0px_4px_4px_rgba(0,0,0,0.15)] '>
                        Giá giảm
                     </span>
                  </div>
               </div>
            </div>

            {/* Phần kết quả */}
            <div className='mx-[-10px] grid grid-cols-4 grid-rows-3 gap-y-[1.5rem]'>
               {/*  Ô kết quả tìm kiếm */}
               {
                  campaignData?.map((item, index) => {
                     return (
                        <Link key={index} to={"/preordercampaign/" + item?.slug}>
                           <SearchResultItem data={item} />
                        </Link>
                     )
                  })
               }
            </div>

            {/* Phân trang */}
            <div className={`${campaignData?.length === 0 || campaignData == undefined ? 'hidden' : ''} text-center py-[50px] flex justify-center scale-150`}>
               <Pagination defaultCurrent={pageIndex} total={pagination.TotalCount}
                  defaultPageSize={pagination.PageSize}
                  onChange={handlePageChange}
               />
            </div>

         </div>
      </div>
   )
}

export default AllCampaignPage