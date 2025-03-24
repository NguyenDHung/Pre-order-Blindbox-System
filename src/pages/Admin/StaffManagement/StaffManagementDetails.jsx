import { React, useState, useEffect } from "react";
import { GetActiveStaff } from "../../../api/StaffManagement/ApiStaffManager";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, User, Phone } from "lucide-react";

const StaffManagementDetails = () => {
    const { id } = useParams();
    const [detailStaff, setDetailStaff] = useState({});

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const data = await GetActiveStaff(id);
                setDetailStaff(data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchStaff();
    }, [id]);

    return (
        <div className="w-full min-h-screen p-12 bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center gap-5 mb-8">
                <Link to="/admin/staffmanagement">
                    <ArrowLeft className="w-10 h-10 text-gray-600 hover:text-black transition" />
                </Link>
                <h1 className="text-4xl font-bold text-gray-800">Thông tin nhân viên</h1>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center gap-6">
                {/* Avatar */}
                <img
                    src={detailStaff.thumbnail || "https://via.placeholder.com/150"}
                    alt="Staff Avatar"
                    className="w-48 h-48 rounded-lg shadow-md border"
                />

                {/* Staff Information */}
                <div className="w-full max-w-2xl space-y-8">
                    <div className="flex items-center gap-6 border-b pb-4">
                        <User className="w-10 h-10 text-gray-500" />
                        <div>
                            <p className="text-gray-800 text-xl font-bold">Họ và tên</p>
                            <p className="text-2xl font-medium text-gray-900">{detailStaff.fullName}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 border-b pb-4">
                        <Phone className="w-10 h-10 text-gray-500" />
                        <div>
                            <p className="text-gray-800 text-xl font-bold">Số điện thoại</p>
                            <p className={`text-2xl font-medium px-3 py-1 rounded ${detailStaff.phone ? "text-gray-900" : "text-red-500 border border-red-500"}`}>
                                {detailStaff.phone || "None"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 border-b pb-4">
                        <Mail className="w-10 h-10 text-gray-500" />
                        <div>
                            <p className="text-gray-800 text-xl font-bold">Email</p>
                            <p className="text-2xl font-medium text-gray-900">{detailStaff.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 border-b pb-4">
                        <MapPin className="w-10 h-10 text-gray-500" />
                        <div>
                            <p className="text-gray-800 text-xl font-bold">Địa Chỉ</p>
                            <p className="text-2xl font-medium text-gray-900">{detailStaff.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffManagementDetails;
