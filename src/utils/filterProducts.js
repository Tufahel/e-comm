export const filterProducts = (products, filters) => {
    const { searchQuery, category, priceRange, sortBy } = filters
  
    let filteredProducts = [...products]
  
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
  
    if (category !== 'all') {
      filteredProducts = filteredProducts.filter(product =>
        product.category === category
      )
    }
  
    filteredProducts = filteredProducts.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    )
  
    switch (sortBy) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }
  
    return filteredProducts
  }