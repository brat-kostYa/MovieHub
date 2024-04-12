import { IResponse } from './IAdditionalInfo'
import { ICast } from './ICredits'
import { IMovie } from './IMovie'
import { IPerson } from './IPerson'
import { ITv } from './ITv'

interface ITrendingMovies extends IResponse {
	results: IMovieResult[]
}

interface ITrendingTV extends IResponse {
	results: ITvResult[]
}

interface ITrendingPeoples extends IResponse {
	results: IPersonResult[]
}

interface IMovieResult extends IMovie {
	media_type: string
}

interface ITvResult extends ITv {
	adult: boolean
	media_type: string
}

interface IPersonResult extends IPerson {
	media_type: string
}

export type TrendingDataType = ITrendingMovies | ITrendingTV | ITrendingPeoples
export type TrendingResultsType = IMovieResult | ITvResult | IPersonResult | ICast
