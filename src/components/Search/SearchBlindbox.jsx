import React, { useCallback, useEffect, useState } from "react";
import { Modal, Card, Button, Spin } from "antd";
import { GetTheActiveBlindBox } from "../../api/BlindBox/ApiBlindBox";
import { Empty } from "antd";
import { Input } from "antd";

const { Search } = Input;
const ProductCardModal = ({ setLoadMainProduct }) => {
  const [visible, setVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [blindboxSearch, setBindboxSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const GetBlindboxesByKeyword = async () => {
    const result = await GetTheActiveBlindBox(6, 1, searchKeyword);
    setBindboxSearch(result.data);
    setIsLoading(false);
  };
  const HandleChangeData = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
    setIsLoading(true);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedOnChange = useCallback(debounce(HandleChangeData, 300), []);
  const handleSelectChange = (item) => {
    setSearchKeyword("");
    setVisible(false);
    setLoadMainProduct(item);
  };
  useEffect(() => {
    GetBlindboxesByKeyword();
  }, []);
  useEffect(() => {
    GetBlindboxesByKeyword();
  }, [searchKeyword]);
  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Chọn sản phẩm
      </Button>

      <Modal open={visible} onCancel={() => setVisible(false)} footer={null}>
        <div className="p-4 min-h-[400px]">
          <h2 className="text-2xl font-bold mb-4">
            Chọn sản phẩm cho chiến dịch
          </h2>
          <Search
            placeholder="Nhập từ khóa cần tìm"
            allowClear
            size="large"
            onChange={debouncedOnChange}
            style={{ width: "100%" }}
            className="mb-2"
          />

          {isLoading ? (
            <Spin />
          ) : blindboxSearch != null && blindboxSearch.length > 0 ? (
            blindboxSearch.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelectChange(item)}
                className="cursor-pointer rounded p-2 my-2 flex items-center border-2 border-gray-400 hover:border-orange-600"
              >
                <img
                  src={item.images.mainImage?.url}
                  alt={item.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    marginRight: "16px",
                  }}
                />
                <div>
                  <p
                    className="text-lg line-clamp-1"
                    style={{ margin: 0, fontWeight: "bold" }}
                  >
                    {item.name}
                  </p>
                  {/* Hiển thị thêm thông tin nếu cần, ví dụ giá, mô tả, v.v. */}
                  <p className="text-sm line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div>
              <Empty />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ProductCardModal;
