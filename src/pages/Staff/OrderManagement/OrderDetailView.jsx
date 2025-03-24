import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
    ArrowLeftOutlined,
    ShoppingOutlined,
    TruckOutlined,
    InboxOutlined,
    UserOutlined,
    HomeOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import { GetOrderByIdForStaff } from '../../../api/Order/ApiOrder';
import { GetAllOrderDetailsByOrderID } from '../../../api/OrderDetail/ApiOrderDetail';
import { GetUserVoucherById } from '../../../api/UserVoucher/ApiUserVoucher';
import { GetInformationOfUser } from '../../../api/User/ApiAuthentication';
import { UpdateStatusInOrder } from '../../../api/Order/ApiOrder';

const OrderDetailView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [orderById, setOrderById] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [userVoucherById, setUserVoucherById] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [updatedStatus, setUpdatedStatus] = useState(null);

    const fetchOrderById = useCallback(async () => {
        try {
            const result = await GetOrderByIdForStaff(id);
            if (result) {
                setOrderById(result)
                handleProgress(result)
                fetchUserVoucher(result)
                fetchCustomer(result)
                setUpdatedStatus(result.status)
            }
        } catch (error) {
            console.error("Fetch Orders By Id Error:", error);
            setOrderById();
        }

    })

    const fetchOrderDetails = useCallback(async () => {
        try {
            const result = await GetAllOrderDetailsByOrderID(id, 1, 10);
            if (result) {
                setOrderDetails(result)
            }
        } catch (error) {
            console.error("Fetch Orders By Id Error:", error);
            setOrderDetails();
        }
    })

    const fetchUserVoucher = useCallback(async (data) => {
        try {
            const result = await GetUserVoucherById(data.userVoucherId);
            if (result) {
                setUserVoucherById(result)
            }
        } catch (error) {
            console.error("Fetch User Voucher By Id Error:", error);
            setUserVoucherById();
        }
    })

    const fetchCustomer = useCallback(async (data) => {
        try {
            const result = await GetInformationOfUser(data.customerId);
            if (result) {
                setCustomer(result)
            }
        } catch (error) {
            console.error("Fetch User Voucher By Id Error:", error);
            setCustomer();
        }
    })

    const initialProgress = (data) => {
        const progressArray = [
            { stateProcessing: 'Placed', state: 0 },
            { stateProcessing: 'Processing', state: 0 },
            { stateProcessing: 'Delivering', state: 0 },
            { stateProcessing: 'Delivered', state: 0 },
        ]; let step
        if (data === undefined) return progressArray;
        else {
            switch (data.status) {
                case 'Placed':
                    step = 2
                    break;
                case 'Processing':
                    step = 3
                    break;
                case 'Delivering':
                    step = 4
                    break;
                case 'Delivered':
                    step = 6
                    break;
            }
        }
        for (let index = 0; index < step && index < progressArray.length; index++) {
            if (index === (step - 1))
                progressArray[index] = { ...progressArray[index], state: 1 };
            else progressArray[index] = { ...progressArray[index], state: 2 };
        }
        return progressArray;
    };
    const [progress, setProgress] = useState(initialProgress([]));
    const getWidthFromState = (state) => {
        if (state === 0) return '0%';
        if (state === 1) return '50%';
        if (state === 2) return '100%';
        return '0%';
    };
    const handleProgress = (data) => {
        const result = initialProgress(data);
        setProgress(result);
    }
    const getBgClassFromState = (state) => {
        if (state === 0) return 'bg-white';
        if (state === 1) return 'bg-orange-400';
        if (state === 2) return 'bg-blue-500';
        return 'bg-white';
    };
    const handleStatusClick = (index) => {
        setProgress((prevProgress) => {
            const newProgress = prevProgress.map(item => ({ ...item }));

            // Xác định trạng thái đơn hàng hiện tại
            const currentOrderIndex = newProgress.findIndex(step => step.stateProcessing === orderById.status);

            // Chỉ cho phép click vào trạng thái kế tiếp của trạng thái đơn hàng hiện tại
            if (index !== currentOrderIndex + 1) return prevProgress;

            // Toggle trạng thái giữa 1 (cam) và 2 (xanh)
            if (newProgress[index].state === 1) {
                newProgress[index].state = 2;

                // Nếu trạng thái tiếp theo tồn tại và đang là 0, chuyển nó thành 1 (màu cam)
                if (index + 1 < newProgress.length && newProgress[index + 1].state === 0) {
                    newProgress[index + 1].state = 1;
                }

                // Cập nhật trạng thái mới để lưu
                setUpdatedStatus(newProgress[index].stateProcessing);
            }
            else if (newProgress[index].state === 2) {
                newProgress[index].state = 1;

                // Nếu trạng thái tiếp theo đang là 1, reset nó về 0
                if (index + 1 < newProgress.length && newProgress[index + 1].state === 1) {
                    newProgress[index + 1].state = 0;
                }

                // Cập nhật trạng thái mới để lưu
                setUpdatedStatus(newProgress[currentOrderIndex].stateProcessing);
            }

            return newProgress;
        });
    };

    const isClickable = (index) => {
        // Nếu không ở chế độ edit, không cho phép chỉnh sửa
        if (!editMode) return false;

        // Xác định trạng thái đơn hàng hiện tại
        const currentOrderIndex = progress.findIndex(step => step.stateProcessing === orderById.status);

        // Chỉ trạng thái ngay sau trạng thái đơn hàng hiện tại mới có thể bấm
        return index === (currentOrderIndex + 1);
    };
    const handleSave = async () => {
        try {
            console.log("Updated Status:", updatedStatus);
            const updatedOrder = await UpdateStatusInOrder(id, updatedStatus);
            if (updatedOrder) {
                // Cập nhật UI với trạng thái mới
                setEditMode(false); // Tắt chế độ chỉnh sửa
                fetchOrderById();
            } else {
                console.error("Không thể cập nhật trạng thái đơn hàng");
            }
        } catch (error) {
            console.error("Cập nhật trạng thái đơn hàng thất bại:", error);
        }
    };
    useEffect(() => {
        fetchOrderById();
        fetchOrderDetails();
    }, [])


    return (
        <>
            <div className='h-screen overflow-y-auto'>
                <div className="sticky top-0 z-10 bg-white shadow-md rounded-lg p-2 flex justify-between items-center m-2 w-full max-w-[1176px] mx-auto">
                    <div>
                        <h1 className="text-2xl font-bold"><button className="bg-white p-4 rounded-lg shadow mb-4 border-2 border-black w-14" onClick={() => navigate(-1)}><ArrowLeftOutlined /></button>  #{id}</h1>
                        <p className="text-gray-500">Lịch sử đơn hàng / Chi tiết đơn hàng / #{id} - {orderById.createdDate}</p>
                    </div>
                    <div className="flex space-x-2">
                        {editMode ? (
                            <>
                                <button className="bg-red-600 text-white px-4 py-2 rounded-lg" onClick={() => {
                                    setEditMode(false)
                                    fetchOrderById()
                                }}>Hủy</button>
                                <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleSave}>
                                    Lưu
                                </button>
                            </>

                        ) : (
                            <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg border border-gray-600"
                                onClick={() => setEditMode(true)}>
                                Chỉnh sửa đơn hàng
                            </button>
                        )}
                    </div>
                </div>
                <div className="mx-[5px]">

                    <div className='flex justify-around'>
                        <div className='w-[70%]'>
                            <div className="bg-white p-4 rounded-lg shadow mb-4">
                                <h2 className="text-lg font-bold mb-2">Tiến độ</h2>
                                <div className="flex justify-between items-stretch ">
                                    {progress.map((step, index) => (
                                        <div
                                            key={index}
                                            className={`flex-1 text-left rounded-lg shadow p-4 m-1 transition duration-200 
                                    ${isClickable(index) ? 'cursor-pointer hover:shadow-lg' :
                                                    `cursor-not-allowed ${() => { editMode ? `` : `opacity-50` }} `}`}
                                            onClick={() => isClickable(index) && handleStatusClick(index)}
                                        >
                                            <span>
                                                {index === 0 ? <ShoppingOutlined /> :
                                                    index === 1 ? <InboxOutlined /> :
                                                        index === 2 ? <TruckOutlined /> :
                                                            <CheckCircleOutlined />}
                                            </span>
                                            <p className="text-sm font-medium">{step.stateProcessing}</p>
                                            <div className="w-full max-w-xl mt-2">
                                                <div className="relative pt-1">
                                                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                                                        <div style={{ width: getWidthFromState(step.state) }}
                                                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getBgClassFromState(step.state)}`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow mb-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-bold">Sản phẩm</h2>
                                </div>
                                <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="py-3 px-4 border border-gray-200 text-center">Sản phẩm</th>
                                            <th className="py-3 px-4 border border-gray-200 text-center">Kích thước</th>
                                            <th className="py-3 px-4 border border-gray-200 text-center">Số lượng</th>
                                            <th className="py-3 px-4 border border-gray-200 text-center">Giá</th>
                                            <th className="py-3 px-4 border border-gray-200 text-center">Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderDetails.map((orderDetail) => (
                                            <tr key={orderDetail.orderDetailId} className="border-t">
                                                <td className="py-3 px-4 flex items-center">
                                                    <img src={orderDetail.blindBox.images.mainImage.url} className="w-10 h-10 mr-2 rounded-md" />
                                                    <div>
                                                        <p className="font-medium">{orderDetail.blindBox.name}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-center">{orderDetail.blindBox.size}</td>
                                                <td className="py-3 px-4 text-center">{orderDetail.quantity}</td>
                                                <td className="py-3 px-4 text-center">{orderDetail.unitEndCampaignPrice}</td>
                                                <td className="py-3 px-4 text-center">{orderDetail.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className='w-[25%]'>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h2 className="text-lg font-bold mb-2">Thanh toán</h2>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <p>Tạm tính</p>
                                            <p>{orderDetails.reduce((acc, item) => acc + item.amount, 0)} VND</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p>Giảm giá ({userVoucherById.length === 0 ? '0' : userVoucherById.percentDiscount}%)</p>
                                            <p>({userVoucherById.length === 0 ? '0' :
                                                (orderDetails.reduce((acc, item) => acc + item.amount, 0)) * (userVoucherById.percentDiscount / 100) > userVoucherById.maximumMoneyDiscount
                                                    ? userVoucherById.maximumMoneyDiscount : (orderDetails.reduce((acc, item) => acc + item.amount, 0)) * (userVoucherById.percentDiscount / 100)}) VND
                                            </p>
                                        </div>
                                        <div className="flex justify-between font-bold">
                                            <p>Tổng cộng</p>
                                            <p>{orderById.amount} VND</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-md">
                                <h2 className="text-lg font-bold mb-2">Khách hàng</h2>
                                <p className="text-gray-500 text-sm mb-4">Thông tin chi tiết</p>

                                <div className="space-y-4">
                                    <div className="bg-gray-100 p-4 rounded-lg">
                                        <h3 className="font-bold flex items-center">
                                            <UserOutlined className="mr-2 text-gray-500" /> Thông tin chung
                                        </h3>
                                        <p className="text-gray-700 mt-2">• {customer.fullName}</p>
                                        <p className="text-gray-700">• {customer.email}</p>
                                        {customer.phone && (
                                            <p className="text-gray-700">• {customer.phone}</p>
                                        )}
                                    </div>

                                    <div className="bg-gray-100 p-4 rounded-lg">
                                        <h3 className="font-bold flex items-center">
                                            <HomeOutlined className="mr-2 text-gray-500" /> Thông tin giao hàng
                                        </h3>
                                        <p className="text-gray-700 mt-2">• {orderById.receiver}</p>
                                        <p className="text-gray-700">• {orderById.receiverAddress}</p>
                                        <p className="text-gray-700">• {orderById.receiverPhone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetailView