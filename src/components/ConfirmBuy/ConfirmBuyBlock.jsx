import { formatMoney } from "../../utils/FormatMoney";

function ConfirmBuyBLock({ data }) {

   return (
      <div className="border-[1px] border-[#ccc] px-[1rem] mb-[1.5rem]">
         {/* Một dòng đơn */}
         {
            data?.responseCarts?.map((item, index) => {
               return (
                  <div key={index} className="py-[0.8rem] flex ">
                     <div className="flex-1">
                        <img className="w-[3.5rem] h-[3.5rem] float-left mr-[8px] object-cover" src={item?.blindBox?.images?.mainImage?.url} alt="Hình ảnh sản phẩm" />
                        <div className="">
                           <h1 className="line-clamp-2 font-bold">
                              {item?.blindBox?.name || ''}
                           </h1>
                           <span className="text-[15px] text-[#303141]">
                              Số lượng: {item?.quantity}
                           </span>
                        </div>
                     </div>
                     <div className="w-[6rem] text-right font-normal text-[#303141]">
                        <span className="text-[16px]">
                           {formatMoney(item?.price)}
                        </span>
                     </div>
                  </div>
               )
            })
         }

         {/* Khu vực tổng tiền và hiện voucher */}
         <div className="grid grid-cols-6 grid-rows-3 py-[10px] border-t-2 border-[#ccc]">
            <div className="row-span-1 col-span-3 line-clamp-1 font-bold text-[red]">
               {data?.userVoucher?.name}
            </div>
            <div className="col-start-4 col-span-1 text-right font-bold">
               <h1>
                  Tạm tính:
               </h1>
            </div>
            <div className="col-start-5 col-span-2 text-right">
               <span>
                  {formatMoney(data?.tempTotal)}
               </span>
            </div>

            <div className="col-start-4 row-start-2 col-span-1 text-right font-bold">
               <h1>
                  Giảm giá:
               </h1>
            </div>
            <div className="col-start-5 row-start-2 col-span-2 text-right">
               <span>
                  ({formatMoney(data?.discountMoney)})
               </span>
            </div>

            <div className="col-start-4 row-start-3 col-span-1 text-right font-bold">
               <h1>
                  Thành tiền:
               </h1>
            </div>
            <div className="col-start-5 row-start-3 col-span-2 text-right">
               <span>
                  {formatMoney(data?.total)}
               </span>
            </div>

         </div>
      </div>
   )
}

export default ConfirmBuyBLock