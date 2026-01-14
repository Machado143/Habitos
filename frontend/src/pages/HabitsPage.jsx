import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import NavBar from '../components/NavBar/NavBar';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import './HabitsPage.css';

export default function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, completed
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHabits();
  }, []);

  async function fetchHabits() {
    try {
      const res = await fetch('/api/habits/', {
        credentials: 'include'
      });
      
      if (res.ok) {
        const data = await res.json();
        setHabits(data);
      }
    } catch (err) {
      console.error('Error fetching habits:', err);
    } finally {
      setLoading(false);
    }
  }

  async function toggleHabitComplete(habitId, currentStatus) {
    try {
      const res = await fetch(`/api/habits/${habitId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          completed: !currentStatus
        })
      });

      if (res.ok) {
        fetchHabits(); // Reload habits
      }
    } catch (err) {
      console.error('Error toggling habit:', err);
    }
  }

  async function deleteHabit(habitId) {
    if (!confirm('Tem certeza que deseja deletar este hábito?')) return;

    try {
      const res = await fetch(`/api/habits/${habitId}/`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (res.ok) {
        fetchHabits(); // Reload habits
      }
    } catch (err) {
      console.error('Error deleting habit:', err);
    }
  }

  const stats = {
    total: habits.length,
    completed: habits.filter(h => h.completed).length,
    active: habits.filter(h => !h.completed).length,
    streak: 7 // Mock streak value
  };

  const filteredHabits = habits.filter(habit => {
    if (filter === 'all') return true;
    if (filter === 'active') return !habit.completed;
    if (filter === 'completed') return habit.completed;
    return true;
  });

  if (loading) {
    return (
      <div className="habits-page">
        <NavBar user={user} onLogout={logout} />
        <main className="habits-container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Carregando seus hábitos...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="habits-page">
      <NavBar user={user} onLogout={logout} />

      <main className="habits-container">
        <header className="habits-header">
          <div className="habits-header-content">
            <div>
              <h1 className="habits-title">
                Olá, {user?.name || user?.username || 'Usuário'}! 👋
              </h1>
              <p className="habits-subtitle">
                Continue sua jornada de desenvolvimento pessoal
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/create')}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              }
            >
              Novo Hábito
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          <Card variant="elevated" padding="base">
            <div className="stat-card">
              <div className="stat-icon stat-icon-primary">📊</div>
              <div className="stat-content">
                <span className="stat-label">Total de hábitos</span>
                <span className="stat-value">{stats.total}</span>
              </div>
            </div>
          </Card>

          <Card variant="elevated" padding="base">
            <div className="stat-card">
              <div className="stat-icon stat-icon-success">✅</div>
              <div className="stat-content">
                <span className="stat-label">Concluídos</span>
                <span className="stat-value">{stats.completed}</span>
              </div>
            </div>
          </Card>

          <Card variant="elevated" padding="base">
            <div className="stat-card">
              <div className="stat-icon stat-icon-warning">⏳</div>
              <div className="stat-content">
                <span className="stat-label">Em progresso</span>
                <span className="stat-value">{stats.active}</span>
              </div>
            </div>
          </Card>

          <Card variant="elevated" padding="base">
            <div className="stat-card">
              <div className="stat-icon stat-icon-fire">🔥</div>
              <div className="stat-content">
                <span className="stat-label">Sequência</span>
                <span className="stat-value">{stats.streak} dias</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="habits-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'filter-btn-active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todos ({habits.length})
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'filter-btn-active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Ativos ({stats.active})
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'filter-btn-active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Concluídos ({stats.completed})
          </button>
        </div>

        {/* Habits Grid */}
        {filteredHabits.length === 0 ? (
          <Card variant="elevated" padding="lg">
            <div className="empty-state">
              <div className="empty-state-icon">📝</div>
              <h3 className="empty-state-title">
                {filter === 'all' 
                  ? 'Nenhum hábito ainda'
                  : `Nenhum hábito ${filter === 'active' ? 'ativo' : 'concluído'}`
                }
              </h3>
              <p className="empty-state-description">
                {filter === 'all'
                  ? 'Comece criando seu primeiro hábito para acompanhar seu progresso'
                  : 'Tente ajustar os filtros ou adicionar novos hábitos'
                }
              </p>
              {filter === 'all' && (
                <Button variant="primary" onClick={() => navigate('/create')}>
                  Criar primeiro hábito
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <div className="habits-grid">
            {filteredHabits.map((habit) => (
              <Card key={habit.id} variant="elevated" padding="base" hoverable>
                <div className="habit-card">
                  <div className="habit-header">
                    <h3 className="habit-title">{habit.name}</h3>
                    <div className="habit-actions">
                      <button
                        className="habit-action-btn"
                        onClick={() => navigate(`/create?edit=${habit.id}`)}
                        title="Editar"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        className="habit-action-btn habit-action-danger"
                        onClick={() => deleteHabit(habit.id)}
                        title="Deletar"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {habit.description && (
                    <p className="habit-description">{habit.description}</p>
                  )}

                  <div className="habit-footer">
                    <Button
                      variant={habit.completed ? 'success' : 'secondary'}
                      size="sm"
                      onClick={() => toggleHabitComplete(habit.id, habit.completed)}
                      icon={
                        habit.completed ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : null
                      }
                    >
                      {habit.completed ? 'Concluído' : 'Marcar como concluído'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
