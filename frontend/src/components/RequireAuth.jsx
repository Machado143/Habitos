/**
 * RequireAuth - Componente de proteção de rotas
 * 
 * Redireciona para /need-login se o usuário não estiver autenticado.
 * Aguarda a verificação inicial do AuthContext antes de redirecionar.
 */

import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

export default function RequireAuth({ children }) {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  // Aguarda verificação do localStorage antes de decidir
  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
        <p>Verificando autenticação...</p>
      </div>
    )
  }

  // Redireciona se não estiver logado
  if (!user) {
    return <Navigate to="/need-login" state={{ from: location }} replace />
  }

  return children
}
