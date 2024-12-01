import { toast } from 'react-hot-toast'

export const showToast = {
  success: (message) => {
    toast.success(message, {
      style: {
        background: '#10B981',
        color: '#fff'
      }
    })
  },
  error: (message) => {
    toast.error(message, {
      style: {
        background: '#EF4444',
        color: '#fff'
      }
    })
  }
}