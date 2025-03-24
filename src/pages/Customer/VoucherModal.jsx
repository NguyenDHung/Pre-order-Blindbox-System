import React from 'react';

function VoucherModal({
  vouchers,
  applyVoucherFromList,
  onClose,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Chọn hoặc nhập mã</h2>

        {/* Danh sách voucher có sẵn */}
        <ul className="space-y-2">
          {vouchers.map((voucher) => (
            <li
              key={voucher.id}
              className="flex items-center justify-between p-2 border rounded"
            >
              <div>
                <p className="font-semibold">{voucher.name}</p>
                <p className="text-sm text-gray-600">{voucher.description}</p>
                <p className="text-sm text-blue-500">
                  Số lượng còn lại: <span className="font-bold">{voucher.quantity}</span>
                </p>
              </div>
              <button
                className={`bg-yellow-500 text-white px-3 py-1 rounded ${voucher.quantity <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                onClick={() => voucher.quantity > 0 && applyVoucherFromList(voucher.id)}
                disabled={voucher.quantity <= 0}
              >
                Chọn
              </button>
            </li>
          ))}
        </ul>

        {/* Nút đóng modal */}
        <button
          className="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded uppercase"
          onClick={onClose}
        >
          Đóng
        </button>
      </div>
    </div>
  );
}

export default VoucherModal;
