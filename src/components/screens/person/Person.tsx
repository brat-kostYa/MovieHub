import { FC } from 'react'
import { useParams } from 'react-router-dom'
import {
	getOriginalImagePath,
	getWidth500ImagePath,
	useGetPersonImagesQuery,
	useGetPersonInfoQuery,
} from '../../../store/api'
import PersonSkeleton from './PersonSkeleton'

const Person: FC = () => {
	const { id = '' } = useParams()
	const { data, isLoading } = useGetPersonInfoQuery(id)
	const { data: images } = useGetPersonImagesQuery(id)

	if (isLoading || !data) return <PersonSkeleton />

	return (
		<>
			<div
				className='w-screen h-min-96 px-40 pt-40'
				style={{
					background: `linear-gradient(to top, #0a0a0a, rgba(0, 0, 0, 0.5)), url(${
						images?.profiles.length
							? getOriginalImagePath(images.profiles[0].file_path)
							: `https://placehold.co/1400x600/000/FFF?text=${data.name.split(' ').join('+')}`
					})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
				}}>
				<div className='flex space-x-20'>
					<img className='h-96' src={getWidth500ImagePath(data.profile_path)} />
					<div>
						<div className='text-center text-2xl'>{data.name}</div>
						<div className='text-justify text-xl indent-4'>{data.biography}</div>
					</div>
				</div>
			</div>
			<div className='flex px-40 flex-wrap justify-between gap-8 pt-10'>
				{images?.profiles.map(image => (
					<img className='h-96 rounded-xl' src={getWidth500ImagePath(image.file_path)} />
				))}
			</div>
		</>
	)
}

export default Person
