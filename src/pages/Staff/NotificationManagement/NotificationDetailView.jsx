import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { GetNotificationById } from '../../../api/Notification/ApiNotification';
import { Bell } from 'lucide-react';
import { CountNotificationIsNotRead } from '../../../api/Notification/ApiNotification';

const NotificationDetailView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const [notificationById, setNotificationById] = useState([]);
    const [createdDate, setCreatedDate] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const fetchNotificationById = useCallback(async () => {
        try {
            const result = await GetNotificationById(id);
            if (result) {
                console.log("result: ", result)
                setNotificationById(result);
                setCreatedDate(formatDate(result.createdDate));
                console.log("unreadCount: ", unreadCount)
            }

        } catch (error) {
            console.error("Fetch Notification By Id Error:", error);
            setNotificationById([]);
        }
    })
    const fetchUnreadCount = useCallback(async () => {
        try {
            const result = await CountNotificationIsNotRead();
            setUnreadCount(result);
        } catch (error) {
            console.error("Fetch unread count Error:", error);
            setUnreadCount(0);
        }
    }, []);
    useEffect(() => {
        fetchNotificationById()
        fetchUnreadCount()
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
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-6">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Thông báo nhân viên</h1>
                    <div className="relative">
                        <Bell className="h-6 w-6 text-gray-600" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {unreadCount > 99 ? '99+' : unreadCount}
                            </span>
                        )}
                    </div>
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
}

export default NotificationDetailView