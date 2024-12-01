import { useState } from 'react'
import PropTypes from 'prop-types'
import { Star } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Reviews = ({ productId, initialReviews = [] }) => {
  const { user } = useAuth()
  const [reviews, setReviews] = useState(initialReviews)
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  })

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!user) return

    const review = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      productId,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString()
    }

    setReviews([review, ...reviews])
    setNewReview({ rating: 5, comment: '' })
  }

  const averageRating = reviews.length 
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : 'No ratings yet'

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
      
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <span className="text-2xl font-bold mr-2">{averageRating}</span>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(Number(averageRating))
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-gray-600">
            ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      </div>

      {user ? (
        <form onSubmit={handleSubmitReview} className="mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Star' : 'Stars'}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Review
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows={4}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Submit Review
          </button>
        </form>
      ) : (
        <p className="text-gray-600 mb-8">
          Please <a href="/" className="text-primary-600 hover:text-primary-500">login</a> to leave a review.
        </p>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">
                {review.userName}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

Reviews.propTypes = {
  productId: PropTypes.number.isRequired,
  initialReviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      userName: PropTypes.string.isRequired,
      productId: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })
  )
}

export default Reviews