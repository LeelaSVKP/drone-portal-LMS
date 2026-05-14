import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Login.css'

export default function Login() {
  const { login } = useAuth()
  const [role, setRole] = useState('student')

  const handleLogin = (e) => {
    e.preventDefault()
    login(role)
  }

  return (
    <div className="screen-login active fade-in">
      <div className="login-box">
        <div className="login-logo">
          <img src="/Logo-White.png" alt="Akin Analytics Logo" className="login-logo-img" />
          <h2 className="drone-academy-title">DRONE ACADEMY</h2>
        </div>

        <div className="role-tabs">
          <button
            className={`role-tab ${role === 'student' ? 'active' : ''}`}
            onClick={() => setRole('student')}
            type="button"
          >
            Student
          </button>
          <button
            className={`role-tab ${role === 'trainer' ? 'active' : ''}`}
            onClick={() => setRole('trainer')}
            type="button"
          >
            Trainer
          </button>
          <button
            className={`role-tab ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
            type="button"
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="field">
            <label>Email address</label>
            <input
              type="email"
              placeholder="you@akinanalytics.com"
              value={role === 'student' ? 'student@akin.com' : role === 'trainer' ? 'trainer@akin.com' : 'admin@akin.com'}
              readOnly
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value="••••••••"
              readOnly
            />
          </div>

          <button type="submit" className="login-btn">
            Launch Portal →
          </button>
        </form>
      </div>
    </div>
  )
}
