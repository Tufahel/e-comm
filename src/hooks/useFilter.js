import { useContext } from 'react'
import { FilterContext } from '../context/FilterContext'

const useFilter = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider')
  }

  const { searchQuery, category, priceRange, sortBy, dispatch } = context

  const setSearchQuery = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query })
  }

  const setCategory = (category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category })
  }

  const setPriceRange = (range) => {
    dispatch({ type: 'SET_PRICE_RANGE', payload: range })
  }

  const setSortBy = (sortOption) => {
    dispatch({ type: 'SET_SORT', payload: sortOption })
  }

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' })
  }

  return {
    searchQuery,
    category,
    priceRange,
    sortBy,
    setSearchQuery,
    setCategory,
    setPriceRange,
    setSortBy,
    resetFilters
  }
}

export default useFilter