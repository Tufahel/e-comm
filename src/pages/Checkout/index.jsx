import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";
import ShippingForm from "../../components/ShippingForm";
import PaymentForm from "../../components/PaymentForm";

const CheckoutSteps = {
  CART_REVIEW: "CART_REVIEW",
  SHIPPING: "SHIPPING",
  PAYMENT: "PAYMENT",
  SUMMARY: "SUMMARY",
};

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(CheckoutSteps.CART_REVIEW);
  const [shippingData, setShippingData] = useState(null);
  const { cartItems, totalAmount } = useCart();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null)

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="mt-2 text-gray-500">
            Add some items to your cart to checkout
          </p>
          <button
            onClick={() => navigate("/home")}
            className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case CheckoutSteps.CART_REVIEW:
        return (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white p-4 rounded-lg shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                  <p className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
            <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
            </div>
          </div>
        );

      // We'll implement these steps next
      case CheckoutSteps.SHIPPING:
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
            <ShippingForm
              onSubmit={setShippingData}
              initialData={shippingData}
            />
          </div>
        );
        case CheckoutSteps.PAYMENT:
            return (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                <PaymentForm 
                  onSubmit={setPaymentData}
                  initialData={paymentData}
                />
              </div>
            )
      
          case CheckoutSteps.SUMMARY:
            return (
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <p>{shippingData?.fullName}</p>
                  <p>{shippingData?.address}</p>
                  <p>{shippingData?.city}, {shippingData?.state} {shippingData?.zipCode}</p>
                  <p>{shippingData?.phone}</p>
                </div>
      
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <p className="capitalize">{paymentData?.method?.replace('-', ' ')}</p>
                  {paymentData?.method === 'credit-card' && (
                    <p>Card ending in {paymentData?.cardNumber?.slice(-4)}</p>
                  )}
                </div>
      
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-4">Order Items</h3>
                  <div className="space-y-2">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.name} x {item.quantity}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
      
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total Amount</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                </div>
      
                <button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
                >
                  Place Order
                </button>
              </div>
            )
      
      default:
        return null;
    }
  };

  const handleNext = () => {
    const currentIndex = Object.values(CheckoutSteps).indexOf(currentStep);

    // Validate shipping data before proceeding
    if (currentStep === CheckoutSteps.SHIPPING && !shippingData) {
      alert("Please fill in shipping information");
      return;
    }

    if (currentIndex < Object.values(CheckoutSteps).length - 1) {
      setCurrentStep(Object.values(CheckoutSteps)[currentIndex + 1]);
    }
  };

  const handlePlaceOrder = () => {
    const orderData = {
      id: Math.floor(100000 + Math.random() * 900000), // 6-digit order ID
      items: cartItems,
      shipping: shippingData,
      payment: paymentData,
      total: totalAmount,
      status: 'processing', // Initial status
      date: new Date().toISOString()
    }
  
    // Save order details to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push(orderData)
    localStorage.setItem('orders', JSON.stringify(orders))
    localStorage.setItem('lastOrder', JSON.stringify(orderData))
  
    navigate('/order-success')
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {Object.values(CheckoutSteps).map((step, index) => (
            <div
              key={step}
              className={`flex items-center ${
                index !== Object.values(CheckoutSteps).length - 1 && "flex-1"
              }`}
            >
              <div
                className={`
                flex items-center justify-center w-8 h-8 rounded-full
                ${
                  currentStep === step
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200"
                }
              `}
              >
                {index + 1}
              </div>
              {index !== Object.values(CheckoutSteps).length - 1 && (
                <div
                  className={`
                  flex-1 h-1 mx-4
                  ${
                    index < Object.values(CheckoutSteps).indexOf(currentStep)
                      ? "bg-primary-600"
                      : "bg-gray-200"
                  }
                `}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {renderStep()}

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => {
            const currentIndex =
              Object.values(CheckoutSteps).indexOf(currentStep);
            if (currentIndex > 0) {
              setCurrentStep(Object.values(CheckoutSteps)[currentIndex - 1]);
            }
          }}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={currentStep === CheckoutSteps.CART_REVIEW}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          disabled={currentStep === CheckoutSteps.SUMMARY}
        >
          {currentStep === CheckoutSteps.CART_REVIEW
            ? "Proceed to Shipping"
            : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
