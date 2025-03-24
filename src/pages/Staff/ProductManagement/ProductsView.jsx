import { Pagination, Space, Spin, Table, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import {
  DeleteBlindBoxById,
  GetTheActiveBlindBox,
} from "../../../api/BlindBox/ApiBlindBox";
import noThumbnailImage from "../../../assets/noThumbnailImage.jpg";
import { Modal } from "antd";
import { Link } from "react-router";
import useFetchDataPagination from "../../../hooks/useFetchDataPagination";
import { formatMoney } from "../../../utils/FormatMoney";
const ProductsView = () => {
  const [pageSize, setPageSize] = useState(4);
  const [pageIndex, setPageIndex] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  // useCallback để truyền fetchCallback có tham số
  const fetchBlindBoxes = useCallback(
    () => GetTheActiveBlindBox(pageSize, pageIndex),
    [pageSize, pageIndex]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, refetch, pagination } = useFetchDataPagination(fetchBlindBoxes, [
    pageSize,
    pageIndex,
  ]);
  const showModal = (id) => {
    console.log(id);
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const result = await DeleteBlindBoxById(selectedId);
    setIsModalOpen(false);
    refetch();
  };

  const handleCancel = () => {
    setSelectedId(null);
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Ảnh chính",
      dataIndex: ["images", "mainImage", "url"], // Lấy ảnh từ nested object
      key: "mainImage",
      render: (url) => (
        <img
          src={url ? url : noThumbnailImage}
          alt="Main"
          className="h-[150px] w-[150px] object-contain rounded-md "
        />
      ),
    },

    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    { title: "Giá niêm yết", dataIndex: "listedPrice", key: "listedPrice", render:(listedPrice)=>formatMoney(listedPrice)},
    { title: "Kích cỡ", dataIndex: "size", key: "size" },
    {
      title: "Tạo vào lúc",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link
            to={"/staff/product/edit/" + record.blindBoxId}
            className="flex bg-blue-600 flex-nowrap w-max min-h-[40px] py-4 px-6  rounded-xl text-white"
          >
          Chỉnh sửa
          </Link>
          <button
            className="px-10 py-4 border bg-transparent rounded-xl border-red-600 text-red-600 hover:border-red-800 hover:text-red-800"
            onClick={() => {
              showModal(record.blindBoxId);
            }}
          >
            Xoá
          </button>
          <Modal
            title={
              <div className="flex items-center text-red-600">
                <span>Xác nhận xóa sản phẩm</span>
              </div>
            }
            open={isModalOpen}
            onCancel={handleCancel}
            onOk={handleOk}
            footer={(_, { OkBtn, CancelBtn }) => (
              <>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancel();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Từ chối
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOk();
                    }}
                    className="border border-red-600 text-red-600 hover:bg-red-700 hover:text-white px-4 py-2 rounded-md"
                  >
                    Xoá
                  </button>
                </div>
              </>
            )}
          >
             <div className="flex items-center">
    <ExclamationCircleOutlined className="text-red-500 text-2xl mr-3" />
    <Typography.Text className="text-gray-800 text-lg">
      Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác!
    </Typography.Text>
  </div>
          </Modal>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    console.log(pagination);
  }, [data]);
  return (
    <div className="w-full mx-auto mt-5 p-5 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Quản lý Blind box</h2>
        <div>
          <Link to={"/staff/product/create/"} className="text-lg bg-blue-600 text-white rounded-xl p-4 ">
            Thêm sản phẩm
          </Link>
        </div>
      </div>

      {/* Hiển thị khi đang tải dữ liệu */}
      {loading ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {/* Bảng dữ liệu */}
          <Table
            bordered={true}
            columns={columns}
            dataSource={data}
            pagination={false} // Ẩn phân trang mặc định của Ant Design
            rowKey="id"
            className="border rounded-md"
          />

          {/* Phân trang custom */}
          <div className="flex justify-end mt-4">
            <Pagination
              current={pagination.current}
              total={pagination.total}
              pageSize={pagination.pageSize}
              onChange={(page) => {
                setPageIndex(page);
              }}
              className="shadow-md p-2 rounded-md"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsView;
