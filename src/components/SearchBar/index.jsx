import { useState } from 'react'
import { Search } from 'lucide-react'
import useFilter from '../../hooks/useFilter'

const SearchBar = () => {
  const [localSearch, setLocalSearch] = useState('')
  const { setSearchQuery } = useFilter()

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(localSearch)
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search for products..."
          className="w-full px-4 py-2 pl-10 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-primary-500 text-white rounded-md hover:bg-primary-600"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar