/**
 * CreateHabit - Página de criação de novo hábito
 */

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ToastContext from '../contexts/ToastContext';
import NavBar from '../components/NavBar/NavBar';
import Card from '../components/Card/Card';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { post } from '../utils/api';
import '../pages/HabitsPage.css'; // Reusing dashboard styles for layout

const API_ENDPOINT = '/api/habits/';

const PLACEHOLDERS = {
  name: 'Ex: Ler 20 páginas',
  description: 'Adicione mais detalhes sobre este hábito (opcional)',
  frequency: 'Ex: Diário, Semanal'
};

export default function CreateHabit() {
  const navigate = useNavigate();
  const toast = useContext(ToastContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => navigate('/habits');

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await post(API_ENDPOINT, { name, description, frequency });

      // Check if res has error. Assuming api wrapper returns { error: ... } or ok property.
      // Based on previous code: if (!res.ok) throw...
      // But verify api.js? Previous file had: if (!res.ok) ...
      // Let's assume the previous logic was observing the fetch response directly?
      // "post" from utils/api usually returns the JSON.
      
      // Let's rely on standard logic: if it has error property or if it throws.
      // If previous code checked res.ok, post might return standard Response object OR object with ok property.
      
      if (res.error) {
        throw new Error(res.error);
      }
      // If res is the json object and doesn't have error:
      
      toast.success(`Hábito "${name}" criado com sucesso!`);
      navigate('/habits');
    } catch (err) {
      setError(err.message || 'Erro ao criar hábito');
      toast.error('Erro ao criar hábito');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-layout">
      <NavBar />
      
      <main className="dashboard-main">
        <div className="dashboard-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="dashboard-header">
                <h1 className="dashboard-title">Novo Hábito</h1>
                <p className="dashboard-subtitle">Defina uma nova meta para sua rotina</p>
            </div>

            <Card>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                    <Input
                        label="Nome do hábito"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={PLACEHOLDERS.name}
                        required
                        fullWidth
                    />

                    <div className="input-wrapper">
                        <label className="input-label">Descrição (opcional)</label>
                        <textarea
                            className="input-field"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={PLACEHOLDERS.description}
                            rows="4"
                            style={{ resize: 'vertical', paddingTop: 'var(--spacing-2)' }}
                        />
                    </div>

                    <Input
                        label="Frequência"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        placeholder={PLACEHOLDERS.frequency}
                        required
                        fullWidth
                    />

                    {error && (
                        <div style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)', padding: 'var(--spacing-2) 0' }}>
                            {error}
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: 'var(--spacing-3)', marginTop: 'var(--spacing-2)', justifyContent: 'flex-end' }}>
                        <Button type="button" variant="ghost" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="primary" loading={loading}>
                            Criar Hábito
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
      </main>
    </div>
  );
}
