import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

export default function RequireAuth({ children }) {
  const { user } = useContext(AuthContext)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/need-login" state={{ from: location }} replace />
  }

  return children
}
