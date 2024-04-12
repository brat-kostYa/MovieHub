export interface IResponse {
	page: number
	total_pages: number
	total_results: number
}

export interface ISpokenLanguage {
	english_name: string
	iso_639_1: string
	name: string
}

export interface IProductionCountry {
	iso_3166_1: string
	name: string
}

export interface IProductionCompany {
	id: number
	logo_path?: string
	name: string
	origin_country: string
}

export interface IGenre {
	id: number
	name: string
}

export interface Season {
	air_date: string
	episode_count: number
	id: number
	name: string
	overview: string
	poster_path?: string
	season_number: number
	vote_average: number
}

export interface Network {
	id: number
	logo_path: string
	name: string
	origin_country: string
}

export interface LastEpisodeToAir {
	id: number
	name: string
	overview: string
	vote_average: number
	vote_count: number
	air_date: string
	episode_number: number
	production_code: string
	runtime: number
	season_number: number
	show_id: number
	still_path?: null
}
