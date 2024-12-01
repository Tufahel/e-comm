import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ProtectedRoute