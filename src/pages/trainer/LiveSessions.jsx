import { useState } from 'react'
import { LIVE_SESSIONS } from '../../data/mockData'
import { useCourses } from '../../context/CourseContext'
import { Card, CardBody, Table, Badge, Button } from '../../components/shared/SharedComponents'
import styles from './TrainerPages.module.css'

export default function LiveSessions() {
  const { courses } = useCourses()
  const [sessions, setSessions] = useState(LIVE_SESSIONS)
  const [showForm, setShowForm] = useState(false)
  
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [platform, setPlatform] = useState('Zoom')

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'upcoming': return 'green'
      case 'scheduled': return 'blue'
      case 'completed': return 'gray'
      default: return 'yellow'
    }
  }

  const getStatusText = (session) => {
    if (session.status === 'upcoming') return 'Live in 2h'
    return session.status.charAt(0).toUpperCase() + session.status.slice(1)
  }

  const handleSaveSession = () => {
    if (!title || !date || !time) return
    const newSession = {
      id: 'ls' + Date.now(),
      title,
      date,
      time,
      students: 0,
      platform,
      status: 'scheduled'
    }
    setSessions([newSession, ...sessions])
    setShowForm(false)
    setTitle('')
    setDate('')
    setTime('')
  }

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div className={styles.title}>Live Sessions</div>
        <div className={styles.subtitle}>Schedule and manage online classes</div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Button variant="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Schedule Session'}
        </Button>
      </div>

      {showForm && (
        <Card style={{ marginBottom: 24 }}>
          <CardBody>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 16 }}>Schedule New Session</div>
            <div className="field" style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Session Title</label>
              <input 
                placeholder="e.g. Q&A on Drone Mechanics" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid rgba(0, 212, 255, 0.3)', borderRadius: 8, color: 'var(--text)', fontSize: 14, outline: 'none' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div className="field">
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Date</label>
                <input 
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid rgba(0, 212, 255, 0.3)', borderRadius: 8, color: 'var(--text)', fontSize: 14, outline: 'none' }}
                />
              </div>
              <div className="field">
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Time</label>
                <input 
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid rgba(0, 212, 255, 0.3)', borderRadius: 8, color: 'var(--text)', fontSize: 14, outline: 'none' }}
                />
              </div>
              <div className="field">
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Platform</label>
                <select 
                  value={platform}
                  onChange={e => setPlatform(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid rgba(0, 212, 255, 0.3)', borderRadius: 8, color: 'var(--text)', fontSize: 14, outline: 'none' }}
                >
                  <option value="Zoom">Zoom</option>
                  <option value="Google Meet">Google Meet</option>
                  <option value="Microsoft Teams">Microsoft Teams</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="primary" disabled={!title || !date || !time} onClick={handleSaveSession}>Schedule Session</Button>
            </div>
          </CardBody>
        </Card>
      )}

      <Card>
        <Table headers={['Session', 'Date & Time', 'Students', 'Platform', 'Status']}>
          {sessions.map(session => (
            <tr key={session.id}>
              <td>{session.title}</td>
              <td>{session.date}, {session.time}</td>
              <td>{session.students}</td>
              <td>{session.platform}</td>
              <td><Badge variant={getBadgeVariant(session.status)}>{getStatusText(session)}</Badge></td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}
