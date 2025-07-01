import { Link, useLocation } from 'react-router-dom'

export function Header() {
  const location = useLocation()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">📚</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">BookShelf</h1>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`font-medium transition-colors duration-200 ${
                location.pathname === '/'
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Books
            </Link>
            <Link
              to="/add-book"
              className={`font-medium transition-colors duration-200 ${
                location.pathname === '/add-book'
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Add Book
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}