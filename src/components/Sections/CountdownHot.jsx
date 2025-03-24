import { useState } from 'react';
import GradientButton from '../Buttons/GradientButton';
import Countdown from '../Countdown';
import { Button } from '../ui/button';

function CountdownHot() {
	const [voucherDetail, setVoucherDetail] = useState({
		StartDate: new Date('2025-01-25T16:14:37.617Z').getTime(),
		EndDate: new Date('2025-02-24T16:14:37.617Z').getTime(),
		Quantity: 100,
		MaximumUserCanGet: 2,
		PercentDiscount: 10,
		MaximumMoneyDiscount: 100,
		Status: 'Active',
		IsDelete: 0,
	});

	return (
		<div className='w-full flex items-center justify-between'>
			<section className='bg-white w-fit rounded-full'>
				<div className='bg-white rounded-full text-center flex items-center overflow-hidden gap-1 p-1'>
					<h3 className='text-lg leading-5 text-gray-800 text-center px-4'>
						Deal này sắp <br /> hết thời gian
					</h3>
					{voucherDetail?.EndDate ? (
						<Countdown EndDate={voucherDetail.EndDate} />
					) : (
						<p>No End Date Available</p>
					)}
				</div>
			</section>
			<Button className='bg-[#D62727] py-2 px-4 border-2 border-white rounded-full uppercase'>
				Nhận voucher ngay
			</Button>
		</div>
	);
}

export default CountdownHot;
