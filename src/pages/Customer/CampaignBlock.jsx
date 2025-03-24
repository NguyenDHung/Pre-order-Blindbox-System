import React, { useState, useEffect } from 'react';
import CartItem from '../Customer/CartItem';
import VoucherModal from '../Customer/VoucherModal';
import { formatMoney } from '../../utils/FormatMoney';

function CampaignBlock({ block, selectedVoucherMap, onUpdateQuantity, onRemoveItem, vouchers, onVoucherSelected, onRemoveVoucher }) {
  // Lấy campaignId từ phần tử đầu tiên của responseCarts
  const campaignId = block.responseCarts[0].preorderCampaignId;
  const items = block.responseCarts;

  // Quản lý voucher của khung này
  const [showVoucherModal, setShowVoucherModal] = useState(false);

  // Nếu block có voucher đã áp dụng (userVoucherId khác 0) thì khởi tạo appliedVoucher từ danh sách voucher
  const [appliedVoucher, setAppliedVoucher] = useState(null);

  useEffect(() => {
    // Lấy voucherCampaignId từ mapping dựa theo campaignId
    const selectedVoucherCampaignId = selectedVoucherMap[campaignId];
    const voucher = selectedVoucherCampaignId
      ? vouchers.find(v => v.voucherCampaignId === selectedVoucherCampaignId)
      : null;
    setAppliedVoucher(voucher);
  }, [selectedVoucherMap, campaignId, vouchers]);

  const availableVouchers = vouchers
    .map(v => ({
      id: v.userVoucherId,
      voucherCampaignId: v.voucherCampaignId,
      name: v.name,
      description: `Giảm ${v.percentDiscount}% tối đa ${v.maximumMoneyDiscount}`,
      discountValue: v.percentDiscount / 100,
      quantity: v.quantity - v.usedQuantity,
      maximumMoneyDiscount: v.maximumMoneyDiscount
    }));

  // Callback khi người dùng chọn voucher từ modal
  const applyVoucherFromList = (voucherId) => {
    const chosenVoucher = vouchers.find(v => v.userVoucherId === voucherId);
    if (chosenVoucher) {
      setAppliedVoucher(chosenVoucher);
      if (onVoucherSelected) {
        // Truyền campaignId, voucherCampaignId và userVoucherId nếu cần
        onVoucherSelected(campaignId, chosenVoucher.voucherCampaignId, chosenVoucher.userVoucherId);
      }
    }
    setShowVoucherModal(false);
  };

  return (
    <div className="bg-white shadow rounded-lg mb-6 p-4">

      {/* Table hiển thị các item của campaign */}
      <table className="table-fixed w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="w-[40%] px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
              Sản phẩm
            </th>
            <th className="w-[15%] px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
              Giá
            </th>
            <th className="w-[20%] px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
              Số lượng
            </th>
            <th className="w-[15%] px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
              Tổng
            </th>
            <th className="w-[10%] px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 ">
          {items.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          ))}
        </tbody>
      </table>

      {/* Khu vực voucher + hiển thị tổng */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 space-y-2 md:space-y-0">
        <div>
          <button
            className="bg-yellow-400 text-white px-4 py-2 rounded uppercase font-medium hover:bg-yellow-600"
            onClick={() => setShowVoucherModal(true)}
          >
            Chọn mã
          </button>
          {/* Hiển thị thông tin voucher đã chọn (nếu có) */}
          {appliedVoucher && (
            <div className="mt-2 text-sm bg-green-50 p-2 rounded flex items-center justify-between">
              <div>
                <p>
                  <strong>Mã áp dụng:</strong> {appliedVoucher.name}
                </p>
                <p>{appliedVoucher.description}</p>
              </div>
              <button
                className="ml-4 text-red-600 hover:text-red-800"
                onClick={() => {
                  if (onRemoveVoucher) {
                    onRemoveVoucher(campaignId, appliedVoucher.voucherCampaignId, appliedVoucher.userVoucherId);
                  }
                  setAppliedVoucher(null);
                }}
              >
                X
              </button>
            </div>
          )}
        </div>

        <div className="text-right">
          <div className="flex justify-between mb-1 gap-x-32">
            <p className="text-left">Tạm tính:</p>
            <p className="text-right font-semibold">{formatMoney(block.tempTotal)}</p>
          </div>
          <div className="flex justify-between mb-1 gap-x-32">
            <p className="text-left">Giảm giá:</p>
            <p className="text-right font-semibold">-{formatMoney(block.discountMoney)}</p>
          </div>
          <div className="flex justify-between text-lg font-semibold gap-x-32">
            <p className="text-left">Tổng cộng:</p>
            <p className="text-right">{formatMoney(block.total)}</p>
          </div>
        </div>
      </div>

      {/* Modal chọn voucher riêng cho khung này */}
      {showVoucherModal && (
        <VoucherModal
          vouchers={availableVouchers}
          applyVoucherFromList={applyVoucherFromList}
          onClose={() => setShowVoucherModal(false)}
        />
      )}
    </div>
  );
}

export default CampaignBlock;
