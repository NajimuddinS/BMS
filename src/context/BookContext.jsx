import { createContext, useContext, useReducer, useEffect } from 'react'
import { loadBooks, saveBooks } from '../utils/localStorage'

const BookContext = createContext()

const initialState = {
  books: [],
  loading: false,
  error: null
}

function bookReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'LOAD_BOOKS':
      return { ...state, books: action.payload }
    case 'ADD_BOOK':
      const newBooks = [...state.books, action.payload]
      saveBooks(newBooks)
      return { ...state, books: newBooks }
    case 'DELETE_BOOK':
      const filteredBooks = state.books.filter(book => book.id !== action.payload)
      saveBooks(filteredBooks)
      return { ...state, books: filteredBooks }
    default:
      return state
  }
}

export function BookProvider({ children }) {
  const [state, dispatch] = useReducer(bookReducer, initialState)

  useEffect(() => {
    const books = loadBooks()
    dispatch({ type: 'LOAD_BOOKS', payload: books })
  }, [])

  const addBook = (book) => {
    const newBook = {
      ...book,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    dispatch({ type: 'ADD_BOOK', payload: newBook })
    return newBook
  }

  const deleteBook = (id) => {
    dispatch({ type: 'DELETE_BOOK', payload: id })
  }

  const getBook = (id) => {
    return state.books.find(book => book.id === id)
  }

  const value = {
    ...state,
    addBook,
    deleteBook,
    getBook,
    dispatch
  }

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  )
}

export function useBooks() {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider')
  }
  return context
}