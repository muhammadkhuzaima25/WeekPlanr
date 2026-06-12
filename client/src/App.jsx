import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Register from './pages/Register'
import Onboarding from './pages/Onboarding'
import WeeklyPlan from './pages/WeeklyPlan'
import AddTask from './pages/AddTask'
import DeadlineRadar from './pages/DeadlineRadar'
import Settings from './pages/Settings'

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            fontFamily: "'Inter', sans-serif",
          },
        }}
      />
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/register" element={<Register />} />
      <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
      <Route path="/weekly-plan" element={<ProtectedRoute><WeeklyPlan /></ProtectedRoute>} />
      <Route path="/add-task" element={<ProtectedRoute><AddTask /></ProtectedRoute>} />
      <Route path="/deadline-radar" element={<ProtectedRoute><DeadlineRadar /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
    </Routes>
    </>
  )
}
