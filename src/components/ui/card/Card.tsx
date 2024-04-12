import { FC } from 'react'
import { Link } from 'react-router-dom'
import { getWidth500ImagePath } from '../../../store/api'

type propsType = {
	id: number
	mediaType: string
	imageUrl: string | undefined | null
	title: string
}

const Card: FC<propsType> = ({ id, mediaType, imageUrl, title }) => {
	//how to return component with Image and title?P
	return (
		<div className='w-48 last:grow'>
			<Link to={`/${mediaType}/${id}`}>
				<img
					className='w-full rounded-xl'
					src={
						imageUrl
							? getWidth500ImagePath(imageUrl)
							: `https://placehold.co/600x900/000/FFF?text=${title.split(' ').join('+')}`
					}
					loading='lazy'
				/>
				<div className='flex justify-center text-xl text-white'>{title}</div>
			</Link>
		</div>
	)
}

export default Card
