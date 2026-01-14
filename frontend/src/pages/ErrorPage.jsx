import { Link } from 'react-router-dom'

export default function ErrorPage({ message }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Erro</h1>
      <p>{message || 'Ocorreu um erro.'}</p>
      <p><Link to="/">Voltar para a página inicial</Link></p>
    </div>
  )
}
