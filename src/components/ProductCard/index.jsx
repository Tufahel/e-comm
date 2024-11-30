/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatPrice } from '../../utils/formatPrice'

const ProductCard = ({ product }) => {
  const { id, name, price, image, description } = product;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover hover:opacity-75 transition"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h2 className="text-lg font-semibold mb-2 hover:text-blue-600">
            {name}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">{formatPrice(price)}</span>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => console.log("Add to cart clicked")}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
