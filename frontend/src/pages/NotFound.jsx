import { Link } from 'react-router-dom'
import './AuthLayout.css'

export default function NotFound(){
  return (
    <div className="auth-page">
      <div className="auth-container">
        <header className="auth-header">
          <h1 className="auth-title">404 — Página não encontrada</h1>
          <p className="auth-subtitle">A página que você procura não existe.</p>
        </header>
        <p className="auth-note"><Link to="/">Voltar para a página inicial</Link></p>
      </div>
    </div>
  )
}
