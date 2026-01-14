/**
 * HabitsPage - Dashboard principal de hábitos
 * 
 * Responsabilidades:
 * - Listar hábitos do usuário
 * - Filtrar por status (todos, ativos, concluídos)
 * - Permitir edição, exclusão e toggle de status
 * - Exibir estatísticas resumidas
 */

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import ToastContext from "../contexts/ToastContext";
import NavBar from "../components/NavBar/NavBar";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import "./HabitsPage.css";
import { get, patch, del, setAuthHandler } from "../utils/api";

// =============================================================================
// ÍCONES SVG
// =============================================================================

const Icons = {
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Edit: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  ),
  Trash: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  Filter: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
  )
};

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

export default function HabitsPage() {
  // ---------------------------------------------------------------------------
  // Estado
  // ---------------------------------------------------------------------------
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // ---------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------
  const { user, logout } = useContext(AuthContext);
  const toast = useContext(ToastContext);
  const navigate = useNavigate();

  // ---------------------------------------------------------------------------
  // Efeitos
  // ---------------------------------------------------------------------------
  useEffect(() => {
    // Registra handler global para falhas de autenticação
    setAuthHandler(() => {
      logout();
      navigate('/need-login', { replace: true });
    });

    fetchHabits();

    return () => setAuthHandler(null);
  }, []);

  // ---------------------------------------------------------------------------
  // API Handlers
  // ---------------------------------------------------------------------------

  /** Busca todos os hábitos do usuário */
  async function fetchHabits() {
    try {
      const res = await get("/api/habits/")
      if (!res.ok) return
      setHabits(res.data || [])
    } catch (err) {
      console.error("Erro ao buscar hábitos:", err);
    } finally {
      setLoading(false);
    }
  }

  /** Alterna status de conclusão de um hábito */
  async function toggleHabitComplete(habitId, currentStatus) {
    try {
      const res = await patch(`/api/habits/${habitId}/`, { completed: !currentStatus })
      if (!res.ok) return
      
      const habitName = habits.find(h => h.id === habitId)?.name
      if (!currentStatus) {
        toast.success(`Hábito concluído!`)
      }
      
      fetchHabits()
    } catch (err) {
      console.error("Erro ao atualizar hábito:", err);
      toast.error("Erro ao atualizar hábito")
    }
  }

  /** Remove um hábito após confirmação */
  async function deleteHabit(habitId) {
    if (!confirm("Tem certeza que deseja deletar este hábito?")) return;
    try {
      const habitName = habits.find(h => h.id === habitId)?.name
      const res = await del(`/api/habits/${habitId}/`)
      if (!res.ok) return
      
      toast.success(`Hábito removido`)
      fetchHabits()
    } catch (err) {
      console.error("Erro ao deletar hábito:", err);
      toast.error("Erro ao deletar hábito")
    }
  }

  // ---------------------------------------------------------------------------
  // Dados derivados
  // ---------------------------------------------------------------------------
  const stats = {
    total: habits.length,
    completed: habits.filter((h) => h.completed).length,
    active: habits.filter((h) => !h.completed).length,
    streak: Math.max(0, ...habits.map(h => h.streak || 0)), // Exemplo de cálculo básico
  };

  const filteredHabits = habits.filter((habit) => {
    // Filtro de status
    if (filter === "active" && habit.completed) return false;
    if (filter === "completed" && !habit.completed) return false;
    
    // Filtro de pesquisa
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        habit.name.toLowerCase().includes(query) ||
        (habit.description && habit.description.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  // ---------------------------------------------------------------------------
  // Render: Loading
  // ---------------------------------------------------------------------------
  if (loading) {
    return (
      <div className="habits-page">
        <NavBar user={user} onLogout={logout} />
        <main className="habits-container">
          <div className="loading-state">
            <div className="spinner" />
            <p>Carregando...</p>
          </div>
        </main>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Render: Principal
  // ---------------------------------------------------------------------------
  return (
    <div className="habits-page">
      <NavBar user={user} onLogout={logout} />

      <main className="habits-container">
        {/* Header simplificado e clean */}
        <header className="habits-header">
          <div className="habits-header-content">
            <div className="habits-welcome">
              <h1 className="habits-title">
                {getGreeting()}, {user?.name?.split(' ')[0] || user?.username || "Visitante"}
              </h1>
              <p className="habits-subtitle">
                Você tem {stats.active} hábitos pendentes hoje
              </p>
            </div>
            
            <div className="habits-primary-action">
              <Button
                variant="primary"
                size="base"
                onClick={() => navigate("/create")}
                icon={<Icons.Plus />}
              >
                Novo Hábito
              </Button>
            </div>
          </div>
        </header>

        {/* Toolbar: Filtros e Pesquisa */}
        <div className="habits-toolbar">
          <div className="habits-search">
            <Input
              placeholder="Pesquisar hábitos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Icons.Search />}
              fullWidth
            />
          </div>
          
          <div className="habits-filters">
            <button 
              className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Todos
            </button>
            <button 
              className={`filter-chip ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Pendentes
            </button>
            <button 
              className={`filter-chip ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
               Concluídos
            </button>
          </div>
        </div>

        {/* Lista de hábitos Clean */}
        <div className="habits-list-section">
          {filteredHabits.length === 0 ? (
            <div className="empty-state-clean">
              <div className="empty-icon">📝</div>
              <h3>Nenhum hábito encontrado</h3>
              <p>Adicione novos hábitos para começar sua jornada.</p>
            </div>
          ) : (
            <div className="habits-grid">
              {filteredHabits.map((habit) => (
                <div key={habit.id} className={`habit-card-clean ${habit.completed ? 'completed' : ''}`}>
                  <div className="habit-content" onClick={() => navigate(`/create?edit=${habit.id}`)}>
                    <h3 className="habit-name">{habit.name}</h3>
                    {habit.description && (
                      <p className="habit-desc">{habit.description}</p>
                    )}
                    <div className="habit-meta">
                      <span className="habit-streak">🔥 {habit.streak || 0} dias</span>
                      <span className="habit-frequency">{habit.frequency === 'weekly' ? 'Semanal' : 'Diário'}</span>
                    </div>
                  </div>

                  <div className="habit-actions">
                    <button
                      className={`check-button ${habit.completed ? 'checked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleHabitComplete(habit.id, habit.completed);
                      }}
                      title={habit.completed ? "Marcar como pendente" : "Concluir hábito"}
                    >
                      {habit.completed && <Icons.Check />}
                    </button>
                    
                    <button
                      className="delete-button-clean"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHabit(habit.id);
                      }}
                      title="Excluir"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
