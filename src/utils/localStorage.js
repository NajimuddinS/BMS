const BOOKS_KEY = 'bookshelf_books'

export function loadBooks() {
  try {
    const booksData = localStorage.getItem(BOOKS_KEY)
    if (booksData) {
      return JSON.parse(booksData)
    }
    return getDefaultBooks()
  } catch (error) {
    console.error('Error loading books from localStorage:', error)
    return getDefaultBooks()
  }
}

export function saveBooks(books) {
  try {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books))
  } catch (error) {
    console.error('Error saving books to localStorage:', error)
  }
}

function getDefaultBooks() {
  const defaultBooks = [
    {
      id: '1',
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      genre: 'History',
      price: 250,
      description: 'A compelling narrative that traces the evolution of Homo sapiens from insignificant apes to rulers of the world.',
      createdAt: '2024-01-15T10:00:00.000Z'
    },
    {
      id: '2',
      title: 'The Clean Coder',
      author: 'Robert C. Martin',
      genre: 'Technology',
      price: 300,
      description: 'A code of conduct for professional programmers, covering the attitudes, disciplines, and techniques of effective programming.',
      createdAt: '2024-01-16T10:00:00.000Z'
    },
    {
      id: '3',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      price: 260,
      description: 'A classic American novel set in the Jazz Age, exploring themes of decadence, idealism, and the American Dream.',
      createdAt: '2024-01-17T10:00:00.000Z'
    },
    {
      id: '4',
      title: 'Atomic Habits',
      author: 'James Clear',
      genre: 'Self-Help',
      price: 100,
      description: 'A practical guide to building good habits and breaking bad ones through small changes that deliver remarkable results.',
      createdAt: '2024-01-18T10:00:00.000Z'
    }
  ]
  
  saveBooks(defaultBooks)
  return defaultBooks
}