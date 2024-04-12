import { FC } from 'react'
import { useGetSimilarQuery } from '../../../store/api'
import { movieTvInfoType } from '../../../store/api.types'
import TrendingSwiper from '../home/trendingSwiper/TrendingSwiper'

const Similar: FC<movieTvInfoType> = ({ id, category }) => {
	const { data } = useGetSimilarQuery({ id, category })
	return (
		<>
			<div className='px-20 py-4 text-4xl'>Similar {category}</div>
			<TrendingSwiper sliderItems={data?.results} category={category} />
		</>
	)
}

export default Similar
