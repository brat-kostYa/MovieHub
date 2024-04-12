import { FC, useState } from 'react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useGetMovieListQuery } from '../../../../store/api'
import style from '../Home.module.scss'
import HeroItem from './HeroItem'
import TrailerModal from './TrailerModal'

const Hero: FC = () => {
	const { data, isLoading } = useGetMovieListQuery(1)
	const [modalIsOpened, setModalIsOpened] = useState(false)
	const [trailerId, setTrailerId] = useState<number | null>(null)
	const sliderItems = data?.results.slice(0, 4)
	return (
		<div>
			<Swiper
				className={style.swiper}
				slidesPerView={1}
				grabCursor
				loop={true}
				autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
				modules={[Autoplay]}>
				{isLoading ? (
					<SwiperSlide className={style.slide}>
						<HeroItem item={null} setTrailerId={setTrailerId} setModalIsOpened={setModalIsOpened} />
					</SwiperSlide>
				) : (
					sliderItems?.map(item => (
						<SwiperSlide className={style.slide} key={item.id}>
							<HeroItem item={item} setTrailerId={setTrailerId} setModalIsOpened={setModalIsOpened} />
						</SwiperSlide>
					))
				)}
			</Swiper>

			{trailerId && (
				<TrailerModal modalIsOpened={modalIsOpened} setModalIsOpened={setModalIsOpened} trailerId={trailerId} />
			)}
		</div>
	)
}

export default Hero
