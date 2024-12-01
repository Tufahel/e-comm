import { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const WishlistContext = createContext()

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (state.items.find(item => item.id === action.payload.id)) {
        return state
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      }
    default:
      return state
  }
}

const initialState = {
  items: []
}

const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState)

  const value = {
    items: state.items,
    dispatch
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

WishlistProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

export { WishlistProvider, useWishlist }