import { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import { GetTheActiveVoucherCampaign, GetTheActiveVoucherCampaignBaseUser } from "../../api/VoucherCampaign/ApiVoucherCampaign";
import Voucher from "../Voucher";
import { Spin } from "antd";
import VoucherCampaignBackground from "../../assets/Background/voucherCampaignBackgroundImage.png";
import { AuthContext } from "../../context/AuthContext";
function VoucherCampaignSection() {
  const [voucherCampaigns,setVoucherCampaigns] = useState([]);
  const [loading,setLoading] = useState(true);
  const {auth} = useContext(AuthContext);
  const fetchVoucherCampaigns = async ()=>{
    var data =[];
    if(auth.roleName==="Guest"){
      data = await GetTheActiveVoucherCampaign(); 
    }else{
      data =await GetTheActiveVoucherCampaignBaseUser();
    }
    setVoucherCampaigns(data);
    setLoading(false);
  }
  useEffect(()=>{
    fetchVoucherCampaigns();
  },[])
  return (
    <section className="bg-[#ffffff] py-12 md:min-h-[500px] px-[40px]">
      <div
        style={{
          position: "relative",
          padding: "48px",
          borderRadius: "8px",
          backgroundImage:
            `url(${VoucherCampaignBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Enable parallax effect
          color: "#fff", // Text color to contrast with the background
        }}
      >
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
        <div className="relative z-10">
          <h2 className="text-[36px] text-center text-white mb-10 font-bold uppercase">
            Trợ giá với mã giảm giá với số lượng có hạn
          </h2>
          <div className="grid grid-cols-12">
            {loading ? (
              <Spin />
            ) : (
              voucherCampaigns?.map((item) => {
                return (
                  <div key={item.voucherCampaignId} className="col-span-4 mb-4">
                    <Voucher
                      VoucherDetail={item}
                      key={item.voucherCampaignId}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VoucherCampaignSection;
