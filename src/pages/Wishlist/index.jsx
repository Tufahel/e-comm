import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import useCart from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatPrice'
import { Heart } from 'lucide-react'

const Wishlist = () => {
  const { items, dispatch } = useWishlist()
  const { addToCart } = useCart()

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-lg font-medium text-gray-900">Your wishlist is empty</h2>
          <p className="mt-2 text-sm text-gray-500">Start adding items to your wishlist!</p>
          <Link 
            to="/" 
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {items.map(product => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-gray-500">{formatPrice(product.price)}</p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product })}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist