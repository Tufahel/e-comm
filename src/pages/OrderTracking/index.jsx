import { useState } from 'react'
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock,
  Search 
} from 'lucide-react'

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState(null)


  const handleTrackOrder = (e) => {
    e.preventDefault()
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const foundOrder = orders.find(o => o.id.toString() === orderId)
    setOrder(foundOrder)
  }

  const getStatusStep = (status) => {
    const steps = ['processing', 'shipped', 'out_for_delivery', 'delivered']
    return steps.indexOf(status) + 1
  }

  const renderTrackingStatus = (status) => {
    const currentStep = getStatusStep(status)

    return (
      <div className="relative">
        <div className="flex items-center justify-between mb-16">
          {/* Processing */}
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center
              ${currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
              <Clock className="w-5 h-5" />
            </div>
            <span className="mt-2 text-sm">Processing</span>
          </div>

          {/* Shipped */}
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center
              ${currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
              <Package className="w-5 h-5" />
            </div>
            <span className="mt-2 text-sm">Shipped</span>
          </div>

          {/* Out for Delivery */}
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center
              ${currentStep >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
              <Truck className="w-5 h-5" />
            </div>
            <span className="mt-2 text-sm">Out for Delivery</span>
          </div>

          {/* Delivered */}
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center
              ${currentStep >= 4 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
              <CheckCircle className="w-5 h-5" />
            </div>
            <span className="mt-2 text-sm">Delivered</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200">
          <div 
            className="h-full bg-primary-600 transition-all duration-500"
            style={{ width: `${(currentStep - 1) * 33.33}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">Track Your Order</h1>

      <form onSubmit={handleTrackOrder} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter your order ID"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            Track
          </button>
        </div>
      </form>

      {order ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Order #{order.id}</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-medium">${order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {renderTrackingStatus(order.status)}

          <div className="mt-8">
            <h3 className="font-medium mb-2">Shipping Address</h3>
            <p>{order.shipping.fullName}</p>
            <p>{order.shipping.address}</p>
            <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-gray-500">Enter your order ID to track your order</p>
        </div>
      )}
    </div>
  )
}

export default OrderTracking