export type movieTvType = 'movie' | 'tv'
export type movieTvPersonType = movieTvType | 'person'
export type timeType = 'day' | 'week'
export type categoryType = movieTvType | 'all' | 'person'
export type categoryAndTime = { category: categoryType; time: timeType }

export type movieTvInfoType = {
	id: string
	category: movieTvType
}

export type discoveryType = {
	category: movieTvType
	params: {
		page: number
		with_genres: string
	}
}

export type searchType = {
	category: movieTvPersonType
	params: {
		query: string
		page: number
	}
}
