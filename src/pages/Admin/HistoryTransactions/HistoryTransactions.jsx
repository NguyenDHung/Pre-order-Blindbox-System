import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
function HistoryTransactions() {
    const location = useLocation();
    const [selectedFilter, setSelectedFilter] = useState("All");


    // Xác định đường dẫn hiện tại và cập nhật bộ lọc
    useEffect(() => {
        const path = location.pathname.split("/").pop(); // Lấy phần cuối của URL
        if (path === "history-transactions" || path === "all") {
            setSelectedFilter("All");
        } else if (["recharge", "withdraw", "purchase", "refund"].includes(path)) {
            setSelectedFilter(path.charAt(0).toUpperCase() + path.slice(1));
        }
    }, [location.pathname]);

    return (
        <>
            {/* Navbar + Filter Section trên cùng một hàng */}
            <div className="w-full bg-white py-4 shadow-sm border-b">
                <div className="max-w-[1200px] mx-auto flex justify-between items-center px-10">
                    {/* Filter List (sang trái) */}
                    <div className="flex space-x-6">
                        {["All", "Recharge", "Withdraw", "Purchase", "Refund"].map((filter) => (
                            <Link
                                key={filter}
                                to={`/admin/history-transactions/${filter.toLowerCase()}`}
                                className={`text-lg font-semibold cursor-pointer ${selectedFilter === filter ? "text-orange-500" : "text-gray-500"
                                    }`}
                            >
                                {filter}
                            </Link>
                        ))}
                    </div>


                </div>
            </div>
        </>
    );
};

export default HistoryTransactions;
