import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  GetAllOrderTempDetailsByTempOrderID,
} from "../../../api/OrderDetail/ApiOrderDetail";
import { GetOrderById, GetTempOrderById } from "../../../api/Order/ApiOrder";
import OrderTrackingSteps from "../../../components/Steps/OrderTrackingSteps";
import { Breadcrumb, Card, Spin, Tag } from "antd";
import { HomeOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import TableListOrderDetail from "../../../components/OrderDetails/TableListOrderDetail";
import { GetUserVoucherById } from "../../../api/UserVoucher/ApiUserVoucher";
import { formatShortVND } from "../../../utils/FormatMoney";

function ViewPendingOrderDetail() {
  const { id } = useParams();
  const [orderInformation, setOrderInformation] = useState(null);
  const [userVoucherById, setUserVoucherById] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDetailOrder = async () => {
    try {
      setLoading(true);
      const responseOrderDetails = await GetAllOrderTempDetailsByTempOrderID(
        id
      );
      const responseOrderInformation = await GetTempOrderById(id);
      const getVoucherDetail = await GetUserVoucherById(
        responseOrderInformation.userVoucherId
      );
      setUserVoucherById(getVoucherDetail);
      setOrderInformation(responseOrderInformation);
      setOrderDetails(responseOrderDetails);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetailOrder();
  }, [id]); // Thêm id vào dependency array để cập nhật khi thay đổi

  const totalAmount =
    orderDetails?.length > 0
      ? orderDetails.reduce((acc, item) => acc + item.amount, 0)
      : 0;

  const discountAmount = userVoucherById?.percentDiscount
    ? Math.min(
        totalAmount * (userVoucherById.percentDiscount / 100),
        userVoucherById.maximumMoneyDiscount
      )
    : 0;

  return (
    <div className="max-w-screen-xl w-full mx-auto min-h-screen">
      <Breadcrumb
        items={[
          {
            title: (
              <Link to="/">
                <HomeOutlined />
                <span className="ml-1">Trang chủ</span>
              </Link>
            ),
          },
          {
            title: (
              <Link to="/my-order">
                <ShoppingOutlined />
                <span className="ml-1">Đơn hàng của tôi</span>
              </Link>
            ),
          },
          {
            title: <span className="ml-1">Xem chi tiết đơn hàng</span>,
          },
        ]}
      />

      {loading ? (
        <div className="flex justify-center py-10">
          <Spin />
        </div>
      ) : (
        orderInformation && (
          <div className="py-2">
            <h2 className="text-2xl mb-2">Chi tiết đơn hàng #{id}</h2>
            <Card title="Trạng thái của đơn hàng">
              <OrderTrackingSteps
                key="OrderTracking"
                TypeOfOrder="pending"
                status={orderInformation.status}
              />
            </Card>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8">
                <Card title="Thông tin người nhận đơn hàng" bordered>
                  <p>
                    <b>Người nhận:</b> {orderInformation.receiver}
                  </p>
                  <p>
                    <b>SĐT:</b> {orderInformation.receiverPhone}
                  </p>
                  <p>
                    <b>Địa chỉ giao hàng:</b> {orderInformation.receiverAddress}
                  </p>
                  <p>
                    <b>Ngày đặt hàng:</b> {orderInformation.createdDate}
                  </p>
                  <p>
                    <b>Tổng tiền:</b> {orderInformation.amount.toLocaleString()}{" "}
                    VND
                  </p>
                </Card>
                <Card title="Các sản phẩm được mua">
                  <TableListOrderDetail orderDetails={orderDetails} />
                </Card>
              </div>
              <div className="col-span-4">
                <Card title="Thanh toán">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-bold mb-2">Thanh toán</h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <p>Tổng cộng</p>
                        <p>{totalAmount.toLocaleString()} VND</p>
                      </div>
                      <div className="flex justify-between">
                        <p>
                          Giảm giá ({userVoucherById.percentDiscount || 0}% tối đa {formatShortVND(userVoucherById.maximumMoneyDiscount)} )
                        </p>
                        <p>({discountAmount.toLocaleString()}) VND</p>
                      </div>
                      <div className="flex justify-between font-bold">
                        <p>Tổng tiền sau cùng</p>
                        <p>
                          {(totalAmount - discountAmount).toLocaleString()} VND
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default ViewPendingOrderDetail;
