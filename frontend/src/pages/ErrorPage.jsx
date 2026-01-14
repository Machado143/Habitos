import { Link } from 'react-router-dom'
import './AuthLayout.css'

export default function ErrorPage({ message }) {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <header className="auth-header">
          <h1 className="auth-title">Erro</h1>
          <p className="auth-subtitle">{message || 'Ocorreu um erro.'}</p>
        </header>
        <p className="auth-note"><Link to="/">Voltar para a página inicial</Link></p>
      </div>
    </div>
  )
}
