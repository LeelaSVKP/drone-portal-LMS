import { useState } from 'react'
import { Card, CardHeader, CardBody, Button, Badge, Avatar, Modal } from '../../components/shared/SharedComponents'
import { MessageSquare, Clock, CheckCircle, AlertCircle, Search, Filter, MoreVertical, CheckCircle2, Send } from 'lucide-react'
import styles from '../student/StudentDashboard.module.css'

export default function SupportTickets() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [showToast, setShowToast] = useState(null)
  const [tickets, setTickets] = useState([
    { id: 'TKT-201', user: 'Ravi Kumar', subject: 'Login issue on mobile', status: 'Open', priority: 'High', date: '2 hours ago', message: 'I cannot log in from the Android app. It keeps saying invalid credentials.' },
    { id: 'TKT-202', user: 'Priya Sharma', subject: 'Course upload error', status: 'In Progress', priority: 'Medium', date: '5 hours ago', message: 'The video upload fails at 90% every time.' },
    { id: 'TKT-203', user: 'Amit Singh', subject: 'Certificate typo', status: 'Closed', priority: 'Low', date: '1 day ago', message: 'My name is misspelled on the DGCA certificate.' },
    { id: 'TKT-204', user: 'Sonia Ray', subject: 'Payment refund request', status: 'Open', priority: 'Urgent', date: '30 mins ago', message: 'I was charged twice for the Pro Pilot plan.' },
  ])

  const resolveTicket = (id) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'Closed' } : t))
    setShowToast('Ticket resolved successfully!')
    setTimeout(() => setShowToast(null), 3000)
    setSelectedTicket(null)
  }

  const filteredTickets = tickets.filter(t => 
    t.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={styles.page + ' fade-in'}>
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'var(--accent3)',
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

      <div className={styles.header}>
        <div className={styles.title}>Help & Support Desk</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {[
          { label: 'All Tickets', count: tickets.length, icon: <MessageSquare />, color: 'blue' },
          { label: 'Open', count: tickets.filter(t => t.status === 'Open').length, icon: <AlertCircle />, color: 'red' },
          { label: 'In Progress', count: tickets.filter(t => t.status === 'In Progress').length, icon: <Clock />, color: 'yellow' },
          { label: 'Resolved', count: tickets.filter(t => t.status === 'Closed').length, icon: <CheckCircle />, color: 'green' },
        ].map(s => (
          <Card key={s.label}>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <div style={{ color: `var(--${s.color})`, marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>{s.count}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <Card style={{ marginTop: '30px' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '15px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by ticket ID, user, or subject..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px 10px 10px 38px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none' }}
            />
          </div>
          <Button variant="ghost" onClick={() => alert('Filtering options...')}><Filter size={16} /></Button>
        </div>

        <CardBody noPad>
          {filteredTickets.length > 0 ? filteredTickets.map(ticket => (
            <div 
              key={ticket.id} 
              style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} 
              className="hover-row"
              onClick={() => setSelectedTicket(ticket)}
            >
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <Avatar initials={ticket.user[0]} size={40} color1="var(--border)" color2="var(--surface)" />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{ticket.subject}</span>
                    <Badge variant={ticket.priority === 'Urgent' ? 'red' : ticket.priority === 'High' ? 'yellow' : 'blue'}>{ticket.priority}</Badge>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{ticket.id} • {ticket.user} • {ticket.date}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Badge variant={ticket.status === 'Open' ? 'red' : ticket.status === 'Closed' ? 'blue' : 'yellow'}>{ticket.status}</Badge>
                <button 
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  onClick={(e) => { e.stopPropagation(); alert(`Actions for ${ticket.id}`); }}
                >
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          )) : (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No tickets match your search.</div>
          )}
        </CardBody>
      </Card>

      <Modal
        isOpen={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        title={`Support Ticket: ${selectedTicket?.id}`}
      >
        {selectedTicket && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>{selectedTicket.user}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Subject: {selectedTicket.subject}</div>
              </div>
              <Badge variant={selectedTicket.priority === 'Urgent' ? 'red' : 'yellow'}>{selectedTicket.priority} Priority</Badge>
            </div>

            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--accent)', marginBottom: '8px' }}>Message</div>
              <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: '1.6' }}>{selectedTicket.message}</div>
            </div>

            <div className="field">
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Reply to User</label>
              <textarea 
                rows="4" 
                placeholder="Type your response here..." 
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', outline: 'none', resize: 'none' }}
              ></textarea>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="ghost" style={{ flex: 1 }} onClick={() => resolveTicket(selectedTicket.id)}>Mark as Resolved</Button>
              <Button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => { setShowToast('Reply sent to user!'); setTimeout(() => setShowToast(null), 3000); setSelectedTicket(null); }}>
                <Send size={16} />
                <span>Send Reply</span>
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
