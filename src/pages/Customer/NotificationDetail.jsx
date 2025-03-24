import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { GetNotificationById } from '../../api/Notification/ApiNotification';
import { CountNotificationIsNotRead } from '../../api/Notification/ApiNotification';

const NotificationDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [notificationById, setNotificationById] = useState([]);
    const [createdDate, setCreatedDate] = useState([]);
    const fetchNotificationById = useCallback(async () => {
        try {
            const result = await GetNotificationById(id);
            if (result) {
                console.log("result: ", result)
                setNotificationById(result);
                setCreatedDate(formatDate(result.createdDate));

                window.dispatchEvent(new Event('notificationRead'));
            }

        } catch (error) {
            console.error("Fetch Notification By Id Error:", error);
            setNotificationById([]);
        }
    })
    useEffect(() => {
        fetchNotificationById()
    }, []);

    const formatDate = (dateString) => {
        console.log("dateString: ", dateString)
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };


    return (
        <div className="bg-white h-auto">
            <div className="container mx-auto px-4 py-6">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Thông báo của khách hàng</h1>
                </header>
                <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b border-gray-200 flex items-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="mr-3 text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeftOutlined className="h-5 w-5" />
                        </button>
                        <h2 className="text-lg font-semibold">Chi tiết thông báo</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-medium text-gray-800">
                                {notificationById.title}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs ${notificationById.isRead ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                {notificationById.isRead ? 'Đã đọc' : 'Chưa đọc'}
                            </span>
                        </div>
                        <div className="mb-4 text-gray-500 text-sm">
                            Ngày tạo:  {createdDate}
                        </div>
                        <div className="text-gray-700 whitespace-pre-line">
                            {notificationById.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NotificationDetail