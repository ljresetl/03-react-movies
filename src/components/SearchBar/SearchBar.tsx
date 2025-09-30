import React from 'react'
import styles from './SearchBar.module.css'
import toast from 'react-hot-toast'

interface SearchBarProps {
  onSubmit: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const input = form.elements.namedItem('query') as HTMLInputElement | null
    const value = input?.value.trim() ?? ''

    if (!value) {
      // точний текст за умовою
      toast.error('Please enter your search query.')
      return
    }

    onSubmit(value)
    // очищаємо інпут після сабміту
    form.reset()
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  )
}

export default SearchBar
