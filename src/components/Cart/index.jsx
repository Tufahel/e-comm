import useCart from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatPrice'

const Cart = () => {
  const { cartItems, totalAmount, removeFromCart, updateQuantity } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your cart is empty
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Start shopping to add items to your cart!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto pt-8 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
        Shopping Cart
      </h1>
      <div className="space-y-6">
        {cartItems.map(item => (
          <div key={item.id} 
            className="flex items-center justify-between bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center flex-1">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="ml-6">
                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {formatPrice(item.price)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <select
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                className="rounded-md border-gray-300 py-2 pl-3 pr-8 text-base focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeFromCart(item)}
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <p className="text-2xl font-semibold text-gray-900">
              {formatPrice(totalAmount)}
            </p>
          </div>
          <button className="mt-6 w-full bg-primary-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart