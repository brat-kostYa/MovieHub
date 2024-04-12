import { FC, SetStateAction } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import { IMovie } from '../../../../interfaces/IMovie'
import { getOriginalImagePath, getWidth500ImagePath } from '../../../../store/api'
import style from '../Home.module.scss'

type HeroItemPropsType = {
	item: IMovie | null
	setTrailerId: (value: SetStateAction<number | null>) => void
	setModalIsOpened: (value: SetStateAction<boolean>) => void
}

const HeroItem: FC<HeroItemPropsType> = ({ item, setTrailerId, setModalIsOpened }) => {
	const background = getOriginalImagePath(item ? item.backdrop_path : '')
	const trailerHandler = () => {
		setTrailerId(item && item.id)
		setModalIsOpened(true)
	}
	return (
		<>
			<div
				className={style.heroItem}
				style={{
					background: `linear-gradient(to top, #0a0a0a, rgba(0, 0, 0, 0)), url(${background})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
				}}>
				<div className={`${style.heroItemCol} w-7/12 px-8`}>
					{item ? (
						<>
							<div className='text-xl md:text-6xl pb-4 font-bold'>{item.title}</div>
							<div className='w-full text-xl  md:text-3xl text-justify indent-4 p-2'>{item?.overview}</div>
						</>
					) : (
						<div className='w-full mb-8'>
							<Skeleton className='mb-8' height='10vh' />
							<Skeleton height='40vh' />
						</div>
					)}

					{item ? (
						<div className='flex space-x-4 pt-8 text-2xl'>
							<Link to={`/movie/${item?.id}`} className='button'>
								Watch now
							</Link>
							<button className='outlinedButton' onClick={trailerHandler}>
								Watch trailer
							</button>
						</div>
					) : (
						<div className='w-full flex space-x-6'>
							<Skeleton containerClassName='flex-1' height='10vh' />
							<Skeleton containerClassName='flex-1' height='10vh' />
						</div>
					)}
				</div>
				<div className={`${style.heroItemCol} w-5/12`}>
					{item ? (
						<img
							className='w-44 sm:56 md:w-96 rounded-2xl'
							src={getWidth500ImagePath(item ? item.poster_path : '')}
						/>
					) : (
						<div className='w-1/2'>
							<Skeleton height='75vh' />
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default HeroItem
