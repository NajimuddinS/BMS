import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useBooks } from '../context/BookContext'

function validate(values) {
  const errors = {}

  if (!values.title) {
    errors.title = 'Title is required'
  } else if (values.title.length < 2) {
    errors.title = 'Title must be at least 2 characters'
  }

  if (!values.author) {
    errors.author = 'Author is required'
  } else if (values.author.length < 2) {
    errors.author = 'Author must be at least 2 characters'
  }

  if (!values.genre) {
    errors.genre = 'Genre is required'
  }

  if (!values.price) {
    errors.price = 'Price is required'
  } else if (isNaN(values.price) || parseFloat(values.price) <= 0) {
    errors.price = 'Price must be a number greater than 0'
  }

  return errors
}

export function AddBook() {
  const navigate = useNavigate()
  const { addBook } = useBooks()

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      genre: '',
      price: '',
      description: ''
    },
    validate,
    onSubmit: (values) => {
      const book = {
        ...values,
        price: parseFloat(values.price)
      }
      
      addBook(book)
      toast.success('Book added successfully!')
      navigate('/')
    }
  })

  const genres = [
    'Fiction', 'Non-Fiction', 'Technology', 'History', 'Biography', 
    'Self-Help', 'Science', 'Philosophy', 'Business', 'Art', 'Travel', 'Health'
  ]

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Book</h1>
        <p className="text-gray-600">Add a new book to your personal collection</p>
      </div>

      <div className="card p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Book Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className={`input-field ${
                formik.touched.title && formik.errors.title ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
              }`}
              placeholder="Enter book title"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Author *
            </label>
            <input
              id="author"
              name="author"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.author}
              className={`input-field ${
                formik.touched.author && formik.errors.author ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
              }`}
              placeholder="Enter author name"
            />
            {formik.touched.author && formik.errors.author && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.author}</p>
            )}
          </div>

          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
              Genre *
            </label>
            <select
              id="genre"
              name="genre"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.genre}
              className={`input-field ${
                formik.touched.genre && formik.errors.genre ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
              }`}
            >
              <option value="">Select a genre</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            {formik.touched.genre && formik.errors.genre && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.genre}</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price ($) *
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              className={`input-field ${
                formik.touched.price && formik.errors.price ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
              }`}
              placeholder="0.00"
            />
            {formik.touched.price && formik.errors.price && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.price}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="input-field resize-none"
              placeholder="Enter a brief description of the book"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? 'Adding Book...' : 'Add Book'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-secondary px-8"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}