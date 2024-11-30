import FilterBar from '../../components/FilterBar'
import ProductList from '../../components/ProductList'
import SearchBar from '../../components/SearchBar'
import QuickShop from '../../components/QuickShop'

const Home = () => {
  return (
    <div>
      <QuickShop />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-8">
          Our Products
        </h1>
        <div className="mb-8">
          <SearchBar />
        </div>
        <FilterBar />
        <ProductList />
      </div>
    </div>
  )
}

export default Home