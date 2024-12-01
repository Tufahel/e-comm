import { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

export const FilterContext = createContext()

const initialState = {
  searchQuery: '',
  category: 'all',
  priceRange: {
    min: 0,
    max: 1000
  },
  sortBy: 'default'
}

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      }
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload
      }
    case 'SET_PRICE_RANGE':
      return {
        ...state,
        priceRange: action.payload
      }
    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload
      }
    case 'RESET_FILTERS':
      return initialState
    default:
      return state
  }
}

const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState)

  return (
    <FilterContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FilterContext.Provider>
  )
}

FilterProvider.propTypes = {
    children: PropTypes.node.isRequired
  }

export default FilterProvider