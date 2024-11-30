import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatPrice'
import useCart from '../../hooks/useCart'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { id, name, price, image, description } = product

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <Link to={`/product/${id}`} className="block aspect-w-1 aspect-h-1">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h2 className="text-lg font-medium text-gray-900 mb-1 hover:text-primary-600">
            {name}
          </h2>
        </Link>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">
            {formatPrice(price)}
          </span>
          <button 
            onClick={handleAddToCart}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard