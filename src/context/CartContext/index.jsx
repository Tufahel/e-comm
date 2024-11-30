/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react'

export const CartContext = createContext()

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      { const existingItemIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id
      )

      if (existingItemIndex > -1) {
        const updatedItems = state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return {
          ...state,
          cartItems: updatedItems,
          totalQuantity: state.totalQuantity + 1,
          totalAmount: state.totalAmount + action.payload.price,
        }
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        totalQuantity: state.totalQuantity + 1,
        totalAmount: state.totalAmount + action.payload.price,
      } }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
        totalQuantity: state.totalQuantity - action.payload.quantity,
        totalAmount: state.totalAmount - (action.payload.price * action.payload.quantity),
      }

    case 'UPDATE_QUANTITY':
      { const updatedItems = state.cartItems.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      )

      return {
        ...state,
        cartItems: updatedItems,
        totalQuantity: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalAmount: updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0),
      } }

    default:
      return state
  }
}

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider