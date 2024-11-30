import FilterBar from '../../components/FilterBar'
import ProductList from '../../components/ProductList'

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-8">
        Our Products
      </h1>
      <FilterBar />
      <ProductList />
    </div>
  )
}

export default Home