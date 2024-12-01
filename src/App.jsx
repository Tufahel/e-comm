import { Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";
import FilterProvider from "./context/FilterContext";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { WishlistProvider } from "./context/WishlistContext";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrderTracking from "./pages/OrderTracking";

const App = () => {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <FilterProvider>
            <div className="min-h-screen bg-gray-50">
              <Toaster position="top-right" />
              <Navigation />
              <main className="max-w-7xl mx-auto px-4 py-8">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/track-order" element={<OrderTracking />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
            </div>
          </FilterProvider>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
};

export default App;
