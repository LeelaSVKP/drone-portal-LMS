import { useState } from 'react'
import { Card, CardHeader, CardBody, Button, Badge, Modal, StatCard } from '../../components/shared/SharedComponents'
import { Plane, Battery, Activity, AlertTriangle, PenTool, Plus, Search, Filter, CheckCircle2, Trash2, Cpu, Gauge, Zap } from 'lucide-react'
import styles from '../student/StudentDashboard.module.css'

export default function FleetManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDiagnosticsModal, setShowDiagnosticsModal] = useState(false)
  const [showLogsModal, setShowLogsModal] = useState(false)
  const [selectedDrone, setSelectedDrone] = useState(null)
  const [showToast, setShowToast] = useState(null)
  
  const [newDrone, setNewDrone] = useState({ model: '', category: 'Training' })

  const [drones, setDrones] = useState([
    { id: 'DRN-001', model: 'DJI Mavic 3 Pro', category: 'Training', status: 'Active', battery: 92, flightHours: 124.5, lastMaintenance: '2025-04-15' },
    { id: 'DRN-002', model: 'DJI Matrice 300 RTK', category: 'Industrial', status: 'Maintenance', battery: 45, flightHours: 312.0, lastMaintenance: '2025-05-10' },
    { id: 'DRN-003', model: 'Autel EVO II', category: 'Mapping', status: 'Active', battery: 88, flightHours: 89.2, lastMaintenance: '2025-04-20' },
    { id: 'DRN-004', model: 'Skydio X2', category: 'Surveillance', status: 'Retired', battery: 12, flightHours: 450.8, lastMaintenance: '2025-02-12' },
    { id: 'DRN-005', model: 'DJI Air 3', category: 'Training', status: 'Active', battery: 98, flightHours: 12.4, lastMaintenance: '2025-05-01' },
  ])

  const handleAddDrone = () => {
    if (!newDrone.model) return alert('Please enter a model name')
    const id = `DRN-00${drones.length + 1}`
    const droneToAdd = {
      id,
      ...newDrone,
      status: 'Active',
      battery: 100,
      flightHours: 0,
      lastMaintenance: new Date().toISOString().split('T')[0]
    }
    setDrones([...drones, droneToAdd])
    setShowAddModal(false)
    setNewDrone({ model: '', category: 'Training' })
    triggerToast('New drone added to fleet!')
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to decommission this drone?')) {
      setDrones(drones.filter(d => d.id !== id))
      triggerToast('Drone removed from active fleet')
    }
  }

  const triggerToast = (msg) => {
    setShowToast(msg)
    setTimeout(() => setShowToast(null), 3000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#22c55e'
      case 'Maintenance': return '#eab308'
      case 'Retired': return '#ef4444'
      default: return 'var(--text-muted)'
    }
  }

  const getBatteryColor = (level) => {
    if (level > 70) return '#22c55e'
    if (level > 30) return '#eab308'
    return '#ef4444'
  }

  const filteredDrones = drones.filter(d => 
    d.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.id.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div className={styles.title}>Drone Fleet Management</div>
        </div>
        <Button 
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} />
          <span>Add New Drone</span>
        </Button>
      </div>

      <div className={styles.statsGrid} style={{ marginTop: '24px' }}>
        <StatCard 
          label="Total Fleet" 
          value={drones.length} 
          sub="Across 4 categories" 
          color="blue" 
          icon={<Plane size={16} />}
        />
        <StatCard 
          label="Operational" 
          value={drones.filter(d => d.status === 'Active').length} 
          sub="Ready for flight" 
          color="green" 
          icon={<CheckCircle2 size={16} />}
        />
        <StatCard 
          label="Maintenance" 
          value={drones.filter(d => d.status === 'Maintenance').length} 
          sub="Requires attention" 
          color="yellow" 
          icon={<PenTool size={16} />}
        />
        <StatCard 
          label="Avg. Battery" 
          value={`${drones.length > 0 ? Math.round(drones.reduce((acc, d) => acc + d.battery, 0) / drones.length) : 0}%`} 
          sub="System wide" 
          color="purple" 
          icon={<Battery size={16} />}
        />
      </div>

      <Card style={{ marginTop: '24px' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '15px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by model or ID..." 
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
                  <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Drone Model</th>
                  <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Category</th>
                  <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Status</th>
                  <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Battery</th>
                  <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Flight Hours</th>
                  <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrones.length > 0 ? filteredDrones.map(drone => (
                  <tr key={drone.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} className="hover-row">
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                          <Plane size={20} color="var(--accent)" />
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{drone.model}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ID: {drone.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <Badge variant="blue">{drone.category}</Badge>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: getStatusColor(drone.status) }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: getStatusColor(drone.status) }} />
                        {drone.status}
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '60px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${drone.battery}%`, height: '100%', background: getBatteryColor(drone.battery) }} />
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{drone.battery}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px', fontSize: '13px', color: 'var(--text)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Activity size={14} color="var(--text-muted)" />
                        {drone.flightHours} hrs
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button 
                          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }} 
                          onClick={() => { setSelectedDrone(drone); setShowLogsModal(true); }}
                          title="Service Logs"
                          className="action-btn"
                        >
                          <PenTool size={18} />
                        </button>
                        <button 
                          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }} 
                          onClick={() => { setSelectedDrone(drone); setShowDiagnosticsModal(true); }}
                          title="Diagnostics"
                          className="action-btn"
                        >
                          <Activity size={18} />
                        </button>
                        <button 
                          style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', opacity: 0.7, transition: 'opacity 0.2s' }} 
                          onClick={() => handleDelete(drone.id)}
                          title="Decommission"
                          className="action-btn"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No drones found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Add Modal */}
      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="Add New Asset"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Model Name</label>
            <input 
              type="text" 
              placeholder="e.g. DJI Phantom 4" 
              value={newDrone.model}
              onChange={(e) => setNewDrone({...newDrone, model: e.target.value})}
              style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Category</label>
            <select 
              value={newDrone.category}
              onChange={(e) => setNewDrone({...newDrone, category: e.target.value})}
              style={{ width: '100%', padding: '10px', background: '#1a1f2e', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }}
            >
              <option>Training</option>
              <option>Industrial</option>
              <option>Mapping</option>
              <option>Surveillance</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <Button variant="ghost" style={{ flex: 1 }} onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button style={{ flex: 1 }} onClick={handleAddDrone}>Register Asset</Button>
          </div>
        </div>
      </Modal>

      {/* Diagnostics Modal */}
      <Modal 
        isOpen={showDiagnosticsModal} 
        onClose={() => setShowDiagnosticsModal(false)}
        title={`Diagnostics: ${selectedDrone?.id}`}
      >
        {selectedDrone && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '20px', background: 'rgba(0, 212, 255, 0.05)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                <Cpu size={40} color="var(--accent)" style={{ animation: 'pulse 2s infinite' }} />
              </div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>System Scan Complete</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Hardware version 4.2.1 | Firmware v8.0.5</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <Gauge size={14} /> ESC Status
                </div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#22c55e' }}>Normal</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <Zap size={14} /> GPS Lock
                </div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#22c55e' }}>14 Satellites</div>
              </div>
            </div>

            <div style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '10px' }}>Subsystem Health</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>Propulsion</span>
                  <span style={{ color: '#22c55e' }}>98%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>IMU Sensor</span>
                  <span style={{ color: '#22c55e' }}>100%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>Camera Gimbal</span>
                  <span style={{ color: selectedDrone.status === 'Maintenance' ? '#eab308' : '#22c55e' }}>{selectedDrone.status === 'Maintenance' ? 'Re-calibrating' : 'Operational'}</span>
                </div>
              </div>
            </div>

            <Button onClick={() => setShowDiagnosticsModal(false)}>Close Diagnostics</Button>
          </div>
        )}
      </Modal>

      {/* Maintenance Logs Modal */}
      <Modal 
        isOpen={showLogsModal} 
        onClose={() => setShowLogsModal(false)}
        title={`Service Logs: ${selectedDrone?.id}`}
      >
        {selectedDrone && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderLeft: '3px solid var(--accent3)', borderRadius: '4px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#fff' }}>Periodic Inspection</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{selectedDrone.lastMaintenance} • Tech: Rajesh V.</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Props replaced, motor cleaning complete. No issues found.</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderLeft: '3px solid var(--accent)', borderRadius: '4px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#fff' }}>Firmware Update</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>2025-03-22 • Auto-Update</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Upgraded to v8.0.5. Enhanced obstacle avoidance patterns.</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderLeft: '3px solid var(--accent)', borderRadius: '4px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#fff' }}>Compass Calibration</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>2025-02-10 • Tech: Sneha K.</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="ghost" style={{ flex: 1 }} onClick={() => setShowLogsModal(false)}>Close</Button>
              <Button style={{ flex: 1 }} onClick={() => triggerToast('New log entry created')}>Log Entry</Button>
            </div>
          </div>
        )}
      </Modal>

      <style>{`
        .action-btn:hover {
          color: var(--accent) !important;
          transform: translateY(-2px);
        }
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
