import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('habitos_user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  function login(userObj) {
    setUser(userObj)
    localStorage.setItem('habitos_user', JSON.stringify(userObj))
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('habitos_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
