import { GoogleGenerativeAI } from '@google/generative-ai'

class GeminiService {
  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('Gemini API key not found in environment variables')
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey)
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
  }

  async getBookRecommendations(title, author) {
    try {
      const prompt = `Suggest 3 books similar to "${title}" by ${author}. 
      Return ONLY a valid JSON array with each book having "title" and "author" fields. 
      Do not include any other text or formatting.
      
      Example format:
      [
        {"title": "Book Title 1", "author": "Author Name 1"},
        {"title": "Book Title 2", "author": "Author Name 2"},
        {"title": "Book Title 3", "author": "Author Name 3"}
      ]`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim()
      
      try {
        const recommendations = JSON.parse(cleanedText)
        if (Array.isArray(recommendations) && recommendations.length > 0) {
          return recommendations.slice(0, 3)
        }
        throw new Error('Invalid recommendations format')
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError)
        return this.getFallbackRecommendations(title, author)
      }
    } catch (error) {
      console.error('Error getting AI recommendations:', error)
      return this.getFallbackRecommendations(title, author)
    }
  }

  getFallbackRecommendations(title, author) {
    const fallbackRecommendations = {
      'fiction': [
        { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
        { title: '1984', author: 'George Orwell' },
        { title: 'Pride and Prejudice', author: 'Jane Austen' }
      ],
      'technology': [
        { title: 'Clean Code', author: 'Robert C. Martin' },
        { title: 'The Pragmatic Programmer', author: 'David Thomas' },
        { title: 'Design Patterns', author: 'Gang of Four' }
      ],
      'history': [
        { title: 'Homo Deus', author: 'Yuval Noah Harari' },
        { title: 'Guns, Germs, and Steel', author: 'Jared Diamond' },
        { title: 'The Silk Roads', author: 'Peter Frankopan' }
      ],
      'self-help': [
        { title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey' },
        { title: 'Think and Grow Rich', author: 'Napoleon Hill' },
        { title: 'The Power of Now', author: 'Eckhart Tolle' }
      ]
    }
    
    const lowerTitle = title.toLowerCase()
    const lowerAuthor = author.toLowerCase()
    
    if (lowerTitle.includes('habit') || lowerAuthor.includes('clear')) {
      return fallbackRecommendations['self-help']
    } else if (lowerTitle.includes('sapiens') || lowerAuthor.includes('harari')) {
      return fallbackRecommendations['history']
    } else if (lowerTitle.includes('code') || lowerTitle.includes('program')) {
      return fallbackRecommendations['technology']
    } else {
      return fallbackRecommendations['fiction']
    }
  }
}

export const geminiService = new GeminiService()