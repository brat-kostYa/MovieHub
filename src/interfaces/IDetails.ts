import {
	IGenre,
	IProductionCompany,
	IProductionCountry,
	ISpokenLanguage,
	LastEpisodeToAir,
	Network,
	Season,
} from './IAdditionalInfo'
import { IMovie } from './IMovie'
import { ITv } from './ITv'

interface IDetails {
	genres: IGenre[]
	homepage: string
	production_companies: IProductionCompany[]
	production_countries: IProductionCountry[]
	spoken_languages: ISpokenLanguage[]
	status: string
	tagline: string
}

interface ITvDetails extends ITv, IDetails {
	adult: boolean
	created_by: string[]
	episode_run_time: number[]
	in_production: boolean
	languages: string[]
	last_air_date: string
	last_episode_to_air: LastEpisodeToAir
	next_episode_to_air?: null
	networks: Network[]
	number_of_episodes: number
	number_of_seasons: number
	seasons: Season[]
	type: string
}

interface IMovieDetails extends IMovie, IDetails {
	belongs_to_collection?: null
	budget: number
	imdb_id: string
	revenue: number
	runtime: number
}

export type IDetailsData = ITvDetails | IMovieDetails
