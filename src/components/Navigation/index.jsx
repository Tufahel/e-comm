import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useCart from "../../hooks/useCart";
import { Heart } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import SearchBar from "../SearchBar";

const Navigation = () => {
  const { user } = useAuth();
  const { totalQuantity } = useCart();
  const { items } = useWishlist();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/home" className="text-xl font-bold">
              E-Store
            </Link>
          </div>

          <div className="w-1/3">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/home" className="px-3 py-2 hover:text-blue-600">
              Home
            </Link>
            <Link
              to="/cart"
              className="px-3 py-2 hover:text-blue-600 flex items-center"
            >
              Cart
              {totalQuantity > 0 && (
                <span className="ml-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {totalQuantity}
                </span>
              )}
            </Link>
            {user ? (
              <Link to="/profile" className="px-3 py-2 hover:text-blue-600">
                Profile
              </Link>
            ) : (
              <>
                <Link to="/" className="px-3 py-2 hover:text-blue-600">
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
            <Link to="/track-order" className="px-3 py-2 hover:text-blue-600">
              Track Order
            </Link>
            <Link
              to="/wishlist"
              className="flex items-center space-x-1 px-3 py-2 hover:text-blue-600"
            >
              <Heart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
            <Link to="/" className="px-3 py-2 border rounded-lg bg-blue-500 text-white font-medium">
              Log out
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
