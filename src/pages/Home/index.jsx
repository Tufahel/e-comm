import { useState, useMemo } from 'react'
import ProductList from '../../components/ProductList'
import Sidebar from '../../components/Sidebar'
import productsData from '../../data/products.json'

const Home = () => {
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: '', max: '' }
  })
  const [sortBy, setSortBy] = useState('default')

  const categories = useMemo(() => {
    return [...new Set(productsData.products.map(product => product.category))]
  }, [])

  const filteredProducts = useMemo(() => {
    let filtered = [...productsData.products]

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      )
    }

    // Apply price filter
    if (filters.priceRange.min) {
      filtered = filtered.filter(product => 
        product.price >= Number(filters.priceRange.min)
      )
    }
    if (filters.priceRange.max) {
      filtered = filtered.filter(product => 
        product.price <= Number(filters.priceRange.max)
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    return filtered
  }, [filters, sortBy])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="default">Default sorting</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div className="flex gap-8">
        <Sidebar 
          categories={categories} 
          onFilterChange={setFilters}
        />
        <div className="flex-1">
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  )
}

export default Home