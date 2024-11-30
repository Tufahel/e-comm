import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              E-Store
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="px-3 py-2 hover:text-blue-600">
              Home
            </Link>
            <Link to="/cart" className="px-3 py-2 hover:text-blue-600">
              Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation