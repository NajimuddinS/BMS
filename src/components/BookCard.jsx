import { Link } from 'react-router-dom'

export function BookCard({ book }) {
  return (
    <Link to={`/book/${book.id}`} className="block">
      <div className="card book-card p-6 h-full">
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <span className="inline-block px-3 py-1 text-xs font-medium text-primary-700 bg-primary-50 rounded-full">
                {book.genre}
              </span>
              <span className="text-lg font-bold text-secondary-600">
                ${book.price}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {book.title}
            </h3>
            
            <p className="text-gray-600 mb-4">
              by {book.author}
            </p>
            
            {book.description && (
              <p className="text-sm text-gray-500 line-clamp-3">
                {book.description}
              </p>
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}