import React, { useState, useEffect, useCallback } from 'react';
import { Bell, CheckCircle, Circle } from 'lucide-react';
import { GetAllNotification } from '../../../api/Notification/ApiNotification';
import { Link } from 'react-router';
import { Pagination, Spin } from 'antd';
import { CountNotificationIsNotRead, MarkAllNotificationAsRead } from '../../../api/Notification/ApiNotification';

const NotificationsView = () => {
    const [notifications, setNotifications] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pagination, setPagination] = useState({
        PageSize: 5,
        TotalPage: 0,
        TotalCount: 0
    })
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchNotification = useCallback(async () => {
        setLoading(true);
        try {
            const result = await GetAllNotification(pageIndex, pagination.PageSize);
            if (result.status === 200) {
                const paginationData = JSON.parse(result?.headers?.get('x-pagination'))
                setPagination({
                    ...pagination,
                    TotalPage: paginationData.TotalPages,
                    TotalCount: paginationData.TotalCount
                })
            }
            setNotifications([...result.data]);
        } catch (error) {
            console.error("Fetch Notification Error:", error);
            setNotifications([]);
        } finally {
            setLoading(false);
        }
    }, [pagination.PageSize, pageIndex]);

    const fetchUnreadCount = useCallback(async () => {
        try {
            const result = await CountNotificationIsNotRead();
            setUnreadCount(result);
        } catch (error) {
            console.error("Fetch unread count Error:", error);
            setUnreadCount(0);
        }
    }, [notifications]);

    const handlePageChange = (page) => {
        setPageIndex(page);
    };
    const handleMarkAllAsRead = async () => {
        try {
            setLoading(true);
            await MarkAllNotificationAsRead();
            await fetchNotification();
            await fetchUnreadCount();
        } catch (error) {
            console.error("Error marking notifications as read:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNotification();
        fetchUnreadCount()
    }, [fetchNotification]);

    // Function to format date
    const formatDate = (dateString) => {
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
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Tất cả thông báo</h2>
                        <span><button className="text-sm text-blue-600 hover:text-blue-800 ml-4" onClick={handleMarkAllAsRead}>Đánh dấu tất cả đã đọc</button></span>
                    </div>
                    {loading ? (
                        <div className="flex justify-center">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200" key="1">
                            {notifications.length > 0 ? (
                                notifications.map(notification => (

                                    <Link
                                        to={`${notification.notificationId}`}
                                        key={notification.notificationId}
                                        state={{
                                            unreadCount: unreadCount,
                                        }}
                                        className={`block p-4 hover:bg-gray-50 cursor-pointer transition ${!notification.isRead ? 'bg-blue-50' : ''}`}
                                    >
                                        <div className="flex items-start" >
                                            <div className="flex-shrink-0 mt-1">
                                                {notification.isRead ? (
                                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <Circle className="h-5 w-5 text-blue-500" />
                                                )}
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className={`text-sm font-medium ${!notification.isRead ? 'text-blue-800' : 'text-gray-800'}`}>
                                                        {notification.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {formatDate(notification.createdDate)}
                                                    </p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                                    {notification.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    Không có thông báo nào
                                </div>
                            )}
                        </div>
                    )}
                    <div className="flex justify-between items-center mt-4 p-4 bg-white shadow rounded">
                        <Pagination
                            current={pageIndex}
                            total={pagination.TotalCount}
                            pageSize={pagination.PageSize}
                            onChange={handlePageChange
                            }
                            className="shadow-md p-2 rounded-md"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NotificationsView