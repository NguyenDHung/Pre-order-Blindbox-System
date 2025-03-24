import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import iconFailed from "../../assets/icons/iconFailed.json";
import iconSuccess from "../../assets/icons/iconSuccess.json";
import loadingAnimation from "../../assets/icons/loadingAnimation.json";
import {
  ApiVerifyPaymentByMomo,
  ApiVerifyPaymentByVnpay,
} from "../../api/Wallet/ApiWallet";
import GradientButton from "../../components/Buttons/GradientButton";

function WalletRechargeResponse() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  async function verifyPayment(queryParams) {
    // Lấy giá trị của field "thirdParty"
    console.log(queryParams);
    const thirdParty = queryParams.get("thirdParty").toString();
    const queryString = queryParams.toString();
    console.log(queryString);
    // Chuyển đổi các tham số thành object
    const queryObj = {};
    for (const [key, value] of queryParams.entries()) {
      queryObj[key] = value;
    }
    console.log(queryObj);
    console.log(thirdParty);
    let verifyApi;
    if (thirdParty === "MOMO") {
      verifyApi = await ApiVerifyPaymentByMomo(queryString);
    } else {
      verifyApi = await ApiVerifyPaymentByVnpay(queryString);
    }
    if (verifyApi?.success) {
      setStatus(true);
    } else {
      setStatus(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    // Add this condition
    const searchParams = new URLSearchParams(location.search);
    verifyPayment(searchParams);
  }, []); // Include hasVerified as a dependency

  function moveToWalletPage() {
    navigate(`/wallet`, { replace: true });
  }
  if (isLoading) {
    return (
      <div className="w-screen flex justify-center h-screen relative">
        <div className="bg-[#fff] rounded-lg px-10 shadow-[0_5px_15px_rgba(0,0,0,0.35)] absolute -translate-y-1/2 top-1/2 z-10 w-[768px] max-w-[100%] pb-10">
          <Lottie
            speed={2}
            animationData={loadingAnimation}
            style={{ width: "100%", height: "350px" }}
            loop={true}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="w-screen flex justify-center h-screen relative">
      {status ? (
        <div className="bg-[#fff] rounded-lg px-10 shadow-[0_5px_15px_rgba(0,0,0,0.35)] absolute -translate-y-1/2 top-1/2 z-10 w-[768px] max-w-[100%] pb-10">
          <div className="">
            <div className="iconNotification">
              <Lottie
                animationData={iconSuccess}
                style={{ width: "100%", height: "350px" }}
                loop={false}
              />
            </div>
            <h3 className="text-[32px] text-center">Chúc mừng,</h3>
            <h3 className="text-[32px] text-center mb-12">
              Thanh toán của bạn đã được nạp vào ví thành công.
            </h3>
            <div className="flex justify-center w-full">
              <GradientButton
                variant="contained"
                className="min-w-[400px] min-h-[50px]"
                onClick={moveToWalletPage}
                text="Về lại trang ví của bạn"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#fff] rounded-lg px-10 shadow-[0_5px_15px_rgba(0,0,0,0.35)] absolute -translate-y-1/2 top-1/2 z-10 w-[768px] max-w-[100%] pb-10">
          <div className="">
            <div className="iconNotification">
              <Lottie
                animationData={iconFailed}
                style={{ width: "100%", height: "320px" }}
                loop={false}
              />
            </div>
            <h3 className="text-[32px] text-center mb-6">
              Thanh toán của bạn đã thất bại
            </h3>
<div className="flex justify-center w-full">

            <GradientButton
              variant="contained"
              className="min-w-[400px] min-h-[50px]"
              onClick={moveToWalletPage}
              text="Về lại trang ví của bạn"
            />
</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WalletRechargeResponse;
