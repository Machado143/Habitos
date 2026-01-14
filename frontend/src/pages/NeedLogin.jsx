import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function NeedLogin(){
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login', { state: { from: location } })
    }, 2000)
    return () => clearTimeout(timer)
  }, [location, navigate])

  return (
    <div style={{ padding: 20 }}>
      <h1>É necessário estar logado</h1>
      <p>Você será redirecionado para a tela de login...</p>
      <p><Link to="/">Voltar para a página inicial</Link></p>
    </div>
  )
}
