import { Routes, Route } from 'react-router-dom'
import { BookList } from './components/BookList'
import { AddBook } from './components/AddBook'
import { BookDetail } from './components/BookDetail'
import { Header } from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App