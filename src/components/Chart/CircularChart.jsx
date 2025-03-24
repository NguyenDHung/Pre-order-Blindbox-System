import React from "react";
import { formatMoney } from "../../utils/FormatMoney";

const CircularChart = ({ value }) => {
    const balanceString = formatMoney(value); // Chuyển số tiền thành chuỗi có định dạng tiền tệ
    const length = balanceString.length; // Độ dài chuỗi
    const size = Math.min(150 + length * 10, 250); // Tính kích thước dựa trên độ dài (giới hạn tối đa 250px)

    return (
        <div className="flex items-center justify-center">
            <div className="relative" style={{ width: size, height: size }}>
                <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                    {/* Vòng tròn nền */}
                    <circle cx="50" cy="50" r="45" stroke="#E0E0E0" strokeWidth="6" fill="none" />

                    {/* Vòng tròn màu cam (ví dụ tỷ lệ 40%) */}
                    <circle cx="50" cy="50" r="45" stroke="#E67E22" strokeWidth="6" fill="none" strokeDasharray="40,100" />

                    {/* Vòng tròn màu xanh (ví dụ tỷ lệ 60%) */}
                    <circle cx="50" cy="50" r="45" stroke="#3498DB" strokeWidth="6" fill="none" strokeDasharray="60,100" strokeDashoffset="-40" />
                </svg>

                {/* Hiển thị số tiền bên trong */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-900">
                    <p className="font-bold" style={{ fontSize: Math.min(16 + length, 28) }}>
                        {balanceString}
                    </p>
                    <p className="text-sm text-gray-500">Số dư hiện tại</p>
                </div>
            </div>
        </div>
    );
};

export default CircularChart;
