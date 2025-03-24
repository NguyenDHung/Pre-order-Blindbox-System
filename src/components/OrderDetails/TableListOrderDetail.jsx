function TableListOrderDetail({ orderDetails }) {
  return (
    <div>
      <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border border-gray-200 text-center">
              Item
            </th>
            <th className="py-3 px-4 border border-gray-200 text-center">
              Size
            </th>
            <th className="py-3 px-4 border border-gray-200 text-center">
              Quantity
            </th>
            <th className="py-3 px-4 border border-gray-200 text-center">
              Price
            </th>
            <th className="py-3 px-4 border border-gray-200 text-center">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((orderDetail) => (
            <tr key={orderDetail.orderDetailId+"OrderDetail"} className="border-t">
              <td className="py-3 px-4 flex items-center">
                <img
                  src={orderDetail.blindBox.images.mainImage.url}
                  className="h-[150px] mr-2 rounded-md"
                />
                <div>
                  <p className="font-medium">{orderDetail.blindBox.name}</p>
                  {/* <p className="text-gray-500 text-sm">{product.category}</p> */}
                </div>
              </td>
              <td className="py-3 px-4 text-center">
                <span className={`px-3 py-1 rounded-lg `}>
                  {orderDetail.blindBox.size}
                </span>
              </td>
              <td className="py-3 px-4 text-center">{orderDetail.quantity}</td>
              <td className="py-3 px-4 text-center">
                {orderDetail.unitEndCampaignPrice}
              </td>
              <td className="py-3 px-4 text-center">{orderDetail.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableListOrderDetail;
