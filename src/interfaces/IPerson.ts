interface IKnownFor {
	adult: boolean
	backdrop_path?: string
	id: number
	title?: string
	original_language: string
	original_title?: string
	overview: string
	poster_path?: string | string
	media_type: string
	genre_ids: number[]
	popularity: number
	release_date?: string
	video?: boolean
	vote_average: number
	vote_count: number
	name?: string
	original_name?: string
	first_air_date?: string
	origin_country?: string[]
}

export interface IPerson {
	adult: boolean
	id: number
	name: string
	original_name: string
	media_type: string
	popularity: number
	gender: number
	known_for_department: string
	profile_path?: string
	known_for: IKnownFor[]
}

export interface IPersonInfo {
	adult: boolean
	also_known_as: string[]
	biography: string
	birthday: string
	deathday?: string
	gender: number
	homepage: string
	id: number
	imdb_id: string
	known_for_department: string
	name: string
	place_of_birth: string
	popularity: number
	profile_path: string
}

export interface IPersonImages {
	id: number
	profiles: Profile[]
}

interface Profile {
	aspect_ratio: number
	height: number
	iso_639_1?: string
	file_path: string
	vote_average: number
	vote_count: number
	width: number
}
