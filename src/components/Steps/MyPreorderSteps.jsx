import React from "react";
import "./style.css";
import { Steps, Tooltip, Progress } from "antd";

const { Step } = Steps;

const MyPreorderSteps = ({ preorderMilestones, detailPreorderCampaign, setWarning=undefined }) => {
  const placedOrderCount = detailPreorderCampaign?.placedOrderCount || 0;
  
  const cumulativeOrdersArr = preorderMilestones.reduce((acc, milestone, i) => {
    const prevSum = acc[i - 1] || 0;
    acc.push(prevSum + milestone.quantity);
    return acc;
  }, []);

  let currentStep = cumulativeOrdersArr.findIndex(
    (cumulative) => placedOrderCount < cumulative
  );
  if (currentStep === -1) {
    currentStep = preorderMilestones.length;
  }
if(setWarning!= undefined && currentStep<=1){
  setWarning("Lưu ý ! Chiến dịch này chưa được tính ở giá mốc 2 !")
}
  return (
    <Steps progressDot current={currentStep} size="default" className="formatStepsProgressDot">
      {preorderMilestones.map((milestone, index) => {
        const cumulativeOrders = cumulativeOrdersArr[index];
        const isActive = index === currentStep;
        return (
          <Step
            key={index}
            className={`relative ${isActive ? "Active" : ""}`}
            
            title={
              <>
                <Tooltip title={`Mức giá: ${milestone.price.toLocaleString()} VND`}>
                  Mốc {milestone.milestoneNumber}
                </Tooltip>

                {isActive && (
                  <Tooltip
                    title={
                      <>
                        <p>
                          Đã đạt được {Math.min(placedOrderCount, cumulativeOrders)} trên {cumulativeOrders}
                        </p>
                        <p>Mức giá: {milestone.price.toLocaleString()} VND</p>
                      </>
                    }
                  >
                    <Progress
                      className="absolute top-0"
                      percent={(placedOrderCount / cumulativeOrders) * 100}
                      size="small"
                      status="active"
                    />
                  </Tooltip>
                )}
              </>
            }
            description={index!=0?`Cần đạt ${cumulativeOrders} đơn`:null}
          />
        );
      })}

      <Step
        key="finalStep"
        className="relative"
      />
    </Steps>
  );
};

export default MyPreorderSteps;
