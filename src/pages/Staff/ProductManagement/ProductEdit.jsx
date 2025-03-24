import { Link, useNavigate, useParams } from "react-router";
import {
  EditBlindBox,
  GetActiveBlindBoxById,
} from "../../../api/BlindBox/ApiBlindBox";
import { Button, Form, Image, Input, InputNumber, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import noThumbnailImage from "../../../assets/noThumbnailImage.jpg";

function ProductEdit() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [detailBlindBox, setDetailBlindBox] = useState({});
  const [deleteImagesIDGallery, setDeleteImagesGallery] = useState([]);
  const navigate = useNavigate();
  const getDetailBlindBox = async () => {
    var data = await GetActiveBlindBoxById(id);
    console.log("BlindBox data:", data); // Kiểm tra
    setDetailBlindBox(data);
    setLoading(false);
  };
  useEffect(() => {
    getDetailBlindBox();
  }, []);
  const handleMainImageChange = ({ file }) => {
    setMainImage(file);
  };
  const handleGalleryImagesChange = ({ fileList }) => {
    setGalleryImages(fileList.map((file) => file.originFileObj));
  };
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("size", values.size);
    formData.append("listedPrice", values.listedPrice);
    console.log(values.listedPrice);
    if (mainImage) formData.append("mainImage", mainImage);
    galleryImages.forEach((file, index) => {
      formData.append(`galleryImages`, file);
    });
    console.log(galleryImages);
    if (deleteImagesIDGallery.length > 0) {
      formData.append("deletedGalleryImagesID", deleteImagesIDGallery);
    }
    console.log(formData);
    var result = await EditBlindBox({ formData, id });
    navigate("/staff/products");
    console.log(result);
  };
  const deleteOldImageAction = (id) => {
    var arrDeleteImagesId = [...deleteImagesIDGallery, id];
    setDeleteImagesGallery(arrDeleteImagesId);
  };
  return loading ? (
    <div>Loading....</div>
  ) : (
    <div>
      <div>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            name: detailBlindBox.name,
            description: detailBlindBox.description,
            size: detailBlindBox.size,
          }}
        >
          <div className="grid grid-cols-12 gap-4 min-h-screen mx-auto mt-5 p-5 bg-[#e5e7eb] shadow-lg ">
            <div className="col-span-9 ">
              <div className="bg-white  p-4 rounded-xl">
                <div className="flex items-center mb-4">
                  <Link to="/staff/products" className="h-full flex">
                    <ArrowLeftOutlined
                      style={{
                        width: "fit-content",
                        height: "100%",
                        padding: "10px",
                      }}
                      title="Về lại trang sản phẩm"
                    />
                  </Link>
                  <h2 className="text-3xl font-bold">Chỉnh sửa blind box</h2>
                </div>
                {/* Name */}
                <Form.Item
                  label="Tên sản phẩm"
                  name="name"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên sản phẩm!" },
                  ]}
                >
                  <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>

                {/* Description */}
                <Form.Item
                  label="Mô tả"
                  name="description"
                  rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
                >
                  <Input.TextArea placeholder="Nhập mô tả sản phẩm" rows={4} />
                </Form.Item>

                {/* Size */}
                <Form.Item
                  label="Kích thước"
                  name="size"
                  rules={[
                    { required: true, message: "Vui lòng chọn kích thước!" },
                  ]}
                >
                  <Select placeholder="Chọn kích thước">
                    <Select.Option value="Small">Nhỏ</Select.Option>
                    <Select.Option value="Medium">Trung bình</Select.Option>
                    <Select.Option value="Large">Lớn</Select.Option>
                  </Select>
                </Form.Item>

                {/* Gallery Images */}
                <Form.Item label="Ảnh phụ" name="">
                  <Upload
                    multiple
                    listType="picture-card"
                    accept="image/*"
                    beforeUpload={() => false}
                    onChange={handleGalleryImagesChange}
                  >
                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                  </Upload>
                  <div className="flex flex-row  h-fit ">
                    <Image.PreviewGroup
                      preview={{
                        onChange: (current, prev) =>
                          console.log(
                            `current index: ${current}, prev index: ${prev}`
                          ),
                      }}
                    >
                      {!(
                        detailBlindBox != null &&
                        detailBlindBox.images?.galleryImages != null
                      ) ? (
                        <div>Đang không có hình ảnh vui lòng upload ảnh để hiển thị</div>
                      ) : (
                        detailBlindBox.images.galleryImages.map(
                          (item, index) => {
                            return (
                              <span key={item.id}
                                className={
                                  "relative  w-[100px] h-[100px] " +
                                  (deleteImagesIDGallery.includes(item.imageId)
                                    ? "hidden"
                                    : "")
                                }
                              >
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    deleteOldImageAction(item.imageId);
                                  }}
                                  className="absolute z-10 top-1 right-1 text-white bg-red-500 hover:bg-red-600 
                                         rounded-full w-5 h-5 flex items-center justify-center 
                                         leading-none text-xs"
                                >
                                  X
                                </button>

                                <Image key={item.imageId} src={item.url} />
                              </span>
                            );
                          }
                        )
                      )}
                    </Image.PreviewGroup>
                  </div>
                </Form.Item>
              </div>
            </div>
            <div className="col-span-3">
              {/* Main Image */}
              <div className="py-10 bg-white px-4 rounded-xl">
              <Form.Item
                  label="Giá niêm yết"
                  name="listedPrice"
                  rules={[
                    { required: true, message: "Vui lòng nhập giá niêm yết" },
                  ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    min={10000}
                    formatter={(value) => {
                      if (!value) return "";
                      return (
                        value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                        " VND"
                      );
                    }}
                    defaultValue={detailBlindBox.listedPrice}
                    parser={(value) => value.replace(/\s?VND|(,*)/g, "")}
                  />
                 
                </Form.Item>
                <Form.Item name="mainImage">
                  <label className="block text-2xl text-black">Ảnh chính</label>
                  <Upload
                    beforeUpload={() => false} // Ngăn upload tự động
                    onChange={handleMainImageChange}
                    showUploadList={false} // Không hiển thị danh sách ảnh
                  >
                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                  </Upload>
                  {detailBlindBox.images.mainImage == null ? (
                    <div className="mt-2">
                      <img
                        src={noThumbnailImage}
                        alt="Main"
                        className="w-full h-[300px] object-contain mt-2 rounded-md"
                      />
                    </div>
                  ) : detailBlindBox.images.mainImage != null &&
                    mainImage == null ? (
                    <div className="mt-2">
                      <img
                        src={detailBlindBox.images.mainImage.url}
                        alt="Main"
                        className="w-full h-[300px] object-contain mt-2 rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(mainImage)}
                        alt="Main"
                        className="w-full h-[300px] object-contain mt-2 rounded-md"
                      />
                    </div>
                  )}
                </Form.Item>
                {/* Submit Button */}
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full text-lg py-4"
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ProductEdit;
