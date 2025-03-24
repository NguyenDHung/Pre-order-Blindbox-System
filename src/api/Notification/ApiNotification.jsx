import { axiosConfigHeader } from "../axiosConfigHeader"
import api from "../instance"
const GetAllNotification = async (pageIndex, pageSize) => {
    try {
        var result = await api.get(`/Notification`, { ...axiosConfigHeader, params: { pageIndex, pageSize } });
        if (result.status === 200) {
            return result;
        }
    } catch (error) {
        console.log('>>> Api Get All Notification Error: ', error);
        return [];
    }
}

const GetNotificationById = async (notificationId) => {
    try {
        var result = await api.get(`/Notification/${notificationId}`, axiosConfigHeader);
        if (result.status === 200) {
            return result.data;
        }
    } catch (error) {
        console.log('>>> Api Get All Notification Error: ', error);
        return [];
    }
}

const CountNotificationIsNotRead = async () => {
    try {
        var result = await api.get(`/Notification/unread-count`, axiosConfigHeader);
        return result.data;
    } catch (error) {
        console.log('>>> Api Count unread Error: ', error);
        return [];
    }
}

const MarkAllNotificationAsRead = async () => {
    try {
        var result = await api.get(`/Notification/mark-read-all`, axiosConfigHeader);
        return result.data;
    } catch (error) {
        console.log('>>> Api mark all notification are read: ', error);
        return [];
    }
}
export { GetAllNotification, GetNotificationById, CountNotificationIsNotRead, MarkAllNotificationAsRead }