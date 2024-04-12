import { FC } from 'react'
import { useGetCreditsQuery } from '../../../store/api'
import { movieTvInfoType } from '../../../store/api.types'
import TrendingSwiper from '../home/trendingSwiper/TrendingSwiper'

const MovieCredits: FC<movieTvInfoType> = ({ id, category }) => {
	const { data } = useGetCreditsQuery({ id, category })

	return (
		<div className='flex space-x-4 py-4'>
			<TrendingSwiper sliderItems={data?.cast} category='person' />
		</div>
	)
}

export default MovieCredits
