import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import useCart from "../../hooks/useCart";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    const orderDetails = localStorage.getItem("lastOrder");
    if (!orderDetails) {
      navigate("/home");
    }
  }, [navigate, clearCart]);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6">
      <div className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Order Placed Successfully!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex justify-center space-x-4">
            <Link
              to="/home"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Continue Shopping
            </Link>
            <Link
              to="/profile"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
