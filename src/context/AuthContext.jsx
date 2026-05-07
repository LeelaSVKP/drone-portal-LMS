/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const MOCK_USERS = {
  student: {
    id: 'stu-001',
    name: 'Ravi Kumar',
    email: 'student@akin.com',
    role: 'student',
    avatar: 'RK',
    city: 'Hyderabad, Telangana',
    phone: '+91 9876543210',
    language: 'Telugu / English',
    joinDate: 'January 2025',
  },
  trainer: {
    id: 'tra-001',
    name: 'Priya Sharma',
    email: 'trainer@akin.com',
    role: 'trainer',
    avatar: 'PS',
    specialization: 'Drone Operations Specialist',
    experience: '6 years',
    city: 'Hyderabad, Telangana',
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (role) => {
    setUser(MOCK_USERS[role])
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = (newData) => {
    setUser(prev => ({ ...prev, ...newData }))
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
