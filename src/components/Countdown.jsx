import { useEffect, useState } from "react";
function Countdown({ EndDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endDate = new Date(EndDate);
      const difference = endDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    console.log(timeLeft);

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer); // Clear interval when component unmounts
  }, [EndDate]);

  return (
    <div>
      <div className="flex items-start justify-center w-full gap-4 count-down-main">
        <div className="timer w-16">
          <div>
            <h3 className="countdown-element days font-manrope font-semibold text-2xl text-indigo-600 text-center">
              {timeLeft.days}
            </h3>
          </div>
          <p className="text-sm font-normal text-gray-900 mt-1 text-center w-full">
            days
          </p>
        </div>
        <h3 className="font-manrope font-semibold text-2xl text-gray-900">:</h3>
        <div className="timer w-16">
          <div>
            <h3 className="countdown-element hours font-manrope font-semibold text-2xl text-indigo-600 text-center">
              {timeLeft.hours}
            </h3>
          </div>
          <p className="text-sm font-normal text-gray-900 mt-1 text-center w-full">
            hours
          </p>
        </div>
        <h3 className="font-manrope font-semibold text-2xl text-gray-900">:</h3>
        <div className="timer w-16">
          <div>
            <h3 className="countdown-element minutes font-manrope font-semibold text-2xl text-indigo-600 text-center">
              {timeLeft.minutes}
            </h3>
          </div>
          <p className="text-sm font-normal text-gray-900 mt-1 text-center w-full">
            minutes
          </p>
        </div>
        <h3 className="font-manrope font-semibold text-2xl text-gray-900">:</h3>
        <div className="timer w-16">
          <div>
            <h3 className="countdown-element seconds font-manrope font-semibold text-2xl text-indigo-600 text-center">
              {timeLeft.seconds}
            </h3>
          </div>
          <p className="text-sm font-normal text-gray-900 mt-1 text-center w-full">
            seconds
          </p>
        </div>
      </div>
      
    </div>
  );
}

export default Countdown;
