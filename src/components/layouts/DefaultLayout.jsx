import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function DefaultLayout({ children }) {
	return (
		<div className='relative'>
			<div>
				<Header />
				<div>
					{children}
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default DefaultLayout;
