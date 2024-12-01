import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Heart } from 'lucide-react'
import { formatPrice } from '../../utils/formatPrice'
import useCart from '../../hooks/useCart'
import { useWishlist } from '../../context/WishlistContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { items, dispatch } = useWishlist()
  const isInWishlist = items.some(item => item.id === product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({
      type: isInWishlist ? 'REMOVE_FROM_WISHLIST' : 'ADD_TO_WISHLIST',
      payload: product
    })
  }

  return (
    <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
      <button
        onClick={toggleWishlist}
        className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-sm z-10 hover:bg-gray-100"
      >
        <Heart 
          className={`h-5 w-5 ${
            isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'
          }`}
        />
      </button>
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover hover:opacity-75 transition-opacity"
        />
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
          <p className="mt-1 text-gray-500">{formatPrice(product.price)}</p>
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
          >
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired
}

export default ProductCard