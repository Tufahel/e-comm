import useFilter from '../../hooks/useFilter'

const FilterBar = () => {
  const {
    searchQuery,
    category,
    priceRange,
    sortBy,
    setSearchQuery,
    setCategory,
    setPriceRange,
    setSortBy,
    resetFilters
  } = useFilter()

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="all">All Categories</option>
            <option value="clothing">Clothing</option>
            <option value="shoes">Shoes</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
              placeholder="Min"
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              placeholder="Max"
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="mt-4 text-sm text-primary-600 hover:text-primary-700"
      >
        Reset Filters
      </button>
    </div>
  )
}

export default FilterBar