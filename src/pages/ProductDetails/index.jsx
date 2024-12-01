import { useParams, useNavigate } from 'react-router-dom'
import { useState} from 'react'
import useCart from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatPrice'
import productsData from '../../data/products.json'
import Reviews from '../../components/Reviews'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = productsData.products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Product Not Found</h2>
          <p className="mt-4 text-gray-500">The product you are looking for does not exist.</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-center object-cover"
          />
        </div>

        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {product.name}
          </h1>
          
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">{formatPrice(product.price)}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700 space-y-6">
              <p>{product.description}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <h3 className="text-sm text-gray-600 font-medium">Category:</h3>
              <p className="ml-2 text-sm text-gray-900 capitalize">{product.category}</p>
            </div>
            <div className="mt-2 flex items-center">
              <h3 className="text-sm text-gray-600 font-medium">Availability:</h3>
              <p className="ml-2 text-sm text-gray-900">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center">
              <label htmlFor="quantity" className="mr-4 text-sm font-medium text-gray-700">
                Quantity
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                {[...Array(Math.min(10, product.stock))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="mt-8 w-full bg-primary-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
      <Reviews 
        productId={product.id}
        initialReviews={[
          {
            id: 1,
            userId: 1,
            userName: "John Doe",
            productId: product.id,
            rating: 5,
            comment: "Great product! Exactly what I was looking for.",
            date: "2024-03-20T10:00:00Z"
          },
          {
            id: 2,
            userId: 2,
            userName: "Jane Smith",
            productId: product.id,
            rating: 4,
            comment: "Good quality, but shipping took longer than expected.",
            date: "2024-03-19T15:30:00Z"
          }
        ]} 
      />
    </div>
  )
}

export default ProductDetails