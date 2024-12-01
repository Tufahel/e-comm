import { useState } from 'react'
import PropTypes from 'prop-types'

const Sidebar = ({ categories, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [selectedCategories, setSelectedCategories] = useState([])

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      const updated = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
      onFilterChange({ categories: updated, priceRange })
      return updated
    })
  }

  const handlePriceChange = (e) => {
    const { name, value } = e.target
    const updated = { ...priceRange, [name]: value }
    setPriceRange(updated)
    onFilterChange({ categories: selectedCategories, priceRange: updated })
  }

  return (
    <div className="w-64 pr-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        {categories.map(category => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor={category} className="ml-2 text-gray-700 capitalize">
              {category}
            </label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <div className="space-y-2">
          <input
            type="number"
            name="min"
            value={priceRange.min}
            onChange={handlePriceChange}
            placeholder="Min price"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          <input
            type="number"
            name="max"
            value={priceRange.max}
            onChange={handlePriceChange}
            placeholder="Max price"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterChange: PropTypes.func.isRequired
}

export default Sidebar