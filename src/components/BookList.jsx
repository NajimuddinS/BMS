import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { BookCard } from './BookCard'
import { useBooks } from '../context/BookContext'

export function BookList() {
  const { books } = useBooks()
  const [filterGenre, setFilterGenre] = useState('All')
  const [sortBy, setSortBy] = useState('title')

  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(books.map(book => book.genre))]
    return ['All', ...uniqueGenres.sort()]
  }, [books])

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books
    
    if (filterGenre !== 'All') {
      filtered = books.filter(book => book.genre === filterGenre)
    }

    return filtered.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      } else if (sortBy === 'price') {
        return a.price - b.price
      }
      return 0
    })
  }, [books, filterGenre, sortBy])

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No books in your collection yet</h2>
        <p className="text-gray-600 mb-6">Start building your personal library by adding your first book!</p>
        <Link
          to="/add-book"
          className="btn-primary inline-flex items-center"
        >
          Add Your First Book
        </Link>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Book Collection</h1>
          <p className="text-gray-600">
            {filteredAndSortedBooks.length} {filteredAndSortedBooks.length === 1 ? 'book' : 'books'} 
            {filterGenre !== 'All' && ` in ${filterGenre}`}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            className="input-field sm:w-48"
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field sm:w-48"
          >
            <option value="title">Sort by Title</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}