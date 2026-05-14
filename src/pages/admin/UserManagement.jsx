import { useState } from 'react'
import { Card, CardHeader, CardBody, Button, Badge, Avatar, Modal } from '../../components/shared/SharedComponents'
import { Search, UserPlus, Mail, MoreVertical, Edit2, Trash2, Filter, CheckCircle2 } from 'lucide-react'
import styles from '../student/StudentDashboard.module.css'

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showToast, setShowToast] = useState(null)
  const [users, setUsers] = useState([
    { id: 1, name: 'Ravi Kumar', email: 'ravi@gmail.com', role: 'Student', status: 'Active', joined: '2025-01-10' },
    { id: 2, name: 'Priya Sharma', email: 'priya@akin.com', role: 'Trainer', status: 'Active', joined: '2024-11-22' },
    { id: 3, name: 'Amit Singh', email: 'amit@outlook.com', role: 'Student', status: 'Inactive', joined: '2025-02-15' },
    { id: 4, name: 'Vikram Mehta', email: 'vikram@drones.com', role: 'Trainer', status: 'Active', joined: '2024-12-05' },
    { id: 5, name: 'Sonia Ray', email: 'sonia@edu.com', role: 'Student', status: 'Active', joined: '2025-03-01' },
  ])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== id))
      setShowToast('User deleted successfully!')
      setTimeout(() => setShowToast(null), 3000)
    }
  }

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
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

      <div className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className={styles.title}>User Management</div>
        </div>
        <Button 
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          onClick={() => setShowAddModal(true)}
        >
          <UserPlus size={18} />
          <span>Add New User</span>
        </Button>
      </div>

      <Card style={{ marginTop: '30px' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '15px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
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
          <Button variant="ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} />
            <span>Filter</span>
          </Button>
        </div>

        <CardBody noPad>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>User</th>
                  <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Role</th>
                  <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Status</th>
                  <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Joined Date</th>
                  <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? filteredUsers.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} className="hover-row">
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Avatar initials={user.name.split(' ').map(n => n[0]).join('')} size={32} color1="var(--accent)" color2="var(--accent2)" />
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{user.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <Badge variant={user.role === 'Trainer' ? 'purple' : 'blue'}>{user.role}</Badge>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: user.status === 'Active' ? '#22c55e' : 'var(--text-muted)' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: user.status === 'Active' ? '#22c55e' : 'var(--text-muted)' }} />
                        {user.status}
                      </div>
                    </td>
                    <td style={{ padding: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>{user.joined}</td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => alert(`Editing ${user.name}`)}><Edit2 size={16} /></button>
                        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => alert(`Emailing ${user.email}`)}><Mail size={16} /></button>
                        <button style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', opacity: 0.7 }} onClick={() => handleDelete(user.id)}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No users found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="Add New User"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Full Name</label>
            <input type="text" placeholder="John Doe" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Email Address</label>
            <input type="email" placeholder="john@example.com" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Role</label>
            <select style={{ width: '100%', padding: '10px', background: '#1a1f2e', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }}>
              <option>Student</option>
              <option>Trainer</option>
              <option>Staff</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <Button variant="ghost" style={{ flex: 1 }} onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button style={{ flex: 1 }} onClick={() => { setShowAddModal(false); setShowToast('User added successfully!'); setTimeout(() => setShowToast(null), 3000); }}>Create User</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
