import { useState } from 'react'
import PropTypes from 'prop-types'
import { CreditCard, Banknote } from 'lucide-react'

const PaymentForm = ({ onSubmit, initialData }) => {
  const [paymentMethod, setPaymentMethod] = useState(initialData?.method || 'credit-card')
  const [cardData, setCardData] = useState({
    cardNumber: initialData?.cardNumber || '',
    expiryDate: initialData?.expiryDate || '',
    cvv: initialData?.cvv || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ method: paymentMethod, ...cardData })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCardData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setPaymentMethod('credit-card')}
          className={`p-4 border rounded-lg flex items-center space-x-3
            ${paymentMethod === 'credit-card' 
              ? 'border-primary-600 bg-primary-50' 
              : 'border-gray-300'
            }`}
        >
          <CreditCard className={paymentMethod === 'credit-card' ? 'text-primary-600' : 'text-gray-400'} />
          <span className="font-medium">Credit Card</span>
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod('cash')}
          className={`p-4 border rounded-lg flex items-center space-x-3
            ${paymentMethod === 'cash' 
              ? 'border-primary-600 bg-primary-50' 
              : 'border-gray-300'
            }`}
        >
          <Banknote className={paymentMethod === 'cash' ? 'text-primary-600' : 'text-gray-400'} />
          <span className="font-medium">Cash on Delivery</span>
        </button>
      </div>

      {paymentMethod === 'credit-card' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={cardData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={cardData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={cardData.cvv}
                onChange={handleChange}
                placeholder="123"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <button
          type="submit"
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          Save Payment Method
        </button>
      </div>
    </form>
  )
}

PaymentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    method: PropTypes.string,
    cardNumber: PropTypes.string,
    expiryDate: PropTypes.string,
    cvv: PropTypes.string
  })
}

PaymentForm.defaultProps = {
  initialData: null
}

export default PaymentForm