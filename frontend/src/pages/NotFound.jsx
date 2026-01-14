import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div style={{ padding: 20 }}>
      <h1>404 — Página não encontrada</h1>
      <p><Link to="/">Voltar para a página inicial</Link></p>
    </div>
  )
}
