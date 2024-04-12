import { FC, useState } from 'react'
type PropsType = {
	searchHandler: (value: string) => void
}
const Search: FC<PropsType> = ({ searchHandler }) => {
	const [searchString, setSearchString] = useState('')

	return (
		<div className='w-full px-32 pt-8 space-x-4 flex'>
			<input
				className='text-black py-2 rounded-xl px-2 w-60'
				value={searchString}
				onChange={e => setSearchString(e.target.value)}
			/>
			<button className='outlinedButton py-2' onClick={() => searchHandler(searchString)}>
				Search
			</button>
		</div>
	)
}

export default Search
