import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatPrice'
import useCart from '../../hooks/useCart'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { id, name, price, image, description, stock } = product

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <Link 
      to={`/product/${id}`}
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="aspect-w-1 aspect-h-1">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-900 mb-1">
          {name}
        </h2>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">
            {formatPrice(price)}
          </span>
          <button 
            onClick={handleAddToCart}
            disabled={stock === 0}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  )
}

ProductCard.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      stock: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired
    }).isRequired
  }

export default ProductCard