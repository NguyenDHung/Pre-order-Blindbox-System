import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ targetDate }) => {
	const calculateTimeLeft = () => {
		const difference = new Date(targetDate) - new Date();
		if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

		const days = Math.floor(difference / (1000 * 60 * 60 * 24));
		const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((difference / (1000 * 60)) % 60);
		const seconds = Math.floor((difference / 1000) % 60);

		return { days, hours, minutes, seconds };
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(timer);
	}, [targetDate]);

	// Format số có 2 chữ số
	const formatTime = (num) => String(num).padStart(2, '0');

	return (
		<div className='bg-red-600 text-white p-4 flex items-center justify-center gap-4 rounded-xl'>
			<div className='text-center'>
				<div className='text-3xl font-bold'>{formatTime(timeLeft.days)}</div>
				<div className='text-sm'>ngày</div>
			</div>
			<div className='text-3xl font-bold'>:</div>
			<div className='text-center'>
				<div className='text-3xl font-bold'>{formatTime(timeLeft.hours)}</div>
				<div className='text-sm'>giờ</div>
			</div>
			<div className='text-3xl font-bold'>:</div>
			<div className='text-center'>
				<div className='text-3xl font-bold'>{formatTime(timeLeft.minutes)}</div>
				<div className='text-sm'>phút</div>
			</div>
			<div className='text-3xl font-bold'>:</div>
			<div className='text-center'>
				<div className='text-3xl font-bold'>{formatTime(timeLeft.seconds)}</div>
				<div className='text-sm'>giây</div>
			</div>
		</div>
	);
};

// Chỉ định ngày đích cụ thể:
export default function CountDown({targetDate}) {
	return (
		<div className='flex flex-col items-center space-y-2 p-2 '>
			<CountdownTimer targetDate={targetDate} />
		</div>
	);
}