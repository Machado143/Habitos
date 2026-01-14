import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function HabitsPage() {
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetch('/api/habits/', { credentials: 'include' })
      .then((r) => {
        if (!r.ok) throw new Error('Erro ao buscar hábitos')
        return r.json()
      })
      .then((data) => { if (mounted) setHabits(data) })
      .catch((err) => { if (mounted) setError(err.message) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Meus Hábitos</h1>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {habits.map(h => (
            <li key={h.id}>{h.name} — {h.frequency}</li>
          ))}
        </ul>
      )}
      <p><Link to="/">Voltar</Link></p>
    </div>
  )
}
