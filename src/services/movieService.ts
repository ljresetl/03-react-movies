import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { Movie } from '../types/movie'

interface TMDBSearchResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

const token = import.meta.env.VITE_TMDB_TOKEN as string | undefined

if (!token) {
  // Якщо токен не заданий — кидаємо помилку одразу (щоб не відправляти запити без авторизації)
  throw new Error('VITE_TMDB_TOKEN is not defined. Please set it in environment variables.')
}

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
})

export async function fetchMovies(query: string, page = 1): Promise<Movie[]> {
  const params = {
    query,
    include_adult: false,
    page,
  }

  const response: AxiosResponse<TMDBSearchResponse> = await api.get('/search/movie', { params })
  return response.data.results
}
