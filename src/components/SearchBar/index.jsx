import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import productsData from '../../data/products.json'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (term) => {
    if (term.length > 0) {
      const filtered = productsData.products.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 5))
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    handleSearch(value)
  }

  const handleSuggestionClick = (productId) => {
    setSearchTerm('')
    setSuggestions([])
    setShowSuggestions(false)
    navigate(`/product/${productId}`)
  }

  const clearSearch = () => {
    setSearchTerm('')
    setSuggestions([])
    setShowSuggestions(false)
  }

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search products..."
          className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg">
          {suggestions.map(product => (
            <button
              key={product.id}
              onClick={() => handleSuggestionClick(product.id)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-3"
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-10 h-10 object-cover rounded"
              />
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar