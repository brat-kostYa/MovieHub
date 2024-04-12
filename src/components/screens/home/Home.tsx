import { FC, Suspense } from 'react'

import Footer from '../../layouts/footer/Footer'
import Hero from './hero/Hero'
import Trending from './trending/Trending'

const Home: FC = () => {
	return (
		<div className='overflow-hidden max-w-full'>
			<Suspense>
				<Hero />
				<Trending title='Trending all' linkTo='movie' category='movie' />
				<Trending title='Trending movies' linkTo='movie' category='movie' />
				<Trending title='Trending TV' linkTo='tv' category='tv' />
				<Trending title='Trending people' linkTo='person' category='person' />
			</Suspense>
			<Footer />
		</div>
	)
}

export default Home
