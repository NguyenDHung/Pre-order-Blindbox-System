import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import { useState, useEffect, useRef } from 'react';
import { GetAllBanner } from '../../api/Banner/ApiBanner';
import { Link } from 'react-router-dom';
import LeftButton from '../../assets/BulkOrder/LeftButton.png'
import RightButton from '../../assets/BulkOrder/RightButton.png'
export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigationLeftRef = useRef()
  const navigationRighttRef = useRef()
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await GetAllBanner();
        setBanners(data);
      } catch (err) {
        setError('Đã có lỗi xảy ra khi tải banner');
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}

        autoplay={{ delay: 2500, disableOnInteraction: true }}

        direction={'vertical'}
        pagination={{
          clickable: true,
        }}
        className="mySwiper w-full h-[550px] object-cover relative" 
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationLeftRef.current;
          swiper.params.navigation.nextEl = navigationRighttRef.current;
       }}
      >
        {banners?.map((banner) => (
          <SwiperSlide key={banner.bannerId}>
            <Link to={banner.callToActionUrl || '#'}>
              <img
                src={banner.imageUrl}
                alt={banner.title || 'Banner'}
                className="w-full h-full object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
        <div ref={navigationLeftRef} className='z-40 bg-none w-auto h-auto  rotate-[90deg] left-10 absolute -translate-y-1/2 top-[50%] mt-[-22px] cursor-pointer leading-[1.6]'>
                                <img className='max-w-full h-auto align-middle '
                                   src={LeftButton} alt="Nút bên trái" />
                             </div>
                             {/* Nút phải */}
                             <div ref={navigationRighttRef} className='z-40 bg-none w-auto rotate-[90deg]  h-auto left-10 -translate-y-1/2  absolute top-[50%] mt-[40px] cursor-pointer leading-[1.6]'>
                                <img className='max-w-full h-auto align-middle '
                                   src={RightButton} alt="Nút bên phải" />
                             </div>
        
      </Swiper>
    </div>
  );
}