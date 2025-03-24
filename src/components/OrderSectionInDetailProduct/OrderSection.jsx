import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import CartIcon from '../../assets/OrderSectionDetail/Cart.webp'
import { GetAllUserVoucher } from "../../api/UserVoucher/ApiUserVoucher";
import { formatShortVND } from '../../utils/FormatMoney.jsx'
import { Link } from "react-router-dom";
import { ApiCreateCart } from "../../api/Cart/ApiCart.jsx";
import { useCart } from "../../context/CartContext.jsx";

function OrderSection({ data }) {

   const [quantity, setQuantity] = useState(1);
   const [showPopup, setShowPopup] = useState(false);
   const [dropDown, setDropdown] = useState(false)
   const [userVoucher, setUserVoucher] = useState([])
   const [buyData, setBuyData] = useState({
      PreorderCampaignId: data?.preorderCampaignId,
      Quantity: quantity,
      Voucher: {

      }
   });
   const [chooseVoucher, setChooseVoucher] = useState()
   const { CallGetAllCart } = useCart()

   const handleInputQuantity = (e) => {
      if (isNaN(e.target.value) || Number(e.target.value) < 1) {
         console.log("Khong phai so");
         setQuantity(1);
      } else {
         setQuantity(Number(e.target.value));
      }
      console.log(e.target.value);
   }
   const handleClickChangQuantity = (delta) => {
      setQuantity((pre) => {
         const newQuantity = pre + delta;
         return newQuantity < 1 ? 1 : newQuantity;
      });
   }

   const handleShowPopup = () => {
      setShowPopup(!showPopup);
   }

   const handleDropDownVoucher = () => {
      setDropdown((pre) => {
         if (pre == false) {
            CallApiGetAllUserVoucher()
         }
         return !pre
      })
   }

   const handleChooseVoucher = (voucher) => {
      setBuyData({
         ...buyData,
         Voucher: {
            [data?.preorderCampaignId]: voucher?.voucherCampaignId
         }
      })
      setChooseVoucher(voucher)
      handleDropDownVoucher()
   }

   const handleAddCart = () => {
      CallApiCreateCart()
   }

   const CallApiGetAllUserVoucher = async () => {
      const response = await GetAllUserVoucher();
      setUserVoucher(response)
   }

   const CallApiCreateCart = async () => {
      const payload = {
         preorderCampaignId: data?.preorderCampaignId,
         quantity: quantity
      }
      const response = await ApiCreateCart({ payload })

      // Thông báo thêm cart thành công
      if (response?.status === 200) {
         CallGetAllCart()
         toast.success('Thêm vào giỏ hàng thành công')
      } else {
         toast.error('Thêm vào giỏ hàng thất bại')
      }
   }

   console.log('Buy data: ', buyData);

   useEffect(() => {
      setBuyData({
         ...buyData,
         Quantity: quantity
      })
   }, [quantity])

   return (
      <>
         <div className='flex items-center mt-[1rem]'>
            {/* Số lượng */}
            <div className='h-[40px] flex items-center mr-[4px] '>
               <button onClick={() => handleClickChangQuantity(-1)} className='rounded-[999px_0_0_999px] border-r-0 text-[25px] w-[70px] h-[40px] p-[4px] flex justify-center items-center bg-[#e3e3e3] text-center align-middle border-[2px] border-solid border-transparent'>-</button>
               <input className='h-[40px] text-[20px]  max-w-[80px] border-[2px] border-solid border-[#e3e3e3] text-center font-bold text-[#555] py-[6px] px-[12px] bg-[#fff]'
                  type="text"
                  value={quantity}
                  onChange={handleInputQuantity}
               />
               <button onClick={() => handleClickChangQuantity(1)} className='rounded-[0_999px_999px_0] border-r-0 text-[25px] w-[70px] h-[40px] p-[4px] flex justify-center items-center bg-[#e3e3e3] text-center align-middle border-[2px] border-solid border-transparent'>+</button>
            </div>

            {/* Nút add cart */}
            <button onClick={handleAddCart} className='mx-[8px] bg-[#EBEBEB] border-[1px] border-solid border-[#D7D7D7] py-[2px] px-[18px] rounded-full flex text-[20px] '>
               <img src={CartIcon} alt="" className="h-[40px]" />
            </button>
            {/* Nút buy now */}
            <button onClick={handleShowPopup} className="uppercase min-w-[185px] h-[40px] font-bold text-[20px] mx-[14px] rounded-full bg-[#323232] border-[1px] border-solid border-[#000000] text-[#fff] shadow-[2px_2px_3px_rgba(0,0,0,0.15)]">
               Mua ngay
            </button>
         </div>

         {/* Popup */}
         {showPopup && (
            <div onClick={handleShowPopup} className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
               <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded shadow-lg relative">
                  {/* <div className="absolute top-[-20px] right-[-20px] w-[40px] h-[40px] border-[2px] border-solid border-[#000] rounded-full flex justify-center items-center">
                        <CloseOutlined style={{ fontSize: '25px' }} />
                     </div> */}
                  <div className="flex max-w-[1000px] gap-3">
                     {/* Phần hiển thị thông tin cơ bản sản phẩm */}
                     <div className="flex justify-between gap-[10px]">
                        <div className="w-[166px] h-[166px] rounded-[15px] flex-shrink-0">
                           <img src={data?.blindBox?.images?.mainImage?.url} className="w-full h-auto align-middle" alt="" />
                        </div>
                        <div>
                           <h1 className="font-bold text-[20px] line-clamp-1">
                              {data?.blindBox?.name}
                           </h1>
                           <p className="line-clamp-3 text-[#555]">
                              {data?.blindBox?.description}
                           </p>
                        </div>
                     </div>
                     {/* Phẩn voucher và xác nhận */}
                     <div className="max-w-[50%]">
                        {/* Chọn voucher */}
                        <div className="mb-[1rem] flex items-center">
                           <h1 className="text-[20px] font-bold inline-block">
                              Mã giảm giá:
                           </h1>
                           <div className="relative inline-block min-w-[15rem] ml-[10px]">
                              <div
                                 className="px-3 py-[5px] bg-white border border-gray-300 rounded cursor-pointer min-h-[40px] flex items-center line-clamp-1"
                                 onClick={handleDropDownVoucher}
                              >
                                 {chooseVoucher?.name ? chooseVoucher?.name : 'Chọn mã giảm giá'}
                              </div>
                              {dropDown && (
                                 <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-md z-10 h-[250px] px-[10px] overflow-y-auto">
                                    {userVoucher?.map((item, index) => {
                                       return (
                                          <div onClick={() => handleChooseVoucher(item)} key={index} className="relative card-con grid grid-cols-12 z-10 my-[5px] cursor-pointer">
                                             <div
                                                className="relative z-[11] w-full col-span-3 min-h-full rounded-lg bg-gradient-to-b from-[#FBA518] to-[#A89C29] backdrop-blur-lg shadow-lg"
                                                style={{
                                                   maskImage:
                                                      "radial-gradient(circle at 5px center, transparent 5px, red 5.25px)",
                                                   maskPosition: "-5px center",
                                                   maskSize: "100% 48px",
                                                }}
                                             ></div>
                                             <div className="relative w-full col-span-9 h-full bg-white -ml-4 z-20 rounded-r-lg border-[1px] border-[#F9CB43] p-2 text-[#000]">
                                                <h3 className="text-[#000] text-[16px] line-clamp-1">
                                                   <b>{item?.name}</b>
                                                </h3>
                                                <p className="line-clamp-2 text-[15px]">
                                                   Giảm giá {item.percentDiscount + "%"} tối đa{" "}
                                                   {formatShortVND(item.maximumMoneyDiscount)}
                                                </p>
                                             </div>
                                          </div>
                                       )
                                    })
                                    }

                                 </div>
                              )}

                           </div>
                        </div>
                        {/* Số lượng và mua */}
                        <div className="flex items-center justify-between gap-1">
                           <div className='h-[40px] flex items-center mr-[4px] '>
                              <button onClick={() => handleClickChangQuantity(-1)} className='rounded-[999px_0_0_999px] border-r-0 text-[25px] w-[50px] h-[40px] p-[4px] flex justify-center items-center bg-[#e3e3e3] text-center align-middle border-[2px] border-solid border-transparent'>-</button>
                              <input className='h-[40px] text-[20px]  max-w-[80px] border-[2px] border-solid border-[#e3e3e3] text-center font-bold text-[#555] py-[6px] px-[12px] bg-[#fff]'
                                 type="text"
                                 value={quantity}
                                 onChange={handleInputQuantity}
                              />
                              <button onClick={() => handleClickChangQuantity(1)} className='rounded-[0_999px_999px_0] border-r-0 text-[25px] w-[50px] h-[40px] p-[4px] flex justify-center items-center bg-[#e3e3e3] text-center align-middle border-[2px] border-solid border-transparent'>+</button>
                           </div>
                           <Link to='/confirm-order' state={{ buyData }}>
                              <button className="w-[250px] uppercase font-bold bg-[#FFDE50] text-[#000] text-[20px] h-[44px] rounded-full border-[1px] border-solid border-[#000000] shadow-[2px_2px_3px_rgba(0,0,0,0.15)]">
                                 Xác nhận mua hàng
                              </button>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>)}
      </>
   )
}

export default OrderSection