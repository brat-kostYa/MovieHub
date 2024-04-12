import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'

const SingleMediaSkeleton: FC = () => {
	return (
		<>
			<div className='w-screen flex space-x-4 px-40 pt-40'>
				<div className='w-1/4'>
					<Skeleton height='100%' />
				</div>

				<div className='w-3/4'>
					<Skeleton height={50} />
					<Skeleton height={20} />
					<Skeleton height={20} />
					<Skeleton height={20} />
					<Skeleton height={20} />
					<div className='w-full flex space-x-4 pt-10'>
						<Skeleton containerClassName='flex-1' height={200} />
						<Skeleton containerClassName='flex-1' height={200} />
						<Skeleton containerClassName='flex-1' height={200} />
						<Skeleton containerClassName='flex-1' height={200} />
						<Skeleton containerClassName='flex-1' height={200} />
						<Skeleton containerClassName='flex-1' height={200} />
					</div>
				</div>
			</div>
			<Skeleton containerClassName='flex justify-center py-10' height='800px' width='80%' />
			<div className='w-full flex space-x-4 px-20'>
				<Skeleton containerClassName='flex-1' height={320} />
				<Skeleton containerClassName='flex-1' height={320} />
				<Skeleton containerClassName='flex-1' height={320} />
				<Skeleton containerClassName='flex-1' height={320} />
				<Skeleton containerClassName='flex-1' height={320} />
				<Skeleton containerClassName='flex-1' height={320} />
			</div>
		</>
	)
}

export default SingleMediaSkeleton
