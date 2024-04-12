import { FC } from 'react'
import { useGetExternalIDsQuery } from '../../../store/api'
import { movieTvInfoType } from '../../../store/api.types'

const VideoPlayer: FC<movieTvInfoType> = ({ id, category }) => {
	const { data } = useGetExternalIDsQuery({ id, category })
	return data ? (
		<iframe
			src={`https://vidsrc.me/embed/${category}?imdb=${data.imdb_id}`}
			frameBorder='0'
			width='100%'
			height='100%'
			allowFullScreen></iframe>
	) : (
		<div>empty</div>
	)
}

export default VideoPlayer
