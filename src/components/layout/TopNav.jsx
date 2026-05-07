import { Bell, Sun, Moon } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { Avatar } from '../shared/SharedComponents'
import styles from './TopNav.module.css'

export default function TopNav({ onLogout, onNavigate }) {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const isTrainer = user?.role === 'trainer'

  return (
    <header className={styles.nav}>
      <div className={styles.brand}>
        <div className={styles.brandTitle}>
          <span className={styles.akin}>AKIN</span>
          <span className={styles.droneAcademy}>DRONE ACADEMY</span>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.roleBadge} data-role={user?.role}>
          {isTrainer ? 'Trainer' : 'Student'}
        </div>
        <button className={styles.iconBtn} title="Notifications" onClick={() => onNavigate && onNavigate('notifications')}>
          <Bell size={16} />
        </button>
        <button 
          className={styles.iconBtn} 
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div onClick={() => onNavigate && onNavigate('profile')} style={{ cursor: 'pointer' }}>
          <Avatar
            initials={user?.avatar}
            color1={isTrainer ? 'var(--accent2)' : 'var(--accent2)'}
            color2={isTrainer ? '#c026d3' : 'var(--accent)'}
            size={34}
          />
        </div>
        <button className={styles.logoutBtn} onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}
