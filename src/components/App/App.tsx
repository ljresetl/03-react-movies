import React, { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'
import type { Movie } from '../../types/movie'
import { fetchMovies } from '../../services/movieService'
import toast, { Toaster } from 'react-hot-toast'

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const handleSearch = async (query: string) => {
    // кожен новий пошук очищає попередні результати
    setMovies([])
    setError(false)
    setLoading(true)

    try {
      const results = await fetchMovies(query)
      if (results.length === 0) {
        // точно такий текст за умовою
        toast.error('No movies found for your request.')
      } else {
        setMovies(results)
      }
    } catch (err) {
      setError(true)
      toast.error('There was an error, please try again...')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  const handleCloseModal = () => {
    setSelectedMovie(null)
  }

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage />
      ) : (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
    </div>
  )
}

export default App
