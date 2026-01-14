import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import Button from '../components/Button/Button'
import './AuthLayout.css'

export default function HomePage() {
  const { user, logout } = useContext(AuthContext)

  async function handleLogout() {
    try {
      await fetch('/api/logout/', { method: 'POST', credentials: 'include' })
    } catch (err) {
      console.error('logout error', err)
    }
    logout()
    window.location.href = '/login'
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <header className="auth-header">
          <h1 className="auth-title">Bem-vindo ao Habitcs</h1>
          <p className="auth-subtitle">Organize seus hábitos e acompanhe seu progresso</p>
        </header>

        {user ? (
          <div>
            <p>Olá, {user.name || user.username}.</p>
            <p>
              <Link to="/habits">Meus hábitos</Link> · <Link to="/create">Criar hábito</Link>
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <Button variant="ghost" onClick={() => window.location.href = '/habits'}>Ir para hábitos</Button>
              <Button variant="danger" onClick={handleLogout}>Sair</Button>
            </div>
          </div>
        ) : (
          <div>
            <p>Você não está logado.</p>
            <p><Link to="/login">Entrar</Link> para continuar.</p>
          </div>
        )}
      </div>
    </div>
  )
}
