import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './AuthLayout.css'

export default function NeedLogin(){
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login', { state: { from: location } })
    }, 1600)
    return () => clearTimeout(timer)
  }, [location, navigate])

  return (
    <div className="auth-page">
      <div className="auth-container">
        <header className="auth-header">
          <h1 className="auth-title">É necessário estar logado</h1>
          <p className="auth-subtitle">Você será redirecionado para a tela de login...</p>
        </header>
        <p className="auth-note"><Link to="/">Voltar para a página inicial</Link></p>
      </div>
    </div>
  )
}
