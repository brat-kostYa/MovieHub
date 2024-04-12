import { FC, SetStateAction } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useGetTrailerVideoQuery } from '../../../../store/api'

type trailerPropsType = {
	modalIsOpened: boolean
	setModalIsOpened: (value: SetStateAction<boolean>) => void
	trailerId: number
}

const TrailerModal: FC<trailerPropsType> = ({ modalIsOpened, setModalIsOpened, trailerId }) => {
	const { data, isLoading } = useGetTrailerVideoQuery({ id: String(trailerId), category: 'movie' })
	return (
		<>
			{modalIsOpened && (
				<div
					className='fixed w-full h-full bg-gray-950 bg-opacity-50 top-0 left-0 flex justify-center items-center cursor-pointer overflow-hidden z-10'
					onClick={() => setModalIsOpened(false)}>
					<div
						className='bg-black bg-opacity-75 cursor-default w-3/4 rounded-2xl shadow-lg shadow-teal-400 p-8'
						onClick={e => e.stopPropagation()}>
						{isLoading ? (
							<Skeleton width='100%' height='500px' />
						) : (
							<iframe
								src={`https://www.youtube.com/embed/${data?.results[0].key}`}
								width='100%'
								height='500px'
								title='trailer'
							/>
						)}
					</div>
				</div>
			)}
		</>
	)
}

export default TrailerModal
