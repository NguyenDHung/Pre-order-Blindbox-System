import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Space,
} from "antd";
const { Option } = Select;
import { useState } from "react";
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import ProductCardModal from "../../../components/Search/SearchBlindbox";
import TextArea from "antd/es/input/TextArea";
import { CreatePreorderCampaign } from "../../../api/Pre_orderCampaign/ApiPre_orderCampaign";
import { formatMoney } from "../../../utils/FormatMoney";

const { RangePicker } = DatePicker;

function PreorderCampaignCreate() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [loadMainProduct, setLoadMainProduct] = useState(null);
  const [typeOfCampaign, setTypeOfCampaign] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessageForSelectTime, setErrorMessageForSelectTime] = useState(null);
  const navigate = useNavigate();

  const onFieldsChange = () => {
    const fieldsError = form.getFieldsError();
    if (typeOfCampaign == null) {
      setIsFormValid(false);
      return;
    }
    if (loadMainProduct == null) {
      setIsFormValid(false);
      return;
    }
    const milestoneValues = form.getFieldValue("milestones") || null;
    if (!milestoneValues || milestoneValues.length <= 2) {
      setIsFormValid(false);
      return;
    }

    const milestoneHasEmpty = milestoneValues.some((m) => {
      return (
        !m ||
        m.quantity === undefined ||
        m.quantity === "" ||
        m.price === undefined ||
        m.price === ""||
        m?.price >loadMainProduct.listedPrice
      );
    });
    if (milestoneHasEmpty) {
      setIsFormValid(false);
      return;
    }
    const dateRange = form.getFieldValue("dateRange") || null;
    var dateNow = new Date();
    if (dateRange == null) {
      setIsFormValid(false);
      setErrorMessageForSelectTime("Ngày bắt đầu và kết thúc không được chừa trống !");
      return;
    }
    if (dateRange[0] <= dateNow) {
      setErrorMessageForSelectTime("Ngày bắt đầu bắt buộc phải bắt đầu trong tương lai");
      setIsFormValid(false);
      return;
    }

    if (dateRange[1].isBefore(dateRange[0].clone().add(5, "days"))) {
      setErrorMessageForSelectTime("Thời gian hoạt động của chiến dịch không được ít hơn 5 ngày !");
      setIsFormValid(false);

      return;
    }
    setErrorMessageForSelectTime(null);
    const hasErrors = fieldsError.some((field) => field.errors.length > 0);
    setIsFormValid(!hasErrors);
  };

  const handleChangeTypeCampaign = (value) => {
    setTypeOfCampaign(value);
    form.setFieldsValue({ typeOfCampaign: value, milestones: [] });
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const data = {
      blindBoxId: parseInt(loadMainProduct?.blindBoxId) || 0,
      type: parseInt(values.type || typeOfCampaign),
      startDate: values.dateRange ? values.dateRange[0].toISOString() : null,
      endDate: values.dateRange ? values.dateRange[1].toISOString() : null,
      milestoneRequests: values.milestones
        ? values.milestones.map((item) => ({
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price),
          }))
        : [],
    };
    var result = await CreatePreorderCampaign(data);
    if(result){

      navigate("/admin/pre-ordercampaign");
    }
  };

  return (
    <div>
      <div className="w-full min-h-screen h-full mx-auto bg-white shadow-lg rounded-lg">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onFieldsChange={onFieldsChange}
        >
          <div className="grid grid-cols-12 gap-4 min-h-screen mx-auto mt-5 p-5 bg-[#e5e7eb] shadow-lg rounded-lg">
            <div className="col-span-9 ">
              <div className="bg-white p-4 rounded-xl py-10">
                <div className="flex items-center mb-4">
                  <Link to="/admin/preordercampaign" className="h-full flex">
                    <ArrowLeftOutlined
                      style={{
                        width: "fit-content",
                        height: "100%",
                        padding: "10px",
                      }}
                      title="Về lại trang sản phẩm"
                    />
                  </Link>
                  <h1 className="text-2xl font-bold">Tạo Chiến dịch mới</h1>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl mb-2 mt-2">
                      Thông tin chi tiết về sản phẩm
                    </h2>
                    <ProductCardModal setLoadMainProduct={setLoadMainProduct} />
                  </div>
                  {loadMainProduct != null && (
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-3">
                        <h3 className="text-[16px]">Hình ảnh sản phẩm</h3>
                        <div className="mt-2">
                          <img
                            src={loadMainProduct.images?.mainImage.url}
                            alt="Main"
                            className="w-full h-full object-cover mt-2"
                            style={{ borderRadius: "10px" }}
                          />
                        </div>
                      </div>
                      <div className="col-span-9">
                        <div className="mt-2">
                          <h3 className="text-[16px] mt-2 mb-">Tên sản phẩm</h3>
                          <Form.Item
                            name="name"
                            initialValue={loadMainProduct?.name}
                          >
                            <Input disabled />
                          </Form.Item>
                          <h3 className="text-[16px] mt-2 mb-">Giá niêm yết</h3>
                          <Form.Item
                            name="listedPrice"
                            initialValue={formatMoney(loadMainProduct?.listedPrice)}
                          >
                            <Input disabled />
                            
                          </Form.Item>
                          <h3 className="text-[16px] mt-2 mb-1">Mô tả</h3>
                          <Form.Item
                            name="description"
                            initialValue={loadMainProduct?.description}
                          >
                            <TextArea style={{ height: "150px" }} disabled />
                          </Form.Item>
                          <h3 className="text-[16px] mt-2 mb-1">Kích cỡ</h3>
                          <Form.Item
                            name="size"
                            initialValue={loadMainProduct?.size}
                          >
                            <Select disabled className="w-full">
                              <Option value={loadMainProduct?.size}>
                                {loadMainProduct?.size}
                              </Option>
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Milestones */}
                <div>
                  <h2 className="text-xl mb-2 mt-2">
                    Các cột mốc cho chiến dịch
                  </h2>
                  <div className="mb-4">
                    <h3 className="text-lg">Chọn loại chiến dịch</h3>
                    <Form.Item
                      name="type"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn loại chiến dịch!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Vui lòng chọn loại chiến dịch"
                        className="w-full"
                        onChange={handleChangeTypeCampaign}
                      >
                        <Option value={0}>Timed Pricing</Option>
                        <Option value={1}>Bulk Order</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div>
                    <h3 className="text-lg">Thêm các mốc giá và số lượng</h3>
                  </div>
                  {typeOfCampaign != null && (
                    <Form.List name="milestones">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }, index) => (
                            <Space
                              key={key}
                              style={{ display: "flex", marginBottom: 8 }}
                              align="baseline"
                            >
                              {/* Số lượng */}
                              <Form.Item
                                {...restField}
                                name={[name, "quantity"]}
                                label="Số lượng"
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng nhập số lượng!",
                                  },
                                  {
                                    validator: (_, value) => {
                                      if (value === undefined || value === "") {
                                        return Promise.resolve();
                                      }
                                      if (Number(value) < 1) {
                                        return Promise.reject(
                                          new Error(
                                            "Số lượng phải lớn hơn hoặc bằng 1"
                                          )
                                        );
                                      }
                                      return Promise.resolve();
                                    },
                                  },
                                ]}
                              >
                                <InputNumber
                                  placeholder="Số lượng"
                                  min={1}
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>

                              {/* Số tiền */}
                              <Form.Item
                                {...restField}
                                name={[name, "price"]}
                                dependencies={
                                  index > 0
                                    ? [["milestones", index - 1, "price"]]
                                    : []
                                }
                                label="Số tiền"
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng nhập số tiền!",
                                  },
                                  {
                                    validator: (_, value) => {
                                      if (value === undefined || value === "") {
                                        return Promise.resolve();
                                      }
                                      if (Number(value) < 1000) {
                                        return Promise.reject(
                                          new Error(
                                            "Số tiền phải lớn hơn hoặc bằng 1000"
                                          )
                                        );
                                      }
                                      if(value>=loadMainProduct.listedPrice){
                                        return Promise.reject(
                                          new Error(
                                            `Giá phải nhỏ hơn giá niêm yết của sản phẩm`
                                          )
                                        );
                                      }
                                      return Promise.resolve();
                                    },
                                  },
                                  // Validator so sánh với milestone trước nếu có
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      const milestones =
                                        getFieldValue("milestones") || [];
                                      if (index === 0) {
                                        return Promise.resolve();
                                      }
                                      const previousMilestone =
                                        milestones[index - 1];
                                      if (
                                        previousMilestone === undefined ||
                                        previousMilestone.price === undefined
                                      ) {
                                        return Promise.resolve();
                                      }
                                      const prevPrice = parseFloat(
                                        previousMilestone.price
                                      );
                                      const currentPrice = parseFloat(value);
                                      

                                      if (typeOfCampaign == 0) {
                                        if (currentPrice <= prevPrice) {
                                          return Promise.reject(
                                            new Error(
                                              `Giá phải tăng dần so với cột mốc trước (phải lớn hơn ${previousMilestone.price})`
                                            )
                                          );
                                        }
                                      } else if (typeOfCampaign == 1) {
                                        if (currentPrice >= prevPrice) {
                                          return Promise.reject(
                                            new Error(
                                              `Giá phải giảm dần so với cột mốc trước (phải nhỏ hơn ${previousMilestone.price})`
                                            )
                                          );
                                        }
                                      }
                                      return Promise.resolve();
                                    },
                                  }),
                                ]}
                              >
                                <InputNumber
                                  placeholder="Số tiền"
                                  min={1000}
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>
                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                              />
                            </Space>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Thêm cột mốc
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-3">
              {/* Main Image & DatePicker */}
              <div className="py-10 bg-white px-4 rounded-xl">
                <div>
                  <h2 className="text-xl mb-2">
                    Thời gian chiến dịch hoạt động
                  </h2>
                  <Form.Item
                    name="dateRange"
                    label="Chọn khoảng thời gian"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn khoảng thời gian!",
                      },
                    ]}
                  >
                    <RangePicker
                      showTime={{ format: "HH:mm" }}
                      format="YYYY-MM-DD HH:mm"
                      placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                    />
                  </Form.Item>
                  {errorMessageForSelectTime!=null && <p className="text-red-600">{errorMessageForSelectTime}</p>}
                </div>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    disabled={!isFormValid}
                    className="w-full"
                  >
                    Tạo chiến dịch
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

export default PreorderCampaignCreate;
