import { useAuth } from '../../context/AuthContext'
import { useState, useEffect } from 'react'

const Profile = () => {
    const { user } = useAuth()
    const [orders, setOrders] = useState([])
  
    useEffect(() => {
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      setOrders(savedOrders)
    }, [])
  
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          {/* Profile Info */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
            </div>
          </div>
  
          {/* Orders Section */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Order History</h2>
            {orders.length === 0 ? (
              <p className="text-gray-500">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div 
                    key={order.id} 
                    className="border rounded-lg p-4"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Order #{order.id}</span>
                      <span className="text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Status</span>
                      <span className="capitalize text-green-600">
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span className="font-medium">
                        {order.total}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

export default Profile