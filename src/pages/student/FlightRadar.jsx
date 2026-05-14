import { useState, useEffect } from 'react'
import { Card, CardHeader, Badge } from '../../components/shared/SharedComponents'
import { Radio, Navigation as NavIcon, Shield, Info, Map as MapIcon, Layers } from 'lucide-react'
import styles from './StudentDashboard.module.css'

export default function FlightRadar() {
  const [drones, setDrones] = useState([
    { id: 'DRN-01', x: 45, y: 30, alt: '120m', speed: '45km/h', status: 'active', pilot: 'Ravi K.' },
    { id: 'DRN-02', x: 60, y: 55, alt: '80m', speed: '32km/h', status: 'active', pilot: 'Anjali S.' },
    { id: 'DRN-03', x: 25, y: 70, alt: '150m', speed: '0km/h', status: 'hovering', pilot: 'Mohammed R.' },
  ])

  // Simple animation for drones
  useEffect(() => {
    const interval = setInterval(() => {
      setDrones(prev => prev.map(d => ({
        ...d,
        x: d.x + (Math.random() * 2 - 1),
        y: d.y + (Math.random() * 2 - 1)
      })))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header} style={{ marginBottom: '32px' }}>
        <div>
          <div className={styles.title}>Live Flight Radar</div>
          <div style={{ display: 'flex' }}>
            <Badge variant="green" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px' }}>
              <span style={{ width: '8px', height: '8px', background: '#fff', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></span>
              <span style={{ fontWeight: '700', letterSpacing: '0.5px' }}>LIVE: 3 DRONES ACTIVE</span>
            </Badge>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
        {/* Radar View */}
        <Card style={{ position: 'relative', overflow: 'hidden', minHeight: '500px', background: '#0a0e1a' }}>
          {/* Radar Circles */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', border: '1px solid rgba(0, 212, 255, 0.1)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', border: '1px solid rgba(0, 212, 255, 0.1)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '400px', height: '400px', border: '1px solid rgba(0, 212, 255, 0.1)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px', border: '1px solid rgba(0, 212, 255, 0.2)', borderRadius: '50%' }}></div>
          
          {/* Radar Sweep */}
          <div className="radar-sweep" style={{ 
            position: 'absolute', 
            left: '50%', 
            top: '50%', 
            width: '50%', 
            height: '2px', 
            background: 'linear-gradient(to right, rgba(0, 212, 255, 0.5), transparent)', 
            transformOrigin: 'left center',
            animation: 'radar-rotate 4s linear infinite'
          }}></div>

          {/* Drones */}
          {drones.map(d => (
            <div key={d.id} style={{ 
              position: 'absolute', 
              left: `${d.x}%`, 
              top: `${d.y}%`, 
              transition: 'all 2s linear',
              cursor: 'pointer'
            }} className="drone-node">
              <div style={{ width: '12px', height: '12px', background: 'var(--accent)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent)' }}></div>
              <div style={{ position: 'absolute', left: '16px', top: '-10px', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--border)', borderRadius: '4px', padding: '4px 8px', width: 'max-content', zIndex: 10 }}>
                <div style={{ fontSize: '10px', fontWeight: '800', color: '#fff' }}>{d.id}</div>
                <div style={{ fontSize: '9px', color: 'var(--accent3)' }}>Alt: {d.alt}</div>
              </div>
            </div>
          ))}

          {/* Map Coordinates Overlay */}
          <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
            LAT: 17.4483° N | LON: 78.3915° E
          </div>
        </Card>

        {/* Sidebar Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card>
            <CardHeader title="Flight Telemetry" />
            <div style={{ padding: '16px' }}>
              {drones.map(d => (
                <div key={d.id} style={{ marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700' }}>{d.id}</span>
                    <Badge variant="blue" style={{ fontSize: '9px' }}>{d.status}</Badge>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Pilot: {d.pilot}</div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--accent)' }}>Spd: {d.speed}</div>
                    <div style={{ fontSize: '11px', color: 'var(--accent4)' }}>Alt: {d.alt}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--danger)', marginBottom: '8px' }}>
                <Shield size={18} />
                <span style={{ fontSize: '14px', fontWeight: '700' }}>Geo-Fence Alert</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                All pilots are reminded to stay within the 2km radius of ADA Training Field. No-Fly Zone active at North Park.
              </p>
            </div>
          </Card>
        </div>
      </div>
      
      <style>{`
        @keyframes radar-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
        .drone-node:hover {
          z-index: 100;
        }
      `}</style>
    </div>
  )
}
