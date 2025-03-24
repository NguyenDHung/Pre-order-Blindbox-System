import React, { useState, useEffect } from 'react';
import { PlusCircleOutlined, MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatMoney } from '../../utils/FormatMoney';
import { Typography } from "antd";
function CartItem({ item, onUpdateQuantity, onRemoveItem }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const { Text } = Typography;
  // Mỗi khi props.item.quantity thay đổi (do fetchCarts() trả về kết quả mới),
  // ta cập nhật lại state local.
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const imageUrl = item.blindBox?.images?.mainImage?.url || '';
  const name = item.blindBox?.name || '';

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img
            className="w-16 h-16 border border-gray-200 rounded"
            src={imageUrl}
            alt="Product"
          />
          <div className="ml-4">
            <p className="text-gray-700 line-clamp-2"><Text className="font-medium text-md" >{name}</Text></p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-gray-900 "><Text className="font-medium ml-2 flex justify-center text-lg" >{formatMoney(item.price)}</Text></span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2 ml-6">
          <button
            onClick={() => onUpdateQuantity(item.preorderCampaignId, -1)}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            <MinusCircleOutlined />
          </button>
          <input
            type="text"
            name="qty"
            value={quantity}
            readOnly
            className="h-full py-2 w-16 text-center border-t border-b border-gray-300"
          />
          <button
            onClick={() => onUpdateQuantity(item.preorderCampaignId, 1)}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            <PlusCircleOutlined />
          </button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-gray-900">
          <Text className="font-medium  flex justify-center text-lg" >{formatMoney(item.amount)}</Text>
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <DeleteOutlined
          className="cursor-pointer flex justify-center"
          onClick={() => onRemoveItem(item.preorderCampaignId)}
        />
      </td>
    </tr>
  );
}

export default CartItem;
