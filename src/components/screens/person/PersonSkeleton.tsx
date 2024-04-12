import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'

const PersonSkeleton: FC = () => {
	return (
		<>
			<div className='w-screen flex space-x-4 px-40 pt-40'>
				<div className='w-1/4'>
					<Skeleton height='100%' />
				</div>
				<div className='w-3/4'>
					<Skeleton height={60} />
					<Skeleton height={30} />
					<Skeleton height={30} />
					<Skeleton height={30} />
					<Skeleton height={30} />
					<Skeleton height={30} />
					<Skeleton height={30} />
					<Skeleton height={30} />
					<Skeleton height={30} />
					<Skeleton height={30} />
				</div>
			</div>
			<div className='w-full flex space-x-4 p-20'>
				<Skeleton containerClassName='flex-1' height={350} />
				<Skeleton containerClassName='flex-1' height={350} />
				<Skeleton containerClassName='flex-1' height={350} />
				<Skeleton containerClassName='flex-1' height={350} />
				<Skeleton containerClassName='flex-1' height={350} />
			</div>
		</>
	)
}

export default PersonSkeleton
