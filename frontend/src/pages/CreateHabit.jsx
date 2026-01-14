import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input/Input'
import Button from '../components/Button/Button'
import './AuthLayout.css'

export default function CreateHabit(){
  const [name, setName] = useState('')
  const [frequency, setFrequency] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e){
    e.preventDefault()
    setError(null)
    setLoading(true)
    try{
      const res = await fetch('/api/habits/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, frequency })
      })
      if (!res.ok){
        const data = await res.json()
        throw new Error(data.detail || JSON.stringify(data))
      }
      navigate('/habits')
    }catch(err){
      setError(err.message)
    }finally{setLoading(false)}
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <header className="auth-header">
          <h1 className="auth-title">Criar Hábito</h1>
          <p className="auth-subtitle">Adicione um novo hábito para acompanhar</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          <Input label="Nome do hábito" value={name} onChange={e=>setName(e.target.value)} placeholder="Ex: Ler 20 páginas" required fullWidth />
          <Input label="Frequência" value={frequency} onChange={e=>setFrequency(e.target.value)} placeholder="Ex: Diário, Semanal" required fullWidth />

          {error && <div style={{color:'var(--color-error)',fontSize:'0.9rem'}}>{error}</div>}

          <div className="auth-actions">
            <Button variant="ghost" onClick={()=>navigate('/habits')}>Cancelar</Button>
            <Button type="submit" variant="primary" loading={loading}>Salvar</Button>
          </div>
        </form>

        <p className="auth-note">Você pode editar seus hábitos a qualquer momento na página de hábitos.</p>
      </div>
    </div>
  )
}
