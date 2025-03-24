import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
const { Option } = Select;
import { useState } from "react";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { CreateBlindBox } from "../../../api/BlindBox/ApiBlindBox";
import { Link, useNavigate } from "react-router";
function ProductCreate() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const navigate = useNavigate();
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
    if (mainImage) formData.append("mainImage", mainImage);
    galleryImages.forEach((file, index) => {
      formData.append(`galleryImages`, file);
    });
    formData.append("listedPrice", values.listedPrice);
    var result = await CreateBlindBox({ formData });
    navigate("/staff/products");
  };
  return (
    <div>
      <div className="w-full min-h-screen mx-auto mt-5 p-5 bg-white shadow-lg rounded-lg">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="grid grid-cols-12 gap-4 min-h-screen mx-auto mt-5 p-5 bg-[#e5e7eb] shadow-lg rounded-lg">
            <div className="col-span-9 ">
              <div className="bg-white  p-4 rounded-lg">
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
                  <h2 className="text-* font-bold">Tạo Blind Box Mới</h2>
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
                <Form.Item label="Ảnh phụ">
                  <Upload
                    multiple
                    listType="picture-card"
                    accept="jpg,png,jpeg"
                    beforeUpload={() => false}
                    onChange={handleGalleryImagesChange}
                  >
                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                  </Upload>
                </Form.Item>
              </div>
            </div>
            <div className="col-span-3">
              {/* Main Image */}
              <div className="py-10 bg-white px-4 rounded-lg">
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
                    parser={(value) => value.replace(/\s?VND|(,*)/g, "")}
                  />
                </Form.Item>
                <Form.Item label="Ảnh chính">
                  <Upload
                    beforeUpload={() => false} // Ngăn upload tự động
                    onChange={handleMainImageChange}
                    showUploadList={false} // Không hiển thị danh sách ảnh
                  >
                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                  </Upload>
                  {mainImage && (
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
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full"
                  >
                    Tạo sản phẩm
                  </Button>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ProductCreate;
