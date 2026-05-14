import { useState } from 'react'
import { Card, CardHeader, CardBody, Button, Badge } from '../../components/shared/SharedComponents'
import { Bell, Send, Users, Globe, Trash2, Calendar, CheckCircle2 } from 'lucide-react'
import styles from '../student/StudentDashboard.module.css'

export default function GlobalAnnouncements() {
  const [showToast, setShowToast] = useState(null)
  const [formData, setFormData] = useState({ target: 'All Users', subject: '', message: '' })
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Server Maintenance', target: 'All Users', date: '2025-05-10', status: 'Scheduled' },
    { id: 2, title: 'New Regulation Update', target: 'Trainers', date: '2025-05-01', status: 'Sent' },
    { id: 3, title: 'Exam Registration Open', target: 'Students', date: '2024-12-28', status: 'Sent' },
  ])

  const handleDelete = (id) => {
    if (window.confirm('Delete this announcement? This action cannot be undone.')) {
      setAnnouncements(prev => prev.filter(a => a.id !== id))
      setShowToast('Announcement deleted.')
      setTimeout(() => setShowToast(null), 3000)
    }
  }

  const handleBroadcast = (e) => {
    e.preventDefault()
    if (!formData.subject || !formData.message) {
      alert('Please fill in all fields.')
      return
    }

    setShowToast('Broadcasting message...')
    
    setTimeout(() => {
      const newAnn = {
        id: Date.now(),
        title: formData.subject,
        target: formData.target,
        date: new Date().toISOString().split('T')[0],
        status: 'Sent'
      }
      setAnnouncements(prev => [newAnn, ...prev])
      setFormData({ target: 'All Users', subject: '', message: '' })
      setShowToast('Message broadcasted successfully!')
      setTimeout(() => setShowToast(null), 3000)
    }, 1500)
  }

  const scrollToForm = () => {
    const form = document.getElementById('announcement-form')
    if (form) form.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={styles.page + ' fade-in'}>
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: showToast.includes('deleted') ? 'var(--danger)' : 'var(--accent3)',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          zIndex: 10000,
          animation: 'slide-in 0.3s ease-out'
        }}>
          <CheckCircle2 size={20} />
          <span style={{ fontWeight: '600' }}>{showToast}</span>
        </div>
      )}

      <div className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className={styles.title}>Global Announcements</div>
        </div>
        <Button 
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          onClick={scrollToForm}
        >
          <Send size={18} />
          <span>New Announcement</span>
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '30px' }}>
        <Card id="announcement-form">
          <CardHeader title="Create Broadcast" />
          <CardBody>
            <form onSubmit={handleBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Target Audience</label>
                <select 
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  style={{ width: '100%', padding: '10px', background: '#1a1f2e', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', outline: 'none' }}
                >
                  <option>All Users</option>
                  <option>Students Only</option>
                  <option>Trainers Only</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Subject</label>
                <input 
                  type="text" 
                  placeholder="Enter title..." 
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', outline: 'none' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Message Body</label>
                <textarea 
                  rows="4" 
                  placeholder="Write your message..." 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', resize: 'none', outline: 'none' }}
                ></textarea>
              </div>
              <Button type="submit" style={{ width: '100%', marginTop: '10px' }}>Broadcast Message</Button>
            </form>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Announcement History" />
          <CardBody noPad>
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {announcements.map(a => (
                <div key={a.id} style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: 'rgba(0, 212, 255, 0.1)', padding: '10px', borderRadius: '10px', color: 'var(--accent)' }}>
                      <Bell size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{a.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', gap: '10px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={12} /> {a.target}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {a.date}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Badge variant={a.status === 'Sent' ? 'blue' : 'yellow'}>{a.status}</Badge>
                    <button 
                      style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => handleDelete(a.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
