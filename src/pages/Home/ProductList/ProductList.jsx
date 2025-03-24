/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
// import { Button } from '../../../components/ui/button';
import NoThumb from '../../../assets/noThumbnailImage.jpg';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { GetTheActivePreorderCampaign } from '../../../api/Pre_orderCampaign/ApiPre_orderCampaign';


const tabs = [
	{ id: 'DỰ ÁN THỊNH HÀNH', label: 'DỰ ÁN THỊNH HÀNH' },
	{ id: 'MỚI RA MẮT', label: 'MỚI RA MẮT' },
	{ id: 'SẮP KẾT THÚC', label: 'SẮP KẾT THÚC' },
];

const ProductList = ({ title = 'ĐẶT HÀNG VỀ TAY SỚM NHẤT' }) => {
	const [activeTab, setActiveTab] = useState(tabs[0].id);
	const [data, setData] = useState();
	const productBlind = async () => {
		const res = await GetTheActivePreorderCampaign();
		setData(res);
	};

	useEffect(() => {
		productBlind();
	}, []);

	const blindList = data?.data;
	console.log('blindList', blindList);

	return (
		<div className='relative'>
			<div className="bg-[url('//theme.hstatic.net/1000069970/1001119059/14/preorder-bg.png?v=6834')] bg-no-repeat bg-cover pb-5 md:pb-10 lg:pb-20">
				<div className='sec-com'>
					<div className='container-lg'>
						<div className='flex flex-col gap-3 md:gap-6'>
							<h2 className='text-3xl font-bold text-center'>{title}</h2>
							<div className='flex justify-center p-1 mx-auto space-x-1 bg-white rounded-full w-fit'>
								{tabs.map((tab) => (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`${activeTab === tab.id ? '' : 'hover:bg-yellow-300'
											} relative rounded-full px-3 py-1.5 text-sm font-medium text-black outline-sky-400 transition focus-visible:outline-2`}
										style={{
											WebkitTapHighlightColor: 'transparent',
										}}
									>
										{activeTab === tab.id && (
											<motion.span
												layoutId='bubble'
												className='absolute inset-0 z-10 bg-yellow-400'
												style={{ borderRadius: 9999 }}
												transition={{ type: 'spring', bounce: 0.2, duration: 1 }}
											/>
										)}
										<span
											className={`${activeTab === tab.id ? 'text-black' : 'text-gray-500'
												} relative z-20`}
										>
											{tab.label}
										</span>
									</button>
								))}
							</div>

							{/* Product Grid */}
							<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
								{blindList?.map((product) => (
									<Link
										to={`/preordercampaign/${product.slug}`}
										key={product.slug}
										className='relative overflow-hidden bg-white rounded-lg shadow-lg group'
									>
										{/* Pre-order Badge */}
										<div className='absolute z-10 top-4 left-4'>
											<div className='px-2 py-1 text-xs font-bold text-white bg-red-500 rounded'>
												PRE-ORDER
											</div>
										</div>

										{/* Product Image */}
										<div className='relative w-full h-48'>
											<img
												src={product.blindBox?.mainImages?.url || NoThumb}
												alt={product.name}
												className='absolute inset-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
												sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
											/>
										</div>

										{/* Product Info */}
										<div className='flex flex-col gap-2 p-4'>
											<h3 className='text-sm font-medium line-clamp-2'>{product?.blindBox.name}</h3>
											
											<p className='text-xs text-gray-500 line-clamp-3'>{product?.blindBox.description}</p>

											<span className='px-2 py-1 text-xs text-white bg-red-500 rounded-md w-fit'>
												{product?.blindBox.size}
											</span>

											{/* Order Progress */}
											<div className='flex justify-between text-sm'>
												<span>
													Số lượng đã đặt: {product.ordered}/{product.total}
												</span>
											</div>
											<div className='w-full h-2 bg-gray-200 rounded-full'>
												<div
													className='h-2 bg-red-500 rounded-full'
													style={{
														width: `${(product.ordered / product.total) * 100}%`,
													}}
												/>
											</div>
											<div className='text-sm text-gray-600'>
												{/* {product.endDate.includes('Sản phẩm') ? (
													<span className='text-blue-600'>{product.endDate}</span>
												) : (
													<span>Chiến dịch kết thúc: {product.endDate}</span>
												)} */}
											</div>
										</div>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
