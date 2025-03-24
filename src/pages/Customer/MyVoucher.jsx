import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { Link } from 'react-router-dom';
import { GetAllUserVoucher } from "../../api/UserVoucher/ApiUserVoucher";
import GradientButton from "../../components/Buttons/GradientButton";
import { formatMoney } from '../../utils/FormatMoney';

function MyVoucher() {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm gọi API lấy voucher của người dùng
  const fetchAllUserVouchers = async () => {
    try {
      setLoading(true);
      const data = await GetAllUserVoucher();
      setVouchers(data);
    } catch (error) {
      console.log(">>> Error fetching user vouchers: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUserVouchers();
  }, []);

  return (
    <section className="bg-gray-100 py-12 md:min-h-[500px]">
      {/* Loại bỏ background image, chỉ sử dụng màu nền đơn giản */}
      <div className="relative p-8 rounded-lg bg-white">
        <div className="relative">
          <h2 className="text-[36px] text-center text-black mb-10 font-bold uppercase">
            Danh sách phiếu giảm giá của bạn
          </h2>

          <div className="grid grid-cols-12 gap-4">
            {loading ? (
              <div className="col-span-12 flex justify-center items-center">
                <Spin />
              </div>
            ) : vouchers && vouchers.length > 0 ? (
              vouchers.map((voucher) => (
                <div key={voucher.userVoucherId} className="col-span-12 md:col-span-4">
                  <div className="relative card-con grid grid-cols-12 z-10">
                    {/* Vùng hiệu ứng gradient */}
                    <div
                      className="relative z-[11] w-full col-span-3 min-h-full rounded-lg bg-gradient-to-b from-[#FBA518] to-[#A89C29] backdrop-blur-lg shadow-lg"
                      style={{
                        maskImage:
                          "radial-gradient(circle at 10px center, transparent 10px, red 10.5px)",
                        maskPosition: "-10px center",
                        maskSize: "100% 48px",
                      }}
                    ></div>
                    {/* Nội dung voucher */}
                    <div className="relative w-full col-span-9 h-full bg-yellow-100 -ml-4 z-20 rounded-r-lg border-l-2 border-[#F9CB43] p-2 text-[#000]">
                      <h3 className="text-[#000] text-lg">
                        <b>{voucher.name}</b>
                      </h3>
                      <p>Giảm giá {voucher.percentDiscount}% tối đa {formatMoney(voucher.maximumMoneyDiscount)}</p>
                      <p className="mb-2">Ngày hết hạn:{" "}
                        {new Date(voucher.expiredDate).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}</p>
                      {/* Badge hiển thị phần trăm giảm giá */}
                      <div className="absolute badge z-[22] -right-2 top-4 w-fit h-fit bg-[#cf1e1e] py-2 px-4 rounded-lg border-2 border-white">
                        <p className="text-white font-bold">X{voucher.quantity - voucher.usedQuantity}</p>
                      </div>
                      <Link to="/">
                        <GradientButton text="Sử dụng" disabled={false} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-12 text-center">
                <p>Hiện chưa có voucher nào.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyVoucher;
