import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { StatCard, Card, CardHeader, CardBody, Button, Badge, Modal } from '../../components/shared/SharedComponents'
import { Users, BookOpen, Shield, Activity, TrendingUp, AlertTriangle, CheckCircle, XCircle, CheckCircle2, Plane, Navigation as NavIcon } from 'lucide-react'
import styles from '../student/StudentDashboard.module.css'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [showToast, setShowToast] = useState(null)
  const [approvals, setApprovals] = useState([
    { id: 1, type: 'Course', name: 'Advanced FPV Maneuvers', applicant: 'Trainer Priya', date: '2025-05-01' },
    { id: 2, type: 'Trainer', name: 'Rahul Varma', applicant: 'Self', date: '2025-05-02' },
    { id: 3, type: 'Course', name: 'Drone Laws 2025', applicant: 'Trainer Vikram', date: '2025-05-03' },
  ])

  const systemHealth = [
    { name: 'API Server', status: 'Healthy', latency: '24ms' },
    { name: 'Database', status: 'Healthy', latency: '12ms' },
    { name: 'Media Storage', status: 'Warning', latency: '450ms' },
    { name: 'AI Service', status: 'Healthy', latency: '110ms' },
  ]

  const handleAction = (id, action) => {
    setApprovals(prev => prev.filter(item => item.id !== id))
    setShowToast(`${action === 'approve' ? 'Approved' : 'Rejected'} successfully!`)
    setTimeout(() => setShowToast(null), 3000)
  }

  return (
    <div className={styles.page + ' fade-in'}>
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: showToast.includes('Rejected') ? 'var(--danger)' : 'var(--accent3)',
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
        <div className={styles.title}>System Control Center</div>
        <div className={styles.subtitle}>Welcome, Super Admin.</div>
      </div>

      <div className={styles.statsGrid}>
        <StatCard 
          label="Total Users" 
          value="1,284" 
          sub="+12% from last month" 
          color="blue" 
          icon={<Users size={16} />}
        />
        <StatCard 
          label="Active Courses" 
          value="42" 
          sub={`${approvals.length} pending approval`} 
          color="purple" 
          icon={<BookOpen size={16} />}
        />
        <StatCard 
          label="Monthly Revenue" 
          value="₹8.4L" 
          sub="Target: ₹10L" 
          color="green" 
          icon={<TrendingUp size={16} />}
        />
        <StatCard 
          label="System Load" 
          value="14%" 
          sub="CPU Usage" 
          color="yellow" 
          icon={<Activity size={16} />}
        />
      </div>

      <div className={styles.grid2}>
        <Card>
          <CardHeader title="Pending Approvals" action={<Button variant="ghost" size="sm" onClick={() => alert('Opening full approval management...')}>Manage All</Button>} />
          <CardBody noPad>
            {approvals.length > 0 ? approvals.map(item => (
              <div key={item.id} style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.type} • Requested by {item.applicant}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleAction(item.id, 'approve')}
                    style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer' }}
                    title="Approve"
                  >
                    <CheckCircle size={18} />
                  </button>
                  <button 
                    onClick={() => handleAction(item.id, 'reject')}
                    style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer' }}
                    title="Reject"
                  >
                    <XCircle size={18} />
                  </button>
                </div>
              </div>
            )) : (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
                No pending approvals.
              </div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Fleet Status" action={<Button variant="ghost" size="sm">Manage Fleet</Button>} />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ padding: '8px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px' }}>
                    <Plane size={18} color="#22c55e" />
                  </div>
                  <span style={{ fontSize: '14px', color: '#fff' }}>Operational Drones</span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>18/20</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ padding: '8px', background: 'rgba(234, 179, 8, 0.1)', borderRadius: '8px' }}>
                    <Activity size={18} color="#eab308" />
                  </div>
                  <span style={{ fontSize: '14px', color: '#fff' }}>Maintenance Alerts</span>
                </div>
                <Badge variant="yellow">2 High Priority</Badge>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Infrastructure Health" />
          <CardBody noPad>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontSize: '14px', color: 'var(--text)' }}>API Server</span>
              </div>
              <Badge variant="blue">Healthy</Badge>
            </div>
            <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontSize: '14px', color: 'var(--text)' }}>Database</span>
              </div>
              <Badge variant="blue">Healthy</Badge>
            </div>
          </CardBody>
        </Card>
      </div>

      <div style={{ marginTop: '24px' }}>
        <Card>
          <CardHeader title="Security & Access Logs" action={<Button variant="ghost" size="sm">Full Logs</Button>} />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px' }}>
                <Shield size={16} color="var(--accent)" />
                <span>SuperAdmin AL logged in from 182.168.1.42 (Hyderabad, India)</span>
                <span style={{ marginLeft: 'auto' }}>2 mins ago</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px' }}>
                <AlertTriangle size={16} color="#eab308" />
                <span>Multiple failed login attempts detected from IP 45.32.11.90 (Beijing, CN)</span>
                <span style={{ marginLeft: 'auto' }}>15 mins ago</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
