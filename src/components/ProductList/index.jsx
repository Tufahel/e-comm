import ProductCard from '../ProductCard'
import productsData from '../../data/products.json'
import useFilter from '../../hooks/useFilter'
import { filterProducts } from '../../utils/filterProducts'

const ProductList = () => {
  const { searchQuery, category, priceRange, sortBy } = useFilter()
  const { products } = productsData

  const filteredProducts = filterProducts(products, {
    searchQuery,
    category,
    priceRange,
    sortBy
  })

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList