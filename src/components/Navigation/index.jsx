import { Link } from 'react-router-dom'
import useCart from '../../hooks/useCart'

const Navigation = () => {
  const { totalQuantity } = useCart()

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/home" className="text-2xl font-bold text-gray-900 hover:text-primary-600">
              E-Store
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/home" className="text-gray-600 hover:text-gray-900 font-medium">
              Home
            </Link>
            <Link to="/cart" className="group flex items-center text-gray-600 hover:text-gray-900 font-medium">
              <span>Cart</span>
              {totalQuantity > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-600 rounded-full group-hover:bg-primary-700">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation