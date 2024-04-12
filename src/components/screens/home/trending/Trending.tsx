import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetTrendingDataQuery } from '../../../../store/api'
import { categoryType, timeType } from '../../../../store/api.types'
import TimeTab from '../timeTab/TimeTab'
import TrendingSwiper from '../trendingSwiper/TrendingSwiper'

type propsType = {
	title: string
	linkTo: 'movie' | 'tv' | 'person'
	category: categoryType
}

const TrendingAll: FC<propsType> = ({ title, linkTo, category }) => {
	const [time, setTime] = useState<timeType>('day')

	const { data } = useGetTrendingDataQuery({ time, category })

	return (
		<>
			{data?.results && (
				<div className='w-full py-10'>
					<div className='flex justify-between container p-10'>
						<div className='text-4xl flex'>
							<div>{title}</div>
							<TimeTab time={time} setTime={setTime} />
						</div>
						<Link to={linkTo} className='outlinedButton'>
							More...
						</Link>
					</div>
					{<TrendingSwiper sliderItems={data?.results} category={category} />}
				</div>
			)}
		</>
	)
}

export default TrendingAll
