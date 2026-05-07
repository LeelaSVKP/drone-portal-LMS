import { useState } from 'react'
import { Card, CardHeader, Table, Badge, Button, Modal } from '../../components/shared/SharedComponents'
import { Plane, Clock, MapPin, Calendar as CalendarIcon, Plus, Info } from 'lucide-react'
import styles from './StudentDashboard.module.css' // Reusing some dashboard layout styles
import sharedStyles from '../../components/shared/SharedComponents.module.css'

export default function FlightLogbook() {
  const [logs, setLogs] = useState([
    { id: 1, date: 'May 04, 2025', drone: 'DJI Mavic 3 Pro', duration: '45 min', location: 'Hyderabad North Field', purpose: 'Training', status: 'verified' },
    { id: 2, date: 'May 02, 2025', drone: 'DJI Mavic 3 Pro', duration: '30 min', location: 'Gachibowli Stadium', purpose: 'Photography', status: 'verified' },
    { id: 3, date: 'Apr 28, 2025', drone: 'FPV Custom Quad', duration: '15 min', location: 'Open Park', purpose: 'Racing Practice', status: 'pending' },
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [newLog, setNewLog] = useState({
    date: new Date().toISOString().split('T')[0],
    drone: 'DJI Mavic 3 Pro',
    duration: '',
    location: '',
    purpose: 'Training'
  })

  const handleAddLog = (e) => {
    e.preventDefault()
    const log = {
      id: logs.length + 1,
      ...newLog,
      status: 'pending'
    }
    setLogs([log, ...logs])
    setShowAddModal(false)
  }

  const totalMinutes = logs.reduce((acc, log) => acc + parseInt(log.duration), 0)
  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMins = totalMinutes % 60

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className={styles.title}>Pilot Logbook</div>
          <div className={styles.subtitle}>Maintain your official record of flight hours and drone operations.</div>
        </div>
        <Button onClick={() => setShowAddModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} />
          <span>Log New Flight</span>
        </Button>
      </div>

      <div className={styles.statsGrid} style={{ marginBottom: '24px' }}>
        <Card>
          <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '12px', color: 'var(--accent)' }}>
              <Clock size={24} />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Flight Time</div>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>{totalHours}h {remainingMins}m</div>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', color: 'var(--accent3)' }}>
              <Plane size={24} />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Sorties</div>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>{logs.length}</div>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', color: 'var(--accent4)' }}>
              <MapPin size={24} />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Unique Locations</div>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>{[...new Set(logs.map(l => l.location))].length}</div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Recent Flight Logs" />
        <Table headers={['Date', 'Drone Model', 'Duration', 'Location', 'Purpose', 'Status']}>
          {logs.map(log => (
            <tr key={log.id}>
              <td style={{ fontSize: '13px', fontWeight: '500' }}>{log.date}</td>
              <td style={{ fontSize: '13px' }}>{log.drone}</td>
              <td style={{ fontSize: '13px' }}>{log.duration}</td>
              <td style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{log.location}</td>
              <td style={{ fontSize: '13px' }}>
                <Badge variant="blue">{log.purpose}</Badge>
              </td>
              <td>
                <Badge variant={log.status === 'verified' ? 'green' : 'yellow'}>
                  {log.status.toUpperCase()}
                </Badge>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(0, 212, 255, 0.05)', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start', border: '1px solid rgba(0, 212, 255, 0.1)' }}>
        <Info size={20} color="var(--accent)" style={{ marginTop: '2px' }} />
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
          <strong>Note:</strong> Logs are marked as "Pending" until verified by a trainer. Verified logs can be exported as a DGCA-compliant PDF for certification requirements.
        </p>
      </div>

      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="Log New Flight"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={handleAddLog}>Save Log Entry</Button>
          </>
        }
      >
        <form onSubmit={handleAddLog}>
          <div className={sharedStyles.formGroup}>
            <label className={sharedStyles.label}>Date of Flight</label>
            <input 
              className={sharedStyles.input} 
              type="date" 
              value={newLog.date}
              onChange={(e) => setNewLog({...newLog, date: e.target.value})}
              required
            />
          </div>
          <div className={sharedStyles.formGroup}>
            <label className={sharedStyles.label}>Drone Model</label>
            <select 
              className={sharedStyles.select}
              value={newLog.drone}
              onChange={(e) => setNewLog({...newLog, drone: e.target.value})}
            >
              <option>DJI Mavic 3 Pro</option>
              <option>DJI Air 3</option>
              <option>FPV Custom Quad</option>
              <option>Nano Drone S1</option>
            </select>
          </div>
          <div className={sharedStyles.formGroup}>
            <label className={sharedStyles.label}>Duration (minutes)</label>
            <input 
              className={sharedStyles.input} 
              type="number" 
              placeholder="e.g. 30"
              value={newLog.duration}
              onChange={(e) => setNewLog({...newLog, duration: e.target.value + ' min'})}
              required
            />
          </div>
          <div className={sharedStyles.formGroup}>
            <label className={sharedStyles.label}>Location</label>
            <input 
              className={sharedStyles.input} 
              type="text" 
              placeholder="e.g. North Field Training Zone"
              value={newLog.location}
              onChange={(e) => setNewLog({...newLog, location: e.target.value})}
              required
            />
          </div>
          <div className={sharedStyles.formGroup}>
            <label className={sharedStyles.label}>Purpose</label>
            <select 
              className={sharedStyles.select}
              value={newLog.purpose}
              onChange={(e) => setNewLog({...newLog, purpose: e.target.value})}
            >
              <option>Training</option>
              <option>Photography</option>
              <option>Racing Practice</option>
              <option>Survey/Mapping</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  )
}
