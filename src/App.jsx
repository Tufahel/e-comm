import { Routes, Route } from 'react-router-dom'
import CartProvider from './context/CartContext'
import FilterProvider from './context/FilterContext'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import { Toaster } from 'react-hot-toast'


const App = () => {
  return (
    <CartProvider>
      <FilterProvider>
          <div className="min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
          </div>
      </FilterProvider>
    </CartProvider>
  )
}

export default App