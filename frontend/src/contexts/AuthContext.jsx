/**
 * AuthContext - Contexto de autenticação
 * 
 * Responsabilidades:
 * - Gerenciar estado do usuário logado
 * - Verificar sessão existente no backend (ex: login via Django admin)
 * - Persistir sessão no localStorage como fallback
 * - Fornecer funções de login/logout
 */

import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null)

/* =============================================================================
   CONSTANTES
   ============================================================================= */

/** Chave do localStorage para persistência */
const STORAGE_KEY = 'habitos_user'

/** Endpoint para verificar sessão atual */
const ME_ENDPOINT = '/api/me/'

/* =============================================================================
   PROVIDER
   ============================================================================= */

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // Aguarda verificação inicial

  // ─────────────────────────────────────────────────────────────────────────────
  // Efeitos
  // ─────────────────────────────────────────────────────────────────────────────

  /** 
   * Verifica autenticação na inicialização
   * 1. Primeiro tenta verificar sessão ativa no backend
   * 2. Se não houver, verifica localStorage como fallback
   */
  useEffect(() => {
    async function checkAuth() {
      try {
        // Verifica se há sessão válida no backend (ex: logou pelo admin)
        const res = await fetch(ME_ENDPOINT, { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          if (data && data.username) {
            // Sessão válida no backend - usa essa
            setUser(data)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
            setLoading(false)
            return
          }
        }
      } catch (err) {
        console.error('Erro ao verificar sessão:', err)
      }

      // Fallback: verifica localStorage
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          setUser(JSON.parse(stored))
        } catch (err) {
          console.error('Erro ao restaurar sessão local:', err)
          localStorage.removeItem(STORAGE_KEY)
        }
      }
      
      setLoading(false)
    }

    checkAuth()
  }, [])

  // ─────────────────────────────────────────────────────────────────────────────
  // Métodos
  // ─────────────────────────────────────────────────────────────────────────────

  /** Realiza login e persiste no localStorage */
  function login(userObj) {
    setUser(userObj)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userObj))
  }

  /** Realiza logout e limpa localStorage */
  function logout() {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
