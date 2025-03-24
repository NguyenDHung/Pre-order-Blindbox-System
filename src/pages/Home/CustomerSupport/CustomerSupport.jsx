import React from "react";
import { Heart, Handshake, Rocket, ShoppingCart } from "lucide-react";


const commitments = [
  {
    icon: <Heart size={40} className="text-black" />, 
    title: "HỖ TRỢ", 
    subtitle: "24/7",
  },
  {
    icon: <Handshake size={40} className="text-black" />, 
    title: "ĐẢM BẢO", 
    subtitle: "UY TÍN CHẤT LƯỢNG",
  },
  {
    icon: <Rocket size={40} className="text-black" />, 
    title: "GIAO HÀNG", 
    subtitle: "NHANH CHÓNG",
  },
  {
    icon: <ShoppingCart size={40} className="text-black" />, 
    title: "MUA HÀNG", 
    subtitle: "CỰC KÌ DỄ DÀNG",
  },
];

const CustomerSupport = () => {
  return (
    <div className="space-y-4 mb-6">
    
      <h2 className="text-2xl font-bold text-center mb-4">HỖ TRỢ KHÁCH HÀNG</h2>
      
      <div className="bg-yellow-400 p-6 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {commitments.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg flex flex-col items-center justify-center shadow-md"
            >
              {item.icon}
              <p className="font-bold text-gray-800 mt-2 text-center">{item.title}</p>
              <p className="text-gray-500 text-center">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
