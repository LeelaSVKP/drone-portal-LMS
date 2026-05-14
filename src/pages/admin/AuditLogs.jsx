import { useState } from 'react'
import { Card, CardHeader, CardBody, Button, Badge, Modal } from '../../components/shared/SharedComponents'
import { Shield, Search, Download, Filter, Eye, User, Lock, Trash2, Edit, CheckCircle } from 'lucide-react'
import styles from '../student/StudentDashboard.module.css'

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [showToast, setShowToast] = useState(null)

  const logs = [
    { id: 1, event: 'User Login', user: 'Super Admin', role: 'Admin', details: 'Login from IP 182.168.1.42', time: '2025-05-12 14:20:10', type: 'security' },
    { id: 2, event: 'Course Deleted', user: 'Admin Sarah', role: 'Admin', details: 'Removed "Intro to FPV (Legacy)"', time: '2025-05-12 13:45:22', type: 'action' },
    { id: 3, event: 'Permission Change', user: 'Super Admin', role: 'Admin', details: 'Upgraded Trainer Rahul to Senior Trainer', time: '2025-05-12 11:30:05', type: 'security' },
    { id: 4, event: 'Payment Success', user: 'Student Ravi', role: 'Student', details: 'Course Purchase: Advanced Aerodynamics (₹4,999)', time: '2025-05-12 10:15:00', type: 'finance' },
    { id: 5, event: 'Failed Login', user: 'Unknown', role: 'N/A', details: 'Invalid password attempt for account: vikram@drones.com', time: '2025-05-12 09:12:45', type: 'security' },
    { id: 6, event: 'Maintenance Log', user: 'Staff Anjali', role: 'Staff', details: 'Updated maintenance record for DRN-002', time: '2025-05-12 08:50:30', type: 'action' },
  ]

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = category === 'all' || log.type === category;
    
    return matchesSearch && matchesCategory;
  })

  const handleExport = () => {
    setShowToast('Audit logs exported as CSV successfully!')
    setTimeout(() => setShowToast(null), 3000)
    console.log('Exporting logs:', filteredLogs)
  }

  const getLogIcon = (type) => {
    switch (type) {
      case 'security': return <Shield size={16} color="#ef4444" />
      case 'action': return <Edit size={16} color="var(--accent)" />
      case 'finance': return <Badge variant="green" style={{ padding: '4px' }}>₹</Badge>
      default: return <Eye size={16} />
    }
  }

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
          <CheckCircle size={20} />
          <span style={{ fontWeight: '600' }}>{showToast}</span>
        </div>
      )}

      <div className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className={styles.title}>System Audit Trail</div>
        </div>
        <Button 
          variant="ghost" 
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          onClick={handleExport}
        >
          <Download size={18} />
          <span>Export Logs</span>
        </Button>
      </div>

      <Card style={{ marginTop: '24px' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Filter by event, user, or details..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 10px 10px 38px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Filter size={16} color="var(--text-muted)" />
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                background: '#1a1f2e',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: '#fff',
                padding: '8px 12px',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              <option value="all">All Categories</option>
              <option value="security">Security Events</option>
              <option value="action">Admin Actions</option>
              <option value="finance">Financial Logs</option>
            </select>
          </div>
        </div>

        <CardBody noPad>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Event</th>
                  <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Performed By</th>
                  <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Details</th>
                  <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length > 0 ? filteredLogs.map(log => (
                  <tr key={log.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} className="hover-row">
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {getLogIcon(log.type)}
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{log.event}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff' }}>{log.user}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{log.role}</div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '400px' }}>{log.details}</div>
                    </td>
                    <td style={{ padding: '16px', fontSize: '13px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {log.time}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No logs match your search criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
        <div style={{ padding: '16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center' }}>
          <Button variant="ghost" size="sm">Load Older Logs</Button>
        </div>
      </Card>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
