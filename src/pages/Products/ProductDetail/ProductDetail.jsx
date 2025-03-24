import ProductImages from '../../../components/ProductImage/ProductImage';
import CountdownTimer from '../../../components/CountDown/CountDown';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { GetAllImagesByBlindBoxId, GetActiveDetailPreorderCampaign } from '../../../api/Pre_orderCampaign/ApiPre_orderCampaign';
import PreorderMilestones from '../../../components/PreorderMilestones/PreorderMilestones';
import OrderSection from '../../../components/OrderSectionInDetailProduct/OrderSection';
import SimilarCampaign from '../../../components/SimilarCampaign/SimilarCampaign';
import { Package, CheckCircle } from 'lucide-react';
import MyPreorderSteps from '../../../components/Steps/MyPreorderSteps';
import PreorderCampaignDetailService from '../../../Services/SignalR/PreorderCampaignDetailService';

const ProductDetail = () => {
	const params = useParams();
	const { slug } = params;

	const [data, setData] = useState();
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	console.log('data', data);

	const productDetailBlind = async () => {
		try {
			setLoading(true);
			const res = await GetActiveDetailPreorderCampaign(slug);
			setData(res);

			if (res?.blindBox?.blindBoxId) {
				const imagesList = await GetAllImagesByBlindBoxId(res.blindBox.blindBoxId);
				setImages(imagesList);
			}
		} catch (error) {
			console.error('Error fetching product details:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(()=>{
		productDetailBlind();
	},[slug])
	useEffect(()=>{
if(data!=null){
	PreorderCampaignDetailService.startConnection().then(() => {
		PreorderCampaignDetailService.joinGroup(data.slug);
	});
	PreorderCampaignDetailService.addMessageListener((message)=>{
		console.log(message)
	})
	// Nghe sự kiện cập nhật đơn hàng
	PreorderCampaignDetailService.addOrderUpdateListener((orderInfo) => {
		console.log(`Đơn hàng mới nhận được trong chiến dịch ${data.slug}:`, orderInfo);
		setData({...data,placedOrderCount:Number(orderInfo)});
	});

	// Rời khỏi Group khi rời trang
	return () => {
		PreorderCampaignDetailService.leaveGroup(data.slug);
	};
}

	},[loading])
	if (loading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='w-12 h-12 border-t-2 border-b-2 border-yellow-400 rounded-full animate-spin'></div>
			</div>
		);
	}

	return (
		<div className='py-4 bg-[#f5f4f7]'>
			<div className=' w-full max-w-screen-2xl mx-auto'>
				<div className='relative flex flex-col justify-between gap-6 lg:flex-row w-full mb-12'>
					{/* IMG */}
					<div className='top-0 w-full lg:w-1/2 lg:sticky h-max bg-white rounded-2xl shadow-lg border border-gray-200 p-6'>
					<ProductImages items={images} />
						
					</div>

					{/* TEXTS */}
					<div className='flex flex-col w-full gap-3 lg:w-1/2'>
						<div className='w-full p-6 mx-auto bg-white rounded-2xl shadow-lg border border-gray-200'>
							<div className='inline-block px-4 py-1 mb-6 text-white rounded-full bg-emerald-400'>
								Đặt trước
							</div>

							<h1 className='mb-6 text-3xl font-bold'>{data?.blindBox.name}</h1>

							{/* Milestone pricing display */}
							{data?.type==="TimedPricing"&& data?.preorderMilestones && data?.preorderMilestones.length > 0 && (
								<PreorderMilestones
								originalPrice={data.blindBox.listedPrice}
									milestones={data.preorderMilestones}
									placedOrderCount={data.placedOrderCount}
									totalQuantity={data.totalQuantity}
								/>
							)}
							<CountdownTimer targetDate={data?.endDate} />

							<div className='flex items-center gap-2 my-4'>
								<span className='inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full'>
								<Package /> <span>Mục tiêu dự kiến: {data?.totalQuantity} sản phẩm</span>
								</span>
							</div>

							<div className='flex items-center gap-2 my-4'>
								<span className='inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full'>
								<CheckCircle /> <span>Đã đặt: {data?.placedOrderCount} sản phẩm</span>
								</span>
							</div>

							<hr className='my-4 border-gray-300' />

							<div className='mb-8 space-y-6'>
								<p className='leading-relaxed text-gray-600'>{data?.blindBox.description}</p>

								<div className='space-y-4'>
									<div>
										<h3 className='mb-2 text-gray-700'>Kích cỡ:</h3>
										<div className='flex gap-2'>
											<span className='px-4 py-2 bg-yellow-100 rounded-full'>
											{data?.blindBox.size}
											</span>
										</div>
									</div>
								</div>
							</div>
							<OrderSection data={data} />
						</div>
					</div>
				</div>

				{/* Similar Campaign Section */}
				<div className="bg-white rounded-[24px] py-[30px] px-[50px] relative">
					{/* Adding margin-top to create space between Image section and Similar Campaign */}
					{data?.type!="TimedPricing"?<>
					
						<div className='w-fit absolute -top-5 left-14 py-3 px-12 font-bold text-xl transition-colors bg-yellow-400 rounded-full hover:bg-yellow-500 text-white'>
						Cập nhật chiến dịch
								</div>
								<div className='mb-20'></div>
						<div id="stepContainer" className='mb-10' >
							
						<MyPreorderSteps
					detailPreorderCampaign={data}
					preorderMilestones={data.preorderMilestones}
					/>
					</div>
					<h2 className="text-4xl font-bold mb-4 text-center ">Các Chiến Dịch Liên Quan</h2>

					</>:<div className='w-fit absolute -top-5 left-14 py-3 px-12 font-bold text-xl transition-colors bg-yellow-400 rounded-full hover:bg-yellow-500 text-white'>
									Các Chiến dịch liên quan
								</div>}
					<div className='flex w-full gap-4 overflow-x-auto pb-4'>
						<SimilarCampaign id={data.preorderCampaignId} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
