import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

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
    <div style={{ padding: 20 }}>
      <h1>Bem-vindo ao Hábitos</h1>
      {user ? (
        <div>
          <p>Olá, {user.username}.</p>
          <p>
            <Link to="/habits">Meus hábitos</Link> · <Link to="/create">Criar hábito</Link>
          </p>
          <button onClick={handleLogout}>Sair</button>
        </div>
      ) : (
        <div>
          <p>Você não está logado.</p>
          <p><Link to="/login">Entrar</Link> para continuar.</p>
        </div>
      )}
    </div>
  )
}
