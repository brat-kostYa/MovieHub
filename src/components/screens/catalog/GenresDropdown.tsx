import { FC } from 'react'
import Select from 'react-select'
import { genres } from '../../../interfaces/IDiscover'

type propsType = {
	activeGenres: number[]
	setActiveGenre: (value: number[]) => void
}
const options = genres.map(genre => ({ value: genre.id, label: genre.name }))

const GenresDropdown: FC<propsType> = ({ activeGenres, setActiveGenre }) => {
	return (
		<Select
			placeholder={'activeGenre'}
			options={options}
			onChange={e => setActiveGenre(e.map(el => el.value))}
			isMulti
			isOptionDisabled={() => activeGenres.length >= 3}
			closeMenuOnSelect={false}
		/>
	)
}
export default GenresDropdown
