import { useState } from 'react'
import { Card, CardHeader, Table, Badge, Button, Modal } from '../../components/shared/SharedComponents'
import { Wrench, Battery, Settings, AlertTriangle, CheckCircle, Plus, Activity } from 'lucide-react'
import styles from './StudentDashboard.module.css'
import sharedStyles from '../../components/shared/SharedComponents.module.css'

export default function MaintenanceTracker() {
  const [items, setItems] = useState([
    { id: 1, component: 'Propellers (Set A)', type: 'Replacement', lastService: 'Apr 15, 2025', nextService: 'Jul 15, 2025', health: 85, status: 'good' },
    { id: 2, component: 'LiPo Battery #04', type: 'Cycle Test', lastService: 'May 02, 2025', nextService: 'May 16, 2025', health: 92, status: 'good' },
    { id: 3, component: 'Gimbal Motor', type: 'Calibration', lastService: 'Mar 10, 2025', nextService: 'Jun 10, 2025', health: 45, status: 'warning' },
    { id: 4, component: 'Firmware Update', type: 'Software', lastService: 'May 05, 2025', nextService: 'TBD', health: 100, status: 'optimal' },
  ])
  const [showModal, setShowModal] = useState(false)
  const [newRecord, setNewRecord] = useState({ component: '', type: 'Maintenance' })

  const handleAddRecord = () => {
    const record = {
      id: items.length + 1,
      component: newRecord.component || 'New Component',
      type: newRecord.type,
      lastService: new Date().toLocaleDateString(),
      nextService: 'TBD',
      health: 100,
      status: 'optimal'
    }
    setItems([record, ...items])
    setShowModal(false)
    setNewRecord({ component: '', type: 'Maintenance' })
  }

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
        <div>
          <div className={styles.title}>Maintenance Tracker</div>
        </div>
        <Button 
          onClick={() => setShowModal(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(0, 212, 255, 0.2)' }}
        >
          <Plus size={18} />
          <span>Add Service Record</span>
        </Button>
      </div>

      <div className={styles.statsGrid} style={{ marginBottom: '24px' }}>
        <Card>
          <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent3)' }}>
              <Activity size={24} />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Fleet Health</div>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>82.5%</div>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent4)' }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pending Issues</div>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>1</div>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(0, 212, 255, 0.1)', color: 'var(--accent)' }}>
              <Battery size={24} />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avg Cycles</div>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>42</div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Component Status & Service History" />
        <Table headers={['Component', 'Service Type', 'Last Service', 'Next Due', 'Health', 'Status']}>
          {items.map(item => (
            <tr key={item.id}>
              <td style={{ fontWeight: '600' }}>{item.component}</td>
              <td style={{ color: 'var(--text-muted)' }}>{item.type}</td>
              <td>{item.lastService}</td>
              <td>{item.nextService}</td>
              <td>
                <div style={{ width: '100px', height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ 
                    width: `${item.health}%`, 
                    height: '100%', 
                    background: item.health > 80 ? 'var(--accent3)' : item.health > 50 ? 'var(--accent)' : 'var(--danger)' 
                  }}></div>
                </div>
                <div style={{ fontSize: '10px', marginTop: '4px', color: 'var(--text-muted)' }}>{item.health}% Capacity</div>
              </td>
              <td>
                <Badge variant={item.status === 'optimal' || item.status === 'good' ? 'green' : 'yellow'}>
                  {item.status.toUpperCase()}
                </Badge>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card>
          <CardHeader title="Upcoming Maintenance" />
          <div style={{ padding: '16px' }}>
            <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent4)' }}>
                <Settings size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>Gimbal Recalibration</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Scheduled for June 10, 2025</div>
              </div>
              <Button size="sm" variant="ghost">Reschedule</Button>
            </div>
          </div>
        </Card>
        
        <Card>
          <CardHeader title="Battery Safety" />
          <div style={{ padding: '16px' }}>
             <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
               Remember to never discharge LiPo batteries below 3.2V per cell. Always store them in a fireproof bag at storage voltage (3.8V per cell).
             </p>
          </div>
        </Card>
      </div>

      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="Add Maintenance Record"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handleAddRecord}>Save Record</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>Component Name</label>
            <input 
              type="text" 
              placeholder="e.g., DJI Air 3 Propellers" 
              value={newRecord.component}
              onChange={(e) => setNewRecord({...newRecord, component: e.target.value})}
              style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>Service Type</label>
            <select 
              value={newRecord.type}
              onChange={(e) => setNewRecord({...newRecord, type: e.target.value})}
              style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }}
            >
              <option>Maintenance</option>
              <option>Repair</option>
              <option>Calibration</option>
              <option>Replacement</option>
              <option>Software Update</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>Notes</label>
            <textarea 
              placeholder="Any specific details..." 
              style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', minHeight: '80px' }}
            ></textarea>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function MaintenanceIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}
