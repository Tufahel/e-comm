import { useState } from 'react'
import { X } from 'lucide-react'

const QuickShop = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-primary-50 text-primary-800 px-4 py-3 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <p className="text-sm font-medium">
          🎉 Free shipping on orders over $50! Limited time offer
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="text-primary-600 hover:text-primary-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default QuickShop