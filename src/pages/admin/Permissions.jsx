import { useState } from 'react'
import { Card, CardHeader, CardBody, Button, Badge } from '../../components/shared/SharedComponents'
import { Lock, Shield, UserCheck, ShieldAlert, Key, CheckCircle2 } from 'lucide-react'
import styles from '../student/StudentDashboard.module.css'

export default function Permissions() {
  const [showToast, setShowToast] = useState(null)

  const roles = [
    { name: 'Student', permissions: ['View Courses', 'Take Quizzes', 'Post Forum', 'View Profile'], users: 1120 },
    { name: 'Trainer', permissions: ['Manage Courses', 'Create Quizzes', 'Mark Attendance', 'View Analytics'], users: 45 },
    { name: 'Admin', permissions: ['Full Access', 'User Management', 'Security Audit', 'System Config'], users: 3 },
  ]

  const handleEdit = (role) => {
    setShowToast(`Editing permissions for ${role}...`)
    setTimeout(() => setShowToast(null), 3000)
  }

  const handleRevoke = () => {
    if (window.confirm('WARNING: This will log out ALL users immediately. Proceed?')) {
      setShowToast('All access revoked.')
      setTimeout(() => setShowToast(null), 3000)
    }
  }

  return (
    <div className={styles.page + ' fade-in'}>
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: showToast.includes('revoked') ? 'var(--danger)' : 'var(--accent3)',
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
        <div className={styles.title}>Role Permissions</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginTop: '30px' }}>
        {roles.map(role => (
          <Card key={role.name}>
            <CardHeader 
              title={`${role.name} Role`} 
              icon={<Shield size={20} color="var(--accent)" />}
              action={<Button variant="ghost" size="sm" onClick={() => handleEdit(role.name)}>Edit Permissions</Button>}
            />
            <CardBody>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flex: 1 }}>
                  {role.permissions.map(p => (
                    <div key={p} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      background: 'rgba(255,255,255,0.03)', 
                      padding: '8px 12px', 
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '13px',
                      color: '#fff'
                    }}>
                      <UserCheck size={14} color="#22c55e" />
                      {p}
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: 'right', minWidth: '120px' }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>{role.users}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Assigned Users</div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: '30px' }}>
        <Card style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
          <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '12px' }}>
              <ShieldAlert size={24} color="#ef4444" />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>Security Enforcement</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Any changes to these permissions will take effect immediately for all active sessions.</div>
            </div>
            <Button variant="ghost" style={{ marginLeft: 'auto', color: '#ef4444' }} onClick={handleRevoke}>Revoke All Access</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
