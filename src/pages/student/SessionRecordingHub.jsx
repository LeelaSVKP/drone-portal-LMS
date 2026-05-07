import { useState } from 'react'
import { Card, CardHeader, Badge, Button } from '../../components/shared/SharedComponents'
import { PlayCircle, Clock, Calendar, Search, Filter, Monitor } from 'lucide-react'
import styles from './StudentDashboard.module.css'

export default function SessionRecordingHub() {
  const [searchQuery, setSearchQuery] = useState('')

  const recordings = [
    { id: 1, title: 'Introduction to Airspace Regulations', trainer: 'Priya Sharma', date: 'May 04, 2025', duration: '1h 20m', thumbnail: 'https://images.unsplash.com/photo-1506941433945-99a2aa4bd50a?auto=format&fit=crop&q=80&w=600' },
    { id: 2, title: 'Weather Patterns & Safe Flight', trainer: 'Arjun Das', date: 'May 02, 2025', duration: '45m', thumbnail: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=600' },
    { id: 3, title: 'Drone Battery Maintenance Workshop', trainer: 'Priya Sharma', date: 'Apr 28, 2025', duration: '1h 05m', thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=600' },
    { id: 4, title: 'Emergency Procedures Simulation', trainer: 'Arjun Das', date: 'Apr 25, 2025', duration: '55m', thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600' },
  ]

  const filteredRecordings = recordings.filter(rec =>
    rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rec.trainer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header} style={{ marginBottom: '32px' }}>
        <div style={{ flex: 1 }}>
          <div className={styles.title}>Live Session Recordings</div>
          <div className={styles.subtitle} style={{ marginBottom: '20px' }}>
            Watch recordings of past live classes and workshops at your own pace.
          </div>

          <div style={{ position: 'relative', maxWidth: '450px' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--accent)',
                opacity: 0.7
              }}
            />
            <input
              type="text"
              placeholder="Search by topic or trainer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 42px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {filteredRecordings.length > 0 ? filteredRecordings.map(rec => (
          <Card key={rec.id} style={{ overflow: 'hidden' }} className="hover-lift">
            <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
              <img src={rec.thumbnail} alt={rec.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
                <PlayCircle size={48} color="var(--accent)" style={{ cursor: 'pointer' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                <Badge variant="gray" style={{ background: 'rgba(0,0,0,0.8)', color: '#fff' }}>{rec.duration}</Badge>
              </div>
            </div>

            <div style={{ padding: '16px' }}>
              <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text)', marginBottom: '8px', lineHeight: '1.4' }}>{rec.title}</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '12px' }}>
                  <Monitor size={14} />
                  <span>Trainer: {rec.trainer}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '12px' }}>
                  <Calendar size={14} />
                  <span>Recorded on: {rec.date}</span>
                </div>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                <Button size="sm" style={{ flex: 1 }}>Watch Now</Button>
                <Button size="sm" variant="ghost">Materials</Button>
              </div>
            </div>
          </Card>
        )) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>No recordings found</div>
            <div style={{ fontSize: '14px' }}>Try searching for a different topic or trainer.</div>
          </div>
        )}
      </div>
    </div>
  )
}
