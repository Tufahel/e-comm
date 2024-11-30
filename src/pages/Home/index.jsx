import ProductList from '../../components/ProductList'

const Home = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-8">
          Our Products
        </h1>
        <ProductList />
      </div>
    </div>
  )
}

export default Home