import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div style={{ padding: 20 }}>
      <h1>Criar Hábito</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome: <input value={name} onChange={e=>setName(e.target.value)} required/></label>
        </div>
        <div>
          <label>Frequência: <input value={frequency} onChange={e=>setFrequency(e.target.value)} required/></label>
        </div>
        {error && <p style={{color:'red'}}>{error}</p>}
        <button type="submit">Salvar</button>
      </form>
    </div>
  )
}
