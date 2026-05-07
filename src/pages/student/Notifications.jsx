import { useState } from 'react'
import { NOTIFICATIONS } from '../../data/mockData'
import styles from './StudentPages.module.css'

export default function Notifications() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS)

  const getBorderColor = (type) => {
    switch (type) {
      case 'warning': return 'var(--accent4)'
      case 'feedback': return 'var(--accent3)'
      case 'announcement': return 'var(--accent2)'
      default: return 'var(--accent)'
    }
  }

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div className={styles.title}>Notifications</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {notifications.map(n => (
          <div 
            key={n.id} 
            className={styles.notif} 
            style={{ 
              borderLeftColor: getBorderColor(n.type), 
              opacity: n.read ? 0.7 : 1,
              cursor: n.read ? 'default' : 'pointer'
            }}
            onClick={() => !n.read && markAsRead(n.id)}
          >
            <div className={styles.notifIcon}>{n.icon}</div>
            <div style={{ flex: 1 }}>
              <div className={styles.notifText} dangerouslySetInnerHTML={{ __html: n.message.replace(/(Speed Learner|Flight Safety & Regulations — Quiz 2|Priya Sharma|Agriculture Drone Operations)/g, '<strong>$1</strong>') }} />
              <div className={styles.notifTime}>{n.time}</div>
            </div>
            {!n.read && (
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', alignSelf: 'center', marginRight: 16 }}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
