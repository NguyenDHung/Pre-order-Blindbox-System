import { Button, Form, InputNumber, Space } from "antd";
import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export const CreatePreorderMilestones = ({
  form,
  typeOfCampaign,
  setIsValidMilestones,
  loadMainProduct
}) => {
  // Sử dụng useWatch để theo dõi giá trị milestones
  const milestones = Form.useWatch("milestones", form);
  const [errorLog, setErrorLog] = useState(null);

  const validatePrice = (milestonesFetch) => {
    let previousData;
    for (let index = 0; index < milestonesFetch.length; index++) {
      const item = milestonesFetch[index];
      if (index === 0) {
        previousData = item==null?1000:item.price;
      } else {
        console.log("Type: " + typeOfCampaign);
        const currentPrice = item== null?1000:item.price;
        if (typeOfCampaign === "BulkOrder") {
          // Bulk order
          if (previousData < currentPrice) {
            console.log("Bulk order have a wrong price ordering!!!");
            const message = "Bulk order have a wrong price ordering!!!";
            setIsValidMilestones(false);
            setErrorLog(message);
            return; // Dừng hàm ngay tại đây
          }
        } else {
          // Timed pricing
          if (previousData > currentPrice) {
            const message = "Timed pricing have a wrong price ordering!!!";
            setIsValidMilestones(false);
            setErrorLog(message);
            return; // Dừng hàm ngay tại đây
          }
        }
        console.log("Pass thanh cong: " + typeOfCampaign);
        setErrorLog(null);
        setIsValidMilestones(true);
        previousData = currentPrice;
      }
    }
  };
  useEffect(() => {
    console.log("Milestones changed: ", milestones);
    const milestonesFetch = Array.isArray(milestones) ? [...milestones] : [];
    validatePrice(milestonesFetch);
  }, [milestones]);

  return (
    <div>
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
                    { required: true, message: "Vui lòng nhập số lượng!" },
                    {
                      validator: (_, value) => {
                        if (value == null) return Promise.resolve();
                        if (Number(value) < 1) {
                          return Promise.reject(
                            new Error("Số lượng phải >= 1")
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
                  label="Số tiền"
                  dependencies={
                    index > 0 ? [["milestones", index - 1, "price"]] : []
                  }
                  rules={[
                    { required: true, message: "Vui lòng nhập số tiền!" },
                    {
                      validator: (_, value) => {
                        if (value == null) return Promise.resolve();
                        if (Number(value) < 1000) {
                          return Promise.reject(
                            new Error("Số tiền phải >= 1000")
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
                    // So sánh với milestone trước nếu có
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        // Nếu là milestone đầu tiên, không cần so sánh
                        if (index === 0) return Promise.resolve();
                        const milestones = getFieldValue("milestones") || [];
                        const prev = milestones[index - 1];
                        if (!prev || prev.price == null)
                          return Promise.resolve();
                        const prevPrice = parseFloat(prev.price);
                        const currentPrice = parseFloat(value);
                        if (isNaN(prevPrice) || isNaN(currentPrice))
                          return Promise.resolve();

                        if (typeOfCampaign === 0) {
                          // Với kiểu tăng dần: giá hiện tại phải > giá trước đó
                          if (currentPrice <= prevPrice) {
                            return Promise.reject(
                              new Error(
                                `Giá phải lớn hơn ${prevPrice} (tăng dần)`
                              )
                            );
                          }
                        } else if (typeOfCampaign === 1) {
                          // Với kiểu giảm dần: giá hiện tại phải < giá trước đó
                          if (currentPrice >= prevPrice) {
                            return Promise.reject(
                              new Error(
                                `Giá phải nhỏ hơn ${prevPrice} (giảm dần)`
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
                <MinusCircleOutlined onClick={() => remove(name)} />
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
      {errorLog && (
        <div>
          <p className="text-red-600">{errorLog}</p>
        </div>
      )}
    </div>
  );
};
