import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetPriceInCart, UpdateQuantityInCart, ClearAllCart } from '../../api/Cart/ApiCart';
import { GetAllUserVoucher } from '../../api/UserVoucher/ApiUserVoucher';
import CampaignBlock from '../Customer/CampaignBlock';
import { formatMoney } from '../../utils/FormatMoney';
import EmptyCartImage from '../../assets/empty-shopping-cart.png';
import { useCart } from '../../context/CartContext';
import PreorderCampaignDetailService from '../../Services/SignalR/PreorderCampaignDetailService';

function Cart() {

  const [cartBlocks, setCartBlocks] = useState([]);
  const [userVouchers, setUserVoucher] = useState([]);

  const [selectedVoucherMap, setSelectedVoucherMap] = useState({});
  const { CallGetAllCart } = useCart();
	const [loading, setLoading] = useState(true);

  const [buyData, setBuyData] = useState({
    PreorderCampaignId: undefined,
    Quantity: undefined,
    Voucher: {
      ...selectedVoucherMap
    }
  });
  const fetchCartsApi = useCallback(async (voucherMap = {}) => {
    try {
      // Giả sử requestCreateCart có thể là {} hoặc các tham số khác nếu cần
      const result = await GetPriceInCart({}, voucherMap);
      setCartBlocks(result);
      setLoading(false);
    } catch (error) {
      console.error('Fetch Carts Error:', error);
      setCartBlocks([]);
    }
  }, []);
  const CheckingNewOrderIsInCart = (idCampaign)=>{
    if(cartBlocks!=null){
      for(let i=0; i<cartBlocks.length; i++){
        if(cartBlocks[i].responseCarts[0].preorderCampaignId===idCampaign){
          return true;
        }
      }
    }
    return false;
  }
  const fetchUserVoucherApi = async () => {
    try {
      const data = await GetAllUserVoucher();
      setUserVoucher(data || []);
    } catch (error) {
      console.error("Error fetching voucher campaigns:", error);
      setUserVoucher([]);
    }
  };

  useEffect(() => {
    fetchCartsApi();
    fetchUserVoucherApi();
  }, [fetchCartsApi]);

  useEffect(() => {
    setBuyData({
      ...buyData,
      Voucher: {
        ...selectedVoucherMap
      }
    })
  }, [selectedVoucherMap])

  useEffect(()=>{
  if(!loading){
    PreorderCampaignDetailService.startConnection().then(() => {
      PreorderCampaignDetailService.joinGroup("Cart_Preordercampaign");
    });
    PreorderCampaignDetailService.addMessageListener((message)=>{
      console.log(message)
    })
    // Nghe sự kiện cập nhật đơn hàng
    PreorderCampaignDetailService.addOrderCartPageListener((preorderCampaginUpdate) => {
      if(CheckingNewOrderIsInCart(preorderCampaginUpdate)){
        fetchCartsApi();
        CallGetAllCart();
      };
    });

    // Rời khỏi Group khi rời trang
    return () => {
      PreorderCampaignDetailService.leaveGroup("Cart_Preordercampaign");
    };
  }

  },[loading])
  // console.log('Cart Items:', cartItems);
  // console.log('Voucher Campaigns:', userVouchers);

  const updateQuantityApi = async (preorderCampaignId, delta) => {
    const block = cartBlocks.find(b => b.responseCarts[0].preorderCampaignId === preorderCampaignId);
    if (!block) return;

    const currentTotalQuantity = block.responseCarts.reduce((sum, item) => sum + item.quantity, 0);
    const newTotalQuantity = Math.max(currentTotalQuantity + delta, 1);

    const requestData = {
      PreorderCampaignId: preorderCampaignId,
      Quantity: newTotalQuantity,
    };

    try {
      await UpdateQuantityInCart(requestData);
      // Gọi lại API với mapping voucher hiện tại
      await fetchCartsApi(selectedVoucherMap);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Xoá 1 item (quantity = 0)
  const removeItem = async (preorderCampaignId) => {
    // Trước khi xóa, kiểm tra xem block có voucher được chọn không
    const voucherCampaignId = selectedVoucherMap[preorderCampaignId];
    if (voucherCampaignId) {
      // Restore voucher cho block bị xóa
      setUserVoucher(prevVouchers =>
        prevVouchers.map(v => {
          if (v.voucherCampaignId === voucherCampaignId) {
            return { ...v, quantity: v.quantity + 1 };
          }
          return v;
        })
      );
      // Xóa mapping cho block bị xóa
      setSelectedVoucherMap(prev => {
        const newMap = { ...prev };
        delete newMap[preorderCampaignId];
        return newMap;
      });
    }

    try {
      await UpdateQuantityInCart({
        PreorderCampaignId: preorderCampaignId,
        Quantity: 0,
      });
      // Gọi lại API với mapping hiện tại (đã cập nhật)
      const updatedResult = await GetPriceInCart({}, selectedVoucherMap);
      setCartBlocks(updatedResult);
      if (updatedResult) {
        CallGetAllCart()
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Clear toàn bộ cart
  const clearCart = async () => {
    try {
      const response = await ClearAllCart();
      // Xoá luôn các voucher đã chọn khi cart được xoá
      setCartBlocks([]);
      setSelectedVoucherMap({});
      if (response?.status === 200) {
        CallGetAllCart()
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const onVoucherSelected = (campaignId, newVoucherCampaignId, newUserVoucherId) => {
    setSelectedVoucherMap(prev => {
      // Nếu block đã có voucher được chọn trước đó
      const oldVoucherCampaignId = prev[campaignId];
      if (oldVoucherCampaignId && oldVoucherCampaignId !== newVoucherCampaignId) {
        // Restore số lượng cho voucher cũ
        setUserVoucher(prevVouchers =>
          prevVouchers.map(v => {
            if (v.voucherCampaignId === oldVoucherCampaignId) {
              return { ...v, quantity: v.quantity + 1 };
            }
            return v;
          })
        );
      }
      const newMap = { ...prev, [campaignId]: newVoucherCampaignId };
      // Gọi API lấy lại giá mới với mapping cập nhật
      fetchCartsApi(newMap);
      return newMap;
    });

    // Sau khi chọn voucher, giảm số lượng của voucher mới
    setUserVoucher(prevVouchers =>
      prevVouchers.map(v => {
        if (v.voucherCampaignId === newVoucherCampaignId && v.quantity > 0) {
          return { ...v, quantity: v.quantity - 1 };
        }
        return v;
      })
    );
  };

  // Callback để xóa voucher của block
  const onRemoveVoucher = (campaignId, voucherCampaignId, userVoucherId) => {
    // Xóa mapping voucher cho block đó
    setSelectedVoucherMap(prev => {
      const newMap = { ...prev };
      delete newMap[campaignId];
      fetchCartsApi(newMap);
      return newMap;
    });
    // Restore số lượng voucher đã bị giảm
    setUserVoucher(prevVouchers =>
      prevVouchers.map(v => {
        if (v.voucherCampaignId === voucherCampaignId) {
          return { ...v, quantity: v.quantity + 1 };
        }
        return v;
      })
    );
  };
  if(loading){
    return <div className='flex items-center justify-center min-h-screen'>
    <div className='w-12 h-12 border-t-2 border-b-2 border-yellow-400 rounded-full animate-spin'></div>
  </div>
  }
  // Kiểm tra nếu cartBlocks trống thì hiển thị giao diện "empty cart"
  if (!cartBlocks || cartBlocks.length === 0) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center">
          {/* Ảnh minh họa giỏ hàng trống (nếu muốn) */}
          <img
            src={EmptyCartImage}
            alt="Empty cart"
            className="w-52 h-auto mb-6"
          />
          {/* Tiêu đề */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Không có sản phẩm nào trong giỏ hàng
          </h2>
          <p className="text-gray-600 mb-6">
            Tiếp tục mua sắm để tìm sản phẩm!
          </p>
          <Link
            to="/"
            className="bg-purple-600 text-white px-6 py-2 rounded uppercase font-medium text-center hover:bg-purple-700 transition-colors duration-200"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </section>
    );
  }


  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {(cartBlocks || []).map((block, index) => (
          <CampaignBlock
            key={index}
            block={block}
            vouchers={userVouchers}
            selectedVoucherMap={selectedVoucherMap}
            onUpdateQuantity={updateQuantityApi}
            onRemoveItem={removeItem}
            onVoucherSelected={onVoucherSelected}
            onRemoveVoucher={onRemoveVoucher}
          />
        ))}

        {/* Tổng tiền cả cart */}
        <div className="text-right mt-4 text-xl font-bold">
          Tổng tiền của cả giỏ hàng:{" "}
          {formatMoney(cartBlocks
            .reduce((sum, block) => sum + block.total, 0))}
        </div>

        {/* Footer chung cho cart: xoá giỏ hàng, thanh toán, v.v... */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded uppercase hover:bg-gray-300"
            onClick={clearCart}
          >
            Xóa giỏ hàng
          </button>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded uppercase font-medium text-center hover:bg-gray-300 transition-colors duration-200"
            >
              Tiếp tục mua sắm
            </Link>
            <Link
              to='/confirm-order' state={{ buyData }}
              className="bg-yellow-400 text-white px-6 py-2 rounded uppercase font-medium text-center hover:bg-yellow-600 transition-colors duration-200"
            >
              Thanh Toán
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
