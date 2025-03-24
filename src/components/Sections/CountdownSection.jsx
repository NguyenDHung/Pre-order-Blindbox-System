import { useState } from "react";
import GradientButton from "../Buttons/GradientButton";
import Countdown from "../Countdown";

function CountdownSection() {
  const [voucherDetail, setVoucherDetail] = useState({
    Name: "Voucher Loại 1",
    StartDate: new Date("2025-01-25T16:14:37.617Z").getTime(),
    EndDate: new Date("2025-02-24T16:14:37.617Z").getTime(),
    Quantity: 100,
    MaximumUserCanGet: 2,
    PercentDiscount: 10,
    MaximumMoneyDiscount: 100,
    Status: "Active",
    IsDelete: 0,
  });

  return (
    <section className="bg-gray-100 py-12 md:min-h-[500px]">
      <div
        style={{
          position: "relative",
          padding: "48px",
          borderRadius: "8px",
          backgroundImage:
            'url("https://product.hstatic.net/1000328919/product/h-do-choi-blind-box-disney-100th-anniversary-pixar-series-pop-mart__1__c59ddacbcccf4addb5386db64d7ef31a.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Enable parallax effect
          color: "#fff", // Text color to contrast with the background
        }}
      >
        {/* Overlay for better readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
            borderRadius: "8px",
            zIndex: 0,
          }}
        ></div>
       
        {/* Voucher Information */}
        <div  style={{ position: "relative", zIndex: 2 }} className="bg-indigo-50 p-4 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">
          {voucherDetail.Name}
        </h2>
        <h3 className="text-2xl font-bold text-indigo-600 mb-4">
          Giảm giá {voucherDetail.PercentDiscount +"%"} tối đa {voucherDetail.MaximumMoneyDiscount}
        </h3>

          {/* Countdown Timer */}
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
            Time Remaining
          </h3>
          {voucherDetail?.EndDate ? (
           <Countdown EndDate={voucherDetail.EndDate} />
          ) : (
            <p>No End Date Available</p>
          )}
          <GradientButton text={"Nhận voucher ngay"} style={{width:"100%", margin:"10px 0px"}}/>
        </div>
      </div>
    </section>
  );
}

export default CountdownSection;
