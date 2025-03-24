import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetAllOrderDetailsByOrderID } from "../../../api/OrderDetail/ApiOrderDetail";
import { GetOrderById } from "../../../api/Order/ApiOrder";
import OrderTrackingSteps from "../../../components/Steps/OrderTrackingSteps";
import { Breadcrumb, Card, Spin, Tag } from "antd";
import { HomeOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import TableListOrderDetail from "../../../components/OrderDetails/TableListOrderDetail";
import { GetUserVoucherById } from "../../../api/UserVoucher/ApiUserVoucher";
function ViewDetailOrder() {
  const { id } = useParams();
  const [orderInformation, setOrderInformation] = useState();
  const [userVoucherById, setUserVoucherById] = useState({
  });
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const getDetailOrder = async () => {
    var responseOrderDetails = await GetAllOrderDetailsByOrderID(id);
    var responseOrderInformation = await GetOrderById(id);
    var userVoucher = await GetUserVoucherById(responseOrderInformation.userVoucherId);
    setUserVoucherById(userVoucher);
    setOrderInformation(responseOrderInformation);
    setOrderDetails(responseOrderDetails);
    setLoading(false);
  };
  useEffect(() => {
    getDetailOrder();
  }, []);
  const totalAmount = orderDetails.reduce((acc, item) => acc + item.amount, 0);

  const discountAmount =
    userVoucherById &&
    totalAmount * (userVoucherById.percentDiscount / 100) >
      userVoucherById.maximumMoneyDiscount
      ? userVoucherById.maximumMoneyDiscount
      : totalAmount * (userVoucherById?.percentDiscount / 100) || 0;
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
        <div>
          <Spin />
        </div>
      ) : (
        <div className="py-2">
          <h2 className="text-2xl mb-2">Chi tiết đơn hàng #{id}</h2>
          <Card title="Trạng thái của đơn hàng">
            <OrderTrackingSteps
              key={"OrderTracking"}
              TypeOfOrder={"Confirmed"}
              status={orderInformation.status}
            />
          </Card>
          <div className="grid grid-cols-12">
            <div className="col-span-9">
              <Card title="Thông tin người nhận đơn hàng" bordered={true}>
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
            <div className="col-span-3">
              <Card title="Thanh toán">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h2 className="text-lg font-bold mb-2">Thanh toán</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p>Tổng cộng</p>
                      <p>
                        {totalAmount}
                        VND
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p>
                        Giảm giá (
                        {userVoucherById.length === 0
                          ? "0"
                          : userVoucherById.percentDiscount}
                        %)
                      </p>
                      <p>
                        ({discountAmount})
                        VND
                      </p>
                    </div>
                    <div className="flex justify-between font-bold">
                      <p>Tổng tiền sau cùng</p>
                      <p>{orderInformation.amount} VND</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewDetailOrder;
