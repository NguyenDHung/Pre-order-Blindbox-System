import { Form, Image, Spin, Steps, Tooltip, Progress, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ApproveBulkOrderCampaign, GetActivePreorderCampaignBySlug, RejectBulkOrderCampaign } from "../../../api/Pre_orderCampaign/ApiPre_orderCampaign";
import {
  ArrowLeftOutlined,
} from "@ant-design/icons";

import MyPreorderSteps from "../../../components/Steps/MyPreorderSteps";
const { Step } = Steps;

function ApprovalCampaignDetail() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [detailPreorderCampaign, setDetailPreorderCampaign] = useState(null);
  const [preorderMilestones, setPreorderMilestones] = useState([]);
  const [warning, setWarning] = useState(null);

  const navigate = useNavigate();

  // Fetch dữ liệu từ API
  const fetchCampaignBySlug = async () => {
    try {
      const data = await GetActivePreorderCampaignBySlug(slug);
      setDetailPreorderCampaign(data);
      setPreorderMilestones(data.preorderMilestones);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching campaign: ", error);
    }
  };

  useEffect(() => {
    fetchCampaignBySlug();
  }, [slug]);

  const handleAccept = () => {
    Modal.confirm({
      title: "Xác nhận chấp nhận?",
      content: "Bạn có chắc chắn muốn chấp nhận chiến dịch này không?",
      okText: "Chấp nhận",
      cancelText: "Hủy",
      onOk() {
        ApproveBulkOrderCampaign(detailPreorderCampaign.preorderCampaignId);
        navigate("/admin/preordercampaignApproval/");
      },
    });
  };

  // Xử lý khi nhấn nút "Từ chối"
  const handleReject = () => {
    Modal.confirm({
      title: "Xác nhận từ chối?",
      content: "Bạn có chắc chắn muốn từ chối chiến dịch này không?",
      okText: "Từ chối",
      cancelText: "Hủy",
      onOk() {
        RejectBulkOrderCampaign(detailPreorderCampaign.preorderCampaignId);
        navigate("/admin/preordercampaignApproval/");
      },
    });
  };

  return (
    <div>
      {loading ? (
        <div>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="mt-8">
          <Link to="/admin/preordercampaignApproval">
                    <ArrowLeftOutlined
                      style={{
                        width: "fit-content",
                        height: "fit-content",
                      }}
                      title="Về lại trang sản phẩm"
                    />
                  </Link>
            <h2 className="text-[24px]">Thông tin chi tiết của chiến dịch</h2>

            {/* Ngày & Trạng thái */}
            <div className="flex gap-3 text-lg my-4">
              <span className="bg-blue-100 text-blue-600 px-5 py-2 rounded-md">
                Start: {new Date(detailPreorderCampaign.startDate).toLocaleDateString()}
              </span>
              <span className="bg-red-100 text-red-600 px-5 py-2 rounded-md">
                End: {new Date(detailPreorderCampaign.endDate).toLocaleDateString()}
              </span>
              <span className={`px-5 py-2 rounded-md ${detailPreorderCampaign.status === "Pending" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"}`}>
                {detailPreorderCampaign.status || "No status"}
              </span>
              <span className="bg-gray-100 text-gray-800 px-5 py-2 rounded-md">
                {detailPreorderCampaign.type || "No type"}
              </span>
            </div>

            {/* Hình ảnh */}
            <div className="flex gap-4 max-[450px] overflow-y-scroll">
              <Image.PreviewGroup>
                <div className="w-[300px] bg-gray-100 object-cover rounded-xl">
                  <Image
                    src={detailPreorderCampaign.blindBox.images?.mainImage.url}
                    alt="Main"
                    style={{ borderRadius: "20px" }}
                  />
                  <div className="flex flex-1 bg-gray-100 p-2 gap-2 rounded-xl flex-wrap">
                    {detailPreorderCampaign.blindBox.images.galleryImages.map((item) => (
                      <span key={item.imageId} className={"relative w-1/6"}>
                        <Image src={item.url} className="rounded-xl" />
                      </span>
                    ))}
                  </div>
                </div>
              </Image.PreviewGroup>

              {/* Thông tin sản phẩm */}
              <div className="flex-1 p-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {detailPreorderCampaign?.blindBox?.name || "No name available"}
                </h3>
                <p className="text-lg mb-2 rounded-xl bg-gray-100 p-2 text-gray-600 mt-3">
                  {detailPreorderCampaign?.blindBox?.description || "No description available"}
                </p>
                <p className="text-xl font-semibold">
                  Size: {detailPreorderCampaign?.blindBox?.size || "No size available"}
                </p>
              </div>
            </div>

            <div id="stepContainer" className="bg-gray-100 mt-4 p-4 rounded-xl">
              <h2 className="text-[24px] mb-2">Tiến trình đạt mục tiêu</h2>
              <p className="mb-4 ml-2">Khi bắt đầu qua đến mốc sau sẽ bắt đầu lấy giá mốc trước để tính</p>
              {warning!=null?<p className="text-red-700 font-bold ml-2 mb-2">{warning}</p>:null}
              <MyPreorderSteps
              setWarning={setWarning }
                detailPreorderCampaign={detailPreorderCampaign}
                preorderMilestones={preorderMilestones}
              />
            </div>

            {/* Các nút hành động */}
            <div className="flex gap-4 mt-4 w-full justify-center">
              <div className="flex gap-4 bg-gray-100 p-4 rounded-xl" >
              <Button onClick={handleReject} className="min-w-[350px] min-h-[50px]" danger>Từ chối</Button>
              <Button onClick={handleAccept} className="min-w-[350px] min-h-[50px]" type="primary">Chấp nhận</Button>  
              </div>
             
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ApprovalCampaignDetail;
