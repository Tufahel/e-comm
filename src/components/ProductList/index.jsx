import ProductCard from '../ProductCard'
import productsData from '../../data/products.json'

const ProductList = () => {
  const { products } = productsData

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList