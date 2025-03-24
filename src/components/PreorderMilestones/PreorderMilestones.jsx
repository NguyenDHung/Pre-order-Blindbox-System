/* eslint-disable react/prop-types */

const PreorderMilestones = ({ originalPrice, milestones, placedOrderCount }) => {
	if (!milestones || milestones.length === 0) return null;
	
	// Sắp xếp milestones theo milestoneNumber để đảm bảo thứ tự đúng
	milestones.sort((a, b) => a.milestoneNumber - b.milestoneNumber);
	
	// Tính mảng tổng tích lũy của số lượng sản phẩm cho từng milestone
	const cumulativeOrdersArr = milestones.reduce((acc, milestone, index) => {
	  if (index === 0) {
		acc.push(milestone.quantity);
	  } else {
		acc.push(acc[index - 1] + milestone.quantity);
	  }
	  return acc;
	}, []);
	
	console.log('Cumulative Orders:', cumulativeOrdersArr);
	
	// Tìm milestone hiện tại dựa trên số lượng đơn hàng đã đặt
	let currentStep = cumulativeOrdersArr.findIndex(
	  (cumulative) => placedOrderCount < cumulative
	);
	console.log('Current Step:', currentStep);
	
	if (currentStep === -1) {
	  currentStep = milestones.length;
	}
	
	return (
	  <div className='flex flex-wrap justify-between gap-4 my-6'>
		{milestones.map((milestone, index) => {
		  const isActive = index === currentStep;
		  const priceInVND = milestone.price;
		  // Tính phần trăm giảm giá (giữ nguyên logic cũ)
		  const discountPercentage = Math.round(
			((originalPrice - priceInVND) / originalPrice) * 100
		  );
	
		  // Tính phần trăm hoàn thành cho mỗi milestone
		  let progressPercentage = 0;
		  if (index < currentStep) {
			progressPercentage = 100;
		  } else if (index > currentStep) {
			progressPercentage = 0;
		  } else {
			const previousCumulative = index > 0 ? cumulativeOrdersArr[index - 1] : 0;
			progressPercentage = ((placedOrderCount - previousCumulative) / milestone.quantity) * 100;
		  }
	
		  // Xác định lớp màu cho phần remainingText dựa trên % hoàn thành
		  let remainingBgClass = "";
		  let remainingTextClass = "";
		  if (index < currentStep) {
			// Mốc đã qua: nút trắng
			remainingBgClass = "bg-gray-200";
			remainingTextClass = "text-black";
		  } else if (index === currentStep) {
			if (progressPercentage < 25) {
			  remainingBgClass = "bg-red-400";
			  remainingTextClass = "text-white";
			} else if (progressPercentage < 50) {
			  remainingBgClass = "bg-orange-400";
			  remainingTextClass = "text-white";
			} else if (progressPercentage < 75) {
			  remainingBgClass = "bg-yellow-400";
			  remainingTextClass = "text-black";
			} else {
			  remainingBgClass = "bg-green-400";
			  remainingTextClass = "text-white";
			}
		  } else {
			// Mốc tương lai: mặc định xám
			remainingBgClass = "bg-gray-300";
			remainingTextClass = "text-black";
		  }
	
		  // Xác định text hiển thị cho phần remainingText
		  let remainingText;
		  if (index < currentStep) {
			remainingText = "Đã qua";
		  } else if (index === currentStep) {
			const previousCumulative = index > 0 ? cumulativeOrdersArr[index - 1] : 0;
			const remaining = milestone.quantity - (placedOrderCount - previousCumulative);
			remainingText = `Còn ${remaining > 0 ? remaining : 0} sản phẩm`;
		  } else {
			remainingText = `Còn ${milestone.quantity} sản phẩm`;
		  }
	
		  return (
			<div
			  key={milestone.preorderMilestoneId}
			  className='w-full sm:w-[calc(33%-0.75rem)] rounded-lg overflow-hidden shadow-md bg-white'
			>
			  <div className='relative flex items-center justify-between'>
				<div className={`w-full p-3 ${isActive ? 'bg-yellow-200' : 'bg-gray-300'}`}>
				  <span className='text-sm font-medium'>
					Có {milestone.quantity} <br /> sản phẩm được giảm
				  </span>
				</div>
				<div
				  className={`py-1 px-2 text-white font-bold absolute top-0 right-0 ${
					discountPercentage < 10
					  ? 'bg-gray-500'
					  : discountPercentage < 50
					  ? 'bg-gray-600'
					  : 'bg-red-600'
				  }`}
				>
				  -{discountPercentage}%
				</div>
			  </div>
	
			  <div className='p-3'>
				<div className='text-sm text-gray-500'>Giá niêm yết</div>
				<div className='text-sm text-gray-500 line-through'>
				  {originalPrice.toLocaleString()}đ
				</div>
				<div
				  className={`mt-1 text-2xl font-bold ${
					discountPercentage > 50 ? 'text-red-600' : 'text-gray-300'
				  } `}
				>
				  {priceInVND.toLocaleString()}đ
				</div>
	
				<div className='mt-2 overflow-hidden bg-gray-200 rounded-full'>
				  <div className='flex items-center'>
					<div className={`px-2 py-1 text-xs ${remainingTextClass} ${remainingBgClass}`}>
					  <span className='relative z-10'>
						{remainingText}
					  </span>
					</div>
				  </div>
				</div>
			  </div>
			</div>
		  );
		})}
	  </div>
	);
  };
	
  export default PreorderMilestones;
  