import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import useCart from '../../hooks/useCart'

const Navigation = () => {
  const { user } = useAuth()
  const { totalQuantity } = useCart()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              E-Store
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 hover:text-blue-600">
              Home
            </Link>
            <Link to="/cart" className="px-3 py-2 hover:text-blue-600 flex items-center">
              Cart
              {totalQuantity > 0 && (
                <span className="ml-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {totalQuantity}
                </span>
              )}
            </Link>
            {user ? (
              <Link 
                to="/profile" 
                className="px-3 py-2 hover:text-blue-600"
              >
                Profile
              </Link>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-3 py-2 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation