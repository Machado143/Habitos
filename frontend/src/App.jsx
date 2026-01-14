import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import RequireAuth from './components/RequireAuth'

import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import HabitsPage from './pages/HabitsPage'
import CreateHabit from './pages/CreateHabit'
import NeedLogin from './pages/NeedLogin'
import ErrorPage from './pages/ErrorPage'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/need-login" element={<NeedLogin />} />
          <Route path="/error" element={<ErrorPage />} />

          <Route path="/" element={<HomePage />} />

          <Route path="/habits" element={<RequireAuth><HabitsPage /></RequireAuth>} />
          <Route path="/create" element={<RequireAuth><CreateHabit /></RequireAuth>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
