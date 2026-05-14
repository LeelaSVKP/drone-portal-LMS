import { useState } from 'react'
import { Card, CardHeader, CardBody, Button, Badge } from '../../components/shared/SharedComponents'
import { Settings, Globe, Bell, Shield, Database, Save, RefreshCw, CheckCircle2, Eye, EyeOff } from 'lucide-react'
import styles from '../student/StudentDashboard.module.css'

export default function SystemSettings() {
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(null)
  const [showKey, setShowKey] = useState(false)
  const [toggles, setToggles] = useState({
    maintenance: false,
    email: true,
    approval: true,
    reg: false,
    health: true
  })

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowToast('Settings saved successfully!')
      setTimeout(() => setShowToast(null), 3000)
    }, 1500)
  }

  const Toggle = ({ active, onClick }) => (
    <div 
      onClick={onClick}
      style={{ 
        width: '40px', 
        height: '20px', 
        background: active ? 'var(--accent)' : 'var(--border)', 
        borderRadius: '10px', 
        position: 'relative', 
        cursor: 'pointer',
        transition: 'all 0.3s'
      }}
    >
      <div style={{ 
        width: '16px', 
        height: '16px', 
        background: '#fff', 
        borderRadius: '50%', 
        position: 'absolute', 
        left: active ? '22px' : '2px', 
        top: '2px',
        transition: 'all 0.3s'
      }} />
    </div>
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

      <div className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div className={styles.title}>System Settings</div>
        </div>
        <Button 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '140px' }}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? <RefreshCw size={18} className="spin" /> : <Save size={18} />}
          <span>{loading ? 'Saving...' : 'Save Changes'}</span>
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '30px' }}>
        <Card>
          <CardHeader title="General Configuration" icon={<Globe size={20} color="var(--accent)" />} />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="field">
                <label style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px', display: 'block' }}>Platform Name</label>
                <input type="text" defaultValue="Akin Drone Academy" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', outline: 'none' }} onFocus={(e) => e.target.style.borderColor='var(--accent)'} onBlur={(e) => e.target.style.borderColor='var(--border)'} />
              </div>
              <div className="field">
                <label style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px', display: 'block' }}>Support Email</label>
                <input type="email" defaultValue="support@akinanalytics.com" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', outline: 'none' }} onFocus={(e) => e.target.style.borderColor='var(--accent)'} onBlur={(e) => e.target.style.borderColor='var(--border)'} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>Maintenance Mode</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Disable public access for updates</div>
                </div>
                <Toggle active={toggles.maintenance} onClick={() => handleToggle('maintenance')} />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Notification Settings" icon={<Bell size={20} color="var(--accent3)" />} />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {[
                { key: 'email', label: 'Email Notifications', desc: 'Send system alerts to admin email' },
                { key: 'approval', label: 'Course Approval Alerts', desc: 'Notify when trainer submits course' },
                { key: 'reg', label: 'New User Registration', desc: 'Alert on every new student signup' },
                { key: 'health', label: 'System Health Warnings', desc: 'Alert when latency exceeds 500ms' }
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{item.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                  <Toggle active={toggles[item.key]} onClick={() => handleToggle(item.key)} />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Backup & Data" icon={<Database size={20} color="var(--accent4)" />} />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>Automatic Backups</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Daily at 02:00 AM</div>
                </div>
                <Badge variant="blue">Enabled</Badge>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button variant="ghost" style={{ flex: 1, fontSize: '12px' }} onClick={() => alert('Starting SQL Dump...')}>Download Latest SQL</Button>
                <Button variant="ghost" style={{ flex: 1, fontSize: '12px' }} onClick={() => { setShowToast('System cache cleared!'); setTimeout(() => setShowToast(null), 3000); }}>Clear Cache</Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Security Keys" icon={<Shield size={20} color="#ef4444" />} />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="field">
                <label style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px', display: 'block' }}>Map API Key (Radar)</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type={showKey ? 'text' : 'password'} 
                    value="sk_test_51Mz9VnS90Akdn278V" 
                    readOnly 
                    style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', outline: 'none' }} 
                  />
                  <Button variant="ghost" size="sm" onClick={() => setShowKey(!showKey)}>
                    {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
