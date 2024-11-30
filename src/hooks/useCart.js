import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

const useCart = () => {
  const context = useContext(CartContext)
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  const { cartItems, totalQuantity, totalAmount, dispatch } = context

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product })
  }

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
  }

  return {
    cartItems,
    totalQuantity,
    totalAmount,
    addToCart,
    removeFromCart,
    updateQuantity,
  }
}

export default useCart