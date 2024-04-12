import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICredits } from '../interfaces/ICredits'
import { IDetailsData } from '../interfaces/IDetails'
import { IDiscoverData } from '../interfaces/IDiscover'
import { IExternalIDs } from '../interfaces/IExternalIDs'
import { IUpcomingMovie } from '../interfaces/IMovie'
import { IPersonImages, IPersonInfo } from '../interfaces/IPerson'
import { ITrailerVideo } from '../interfaces/ITrailerVideo'
import { TrendingDataType } from '../interfaces/ITrending'
import { categoryAndTime, discoveryType, movieTvInfoType, searchType } from './api.types'

export const getOriginalImagePath = (imagePath: string) => `https://image.tmdb.org/t/p/original/${imagePath}`
export const getWidth500ImagePath = (imagePath: string) => `https://image.tmdb.org/t/p/w500/${imagePath}`

export const movieApi = createApi({
	reducerPath: 'movieApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.themoviedb.org/3/',
		headers: {
			accept: 'application/json',
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWVlYTE0YzM5Y2FiZjBlNzk5OTk4NThiZGVmYzg3NiIsInN1YiI6IjY0YTA0NDIxYzM5MGM1MDBjYWZmOTk2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y60xIYli7UsGFg1q-u36MHNTnyp74rbwvk0ykwcc_lw',
		},
	}),

	endpoints: builder => ({
		getMovieList: builder.query<IUpcomingMovie, number>({
			query: page => `movie/upcoming?language=en-US&page=${page}`,
		}),
		getTrailerVideo: builder.query<ITrailerVideo, movieTvInfoType>({
			query: ({ id, category }) => `${category}/${id}/videos`,
		}),
		getTrendingData: builder.query<TrendingDataType, categoryAndTime>({
			query: ({ category, time }) => `trending/${category}/${time}`,
		}),
		getDiscover: builder.query<IDiscoverData, discoveryType>({
			query: ({ category, params }) => ({ url: `discover/${category}`, params }),
		}),
		getSearched: builder.query<TrendingDataType, searchType>({
			query: ({ category, params }) => ({ url: `search/${category}`, params }),
		}),
		getDetails: builder.query<IDetailsData, movieTvInfoType>({
			query: ({ id, category }) => `${category}/${id}`,
		}),
		getCredits: builder.query<ICredits, movieTvInfoType>({
			query: ({ id, category }) => `${category}/${id}/credits`,
		}),
		getExternalIDs: builder.query<IExternalIDs, movieTvInfoType>({
			query: ({ id, category }) => `${category}/${id}/external_ids`,
		}),
		getSimilar: builder.query<TrendingDataType, movieTvInfoType>({
			query: ({ id, category }) => `${category}/${id}/similar`,
		}),
		getPersonInfo: builder.query<IPersonInfo, string>({
			query: id => `person/${id}`,
		}),
		getPersonImages: builder.query<IPersonImages, string>({
			query: id => `person/${id}/images`,
		}),
	}),
})

export const {
	useGetMovieListQuery,
	useGetTrailerVideoQuery,
	useGetTrendingDataQuery,
	useLazyGetDiscoverQuery,
	useLazyGetSearchedQuery,
	useGetDetailsQuery,
	useGetCreditsQuery,
	useGetExternalIDsQuery,
	useGetSimilarQuery,
	useGetPersonInfoQuery,
	useGetPersonImagesQuery,
} = movieApi
