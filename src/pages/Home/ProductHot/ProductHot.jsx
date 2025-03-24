import { useEffect, useState } from 'react';
// import { Button } from '../../../components/ui/button';
import { GetTheActiveBlindBox } from '../../../api/BlindBox/ApiBlindBox';
import NoThumb from '../../../assets/noThumbnailImage.jpg';
import CountdownHot from '../../../components/Sections/CountdownHot';

const ProductHot = () => {
	const [data, setData] = useState();
	const productBlind = async () => {
		const res = await GetTheActiveBlindBox();
		setData(res);
	};

	useEffect(() => {
		productBlind();
	}, []);

	const blindList = data?.data;

	return (
		<div className='-mt-4 md:-mt-7 lg:-mt-14'>
			<div className='sec-com'>
				<div className='container-lg'>
					<div className='relative flex flex-col gap-3 p-4 rounded-lg md:gap-6'>
						<div className="before:absolute before:top-0 before:left-0 before:content-[''] before:w-full before:h-1/2 before:bg-[#D62727] before:rounded-2xl"></div>

						<div className='relative z-20 flex items-center gap-2'>
							<img
								src='https://theme.hstatic.net/1000069970/1001119059/14/icon-flashsale.png?v=6834'
								alt=''
							/>
							<h2 className='text-3xl font-bold text-white'>Tháng 3 khởi sắc, bứt phá vươn xa!</h2>
						</div>
						{/* <div className='relative z-20'>
							<CountdownHot />
						</div> */}

						{/* Product Grid */}
						<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
							{blindList?.map((product) => (
								<div
									key={product.blindBoxId}
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
											src={product?.images?.mainImage?.url || NoThumb}
											alt={product.name}
											className='absolute inset-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
											sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
										/>
									</div>

									{/* Product Info */}
									<div className='flex flex-col gap-2 p-4'>
										<h3 className='text-sm font-medium line-clamp-2'>{product.name}</h3>
										<p className='text-xs text-gray-500 line-clamp-3'>{product.description}</p>
										<span className='px-2 py-1 text-xs text-white bg-red-500 rounded-md w-fit'>
											{product.size}
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
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductHot;
