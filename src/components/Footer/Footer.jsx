import { Link } from 'react-router-dom';
import logo from '../../assets/Header/logo.png';

export default function Footer() {
    return (
        <footer className='relative w-full bg-[#FFFFFF] text-black py-8 border-t border-black'>
            <div className='relative z-10 container mx-auto px-6'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left'>
                    {/* Logo Section */}
                    <div className='space-y-4'>
                        <img src={logo} alt='Logo' className='w-32 h-auto' />
                        <p className='text-gray-700 text-sm'>
                        Preorder Blindbox System - nơi dành cho những người sưu tầm blindbox! 
                        Chúng tôi cung cấp cơ hội đặt hàng trước những bộ sưu tập hot nhất với mức giá ưu đãi và số lượng có hạn.
                        </p>
                        <p className='text-gray-600 text-sm'>Đặt hàng trước ngay hôm nay để được hưởng ưu đãi</p>
                    </div>

                    {/* Links Section */}
                    <div className='space-y-4'>
                        <h3 className='text-lg font-semibold'>THEO DÕI CHÚNG TÔI</h3>
                        <nav className='space-y-2'>
                            {['Facebook', 'Twitter', 'Instagram', 'Tiktok'].map((item) => (
                                <a
                                    key={item}
                                    href='#'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='block text-gray-700 hover:text-black transition-colors'
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Policies Section */}
                    <div className='space-y-4'>
                        <h3 className='text-lg font-semibold'>CHÍNH SÁCH</h3>
                        <nav className='space-y-2'>
                            {[
                                { name: 'Chính sách bảo hành', url: '#' },
                                { name: 'Chính sách giao hàng', url: '#' },
                                { name: 'Chính sách bảo mật', url: '#' },
                            ].map((item) => (
                                <a
                                    key={item.name}
                                    href={item.url}
                                    className='block text-gray-700 hover:text-black transition-colors'
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* About Us Section */}
                    <div className='space-y-4'>
                        <h3 className='text-lg font-semibold'>VỀ CHÚNG TÔI</h3>
                        <p className='text-gray-700'>
                        Cam kết mang đến trải nghiệm mua sắm độc lập, mỗi sản phẩm trong cửa hàng đều được lựa chọn kỹ lưỡng,
                         đảm bảo sự bất ngờ và thú vị cho khách hàng. Tham gia ngay để không bỏ lỡ cơ hội sở hữu những sản phẩm độc quyền!
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
