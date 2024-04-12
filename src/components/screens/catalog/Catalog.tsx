import { FC, useState } from 'react'
import useMediaList from '../../../hooks/useMediaList'
import { movieTvPersonType } from '../../../store/api.types'
import Card from '../../ui/card/Card'
import PageHeader from '../../ui/pageHeader/PageHeader'
import Search from '../../ui/search/Search'
import GenresDropdown from './GenresDropdown'
type propsType = {
	category: movieTvPersonType
}

const Catalog: FC<propsType> = ({ category }) => {
	const [queryString, setQueryString] = useState('')
	const [page, setPage] = useState(1)
	const [activeGenre, setActiveGenre] = useState<number[]>([])
	const { movieList, setMovieList, isLoading, totalPages } = useMediaList(queryString, category, page, activeGenre)

	const loadMoreHandler = () => {
		setPage(prev => prev + 1)
	}

	const setGenre = (genres: number[]) => {
		setMovieList([])
		setPage(1)
		setActiveGenre(genres)
	}

	const searchHandler = (searchString: string) => {
		if (searchString.trim().length && searchString !== queryString) {
			setMovieList([])
			setPage(1)
			setQueryString(searchString.trim())
		}
	}

	return (
		<div className='flex flex-col items-center'>
			<PageHeader pageTitle={category.toUpperCase()} />
			<Search searchHandler={searchHandler} />
			{category !== 'person' && <GenresDropdown activeGenres={activeGenre} setActiveGenre={setGenre} />}
			<div className='grid grid-cols-6 gap-4 py-8'>
				{!isLoading &&
					movieList.map(item => (
						<Card
							key={item.id}
							id={item.id}
							mediaType={category}
							imageUrl={'poster_path' in item ? item.poster_path : item.profile_path}
							title={'title' in item ? item.title : item.name}
						/>
					))}
			</div>
			<div className={`w-full flex justify-center pb-10 ${page < totalPages ? '' : 'hidden '}`}>
				<button
					className={`outlinedButton ${isLoading ? 'cursor-not-allowed' : ''}`}
					onClick={loadMoreHandler}
					disabled={isLoading}>
					Load more
				</button>
			</div>
		</div>
	)
}

export default Catalog
