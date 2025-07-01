import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useBooks } from '../context/BookContext'
import { AIRecommendations } from './AIRecommendations'

export function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getBook, deleteBook } = useBooks()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const book = getBook(id)

  if (!book) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Book not found</h2>
        <p className="text-gray-600 mb-6">The book you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary">
          Back to Collection
        </Link>
      </div>
    )
  }

  const handleDelete = () => {
    deleteBook(book.id)
    toast.success('Book deleted successfully!')
    navigate('/')
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <nav className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to Collection
        </Link>
      </nav>

      <div className="card p-8 mb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <span className="inline-block px-3 py-1 text-sm font-medium text-primary-700 bg-primary-50 rounded-full">
                {book.genre}
              </span>
              <span className="text-2xl font-bold text-secondary-600">
                ${book.price}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {book.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              by {book.author}
            </p>

            {book.description && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {book.description}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete Book
              </button>
              <Link to="/" className="btn-secondary text-center">
                Back to Collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AIRecommendations book={book} />

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Delete Book
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{book.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}