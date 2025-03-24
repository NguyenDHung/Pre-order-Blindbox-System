import { useCallback, useState } from "react";
import { Link } from "react-router";
import { GetCompletedBulkOrderCampaign } from "../../../api/Pre_orderCampaign/ApiPre_orderCampaign";
import { Button, Input, Modal, Pagination, Space, Spin, Table } from "antd";
import useFetchDataPagination from "../../../hooks/useFetchDataPagination";
import { SearchOutlined } from "@ant-design/icons";
import noThumbnailImage from "../../../assets/noThumbnailImage.jpg";

const { Search } = Input;
function ApprovalCampaign() {
    const [search, setSearch] = useState("");
    const [warning, setWarning] = useState('');
    const [pageSize, setPageSize] = useState(6);
    const [pageIndex, setPageIndex] = useState(1);
    
    const fetchPreorderCampaign = useCallback(
        () => GetCompletedBulkOrderCampaign(pageSize, pageIndex),
        [pageSize, pageIndex]
    );

    const { data, loading, refetch, pagination } = useFetchDataPagination(fetchPreorderCampaign, [
        pageSize,
        pageIndex,
    ]);

    const columns = [
        {
            title: <span style={{ fontSize: "18px" }}>{"STT"}</span>,
            key: "index",
            align: "center",
            render: (_, __, index) =>
                <div className="text-center text-red-500 font-bold">
                    {(pagination.current - 1) * pagination.pageSize + index + 1}
                </div>,
        },
        {
            title: <span style={{ fontSize: "18px" }}>{"Hình ảnh"}</span>,
            key: "mainImage",
            align: "center",
            render: (_, record) => (
                <div className="flex justify-center items-center">
                    <img
                        src={record.blindBox?.images.mainImage?.url || noThumbnailImage}
                        alt="Main"
                        className="w-24 h-24 object-cover rounded-md shadow-md transition-all duration-300 hover:scale-105"
                    />
                </div>
            ),
        },
        {
            title: <span style={{ fontSize: "18px" }}>{"Tên chiến dịch"}</span>,
            key: "name",
            align: "center",
            sorter: (a, b) => (a.blindBox?.name || "").localeCompare(b.blindBox?.name || ""),
            render: (_, record) => <div className="text-center font-semibold">{record.blindBox?.name || "N/A"}</div>,
        },
        {
            title: <span style={{ fontSize: "18px" }}>{"Loại"}</span>,
            key: "type",
            align: "center",
            render: (_, record) => <div className="text-center">{record.type || "Unknown"}</div>,
        },
        {
            title: <span style={{ fontSize: "18px" }}>{"Ngày bắt đầu"}</span>,
            key: "startDate",
            align: "center",
            render: (_, record) => <div className="text-center"> {record.startDate
                ? new Date(record.startDate).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })
                : "N/A"}</div>,
        },
        {
            title: <span style={{ fontSize: "18px" }}>{"Ngày kết thúc"}</span>,
            key: "endDate",
            align: "center",
            render: (_, record) =>
                <div className="text-center">
                    {record.endDate
                        ? new Date(record.endDate).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })
                        : "N/A"}
                </div>,
        },
        {
            title: <span style={{ fontSize: "18px" }}>{"Hành động"}</span>,
            key: "action",
            align: "center",
            render: (_, record) => (
                <Space size="middle" className="justify-between">
                    <Button className="" type="primary" htmlType="button">
                    <Link to={`/admin/preordercampaignApproval/confirm/${record.slug}`}>Xem chi tiết</Link>
                    </Button>
                </Space>
            ),
        },
    ];


    const filteredData = data.filter((item) =>
        item.blindBox?.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="dashboard-container overflow-auto h-screen pr-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-opacity-80">
            <div className="w-full mx-auto mt-5 p-5 bg-white shadow-lg rounded-lg">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold mb-4">Các chiến dịch gom đơn hàng đang chờ duyệt</h2>
                </div>

                <Search placeholder="Search products..." allowClear enterButton={<SearchOutlined />} style={{ width: 300 }} onChange={(e) => setSearch(e.target.value)} />

                {warning && <div className="w-full text-right text-red-500 mt-2">{warning}</div>}

                {loading ? (
                    <div className="flex justify-center ">
                        <Spin size="large" />
                    </div>
                ) : (
                    <>
                        <Table
                            bordered={true}
                            columns={columns}
                            dataSource={filteredData}
                            pagination={false}
                            rowKey="id"

                            className="border rounded-md mt-5"
                        />


                        <div className="flex justify-end mt-4">
                            <Pagination
                                current={pagination.current}
                                total={pagination.total}
                                pageSize={pageSize}
                                showSizeChanger
                                showQuickJumper
                                pageSizeOptions={["6", "10", "20"]}
                                onChange={(page, pageSize) => {
                                    setPageIndex(page);
                                    setPageSize(pageSize);
                                }}
                                className="shadow-md p-2 rounded-md bg-gray-100 transition-all duration-300 hover:bg-gray-200"
                            />

                        </div>
                    </>
                )}
        </div>
    </div> );
}

export default ApprovalCampaign;