import { useState } from 'react'
import { Card, CardHeader, Badge, Button } from '../../components/shared/SharedComponents'
import { CheckCircle2, Circle, Trophy, BookOpen, Plane, ShieldCheck, MapPin } from 'lucide-react'
import styles from './StudentDashboard.module.css'

export default function CertificationRoadmap() {
  const steps = [
    { id: 1, title: 'Ground School Theory', desc: 'Basics of aerodynamics, rules of the air, and drone components.', status: 'completed', icon: <BookOpen size={20} /> },
    { id: 2, title: 'DGCA Registration', desc: 'Applying for UIN and OAN registration on DigitalSky.', status: 'completed', icon: <ShieldCheck size={20} /> },
    { id: 3, title: 'Simulator Training', desc: '10+ hours of mandatory flight simulation practice.', status: 'in-progress', icon: <Plane size={20} /> },
    { id: 4, title: 'Field Practical (Nano/Micro)', desc: 'Hands-on flight training in controlled field environments.', status: 'pending', icon: <MapPin size={20} /> },
    { id: 5, title: 'Final Flight Skill Test', desc: 'Official examination by a DGCA-authorized flight instructor.', status: 'pending', icon: <Target size={20} /> },
    { id: 6, title: 'Commercial Pilot Certificate', desc: 'Official issuance of the Remote Pilot Certificate (RPC).', status: 'pending', icon: <Trophy size={20} /> },
  ]

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div style={{ flex: 1 }}>
          <div className={styles.title}>DGCA Certification Roadmap</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--accent)' }}>35%</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Overall Progress</div>
        </div>
      </div>

      <div style={{ position: 'relative', paddingLeft: '40px', marginTop: '20px' }}>
        {/* Timeline Line */}
        <div style={{
          position: 'absolute',
          left: '59px',
          top: '20px',
          bottom: '20px',
          width: '2px',
          background: 'linear-gradient(to bottom, var(--accent3), var(--border))',
          opacity: 0.3
        }}></div>

        {steps.map((step, index) => (
          <div key={step.id} style={{ marginBottom: '32px', position: 'relative' }}>
            {/* Step Node */}
            <div style={{
              position: 'absolute',
              left: '-32px',
              top: '4px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: step.status === 'completed' ? 'var(--accent3)' : step.status === 'in-progress' ? 'var(--surface)' : 'var(--surface)',
              border: `2px solid ${step.status === 'completed' ? 'var(--accent3)' : step.status === 'in-progress' ? 'var(--accent)' : 'var(--border)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: step.status === 'completed' ? '#0a0e1a' : step.status === 'in-progress' ? 'var(--accent)' : 'var(--text-muted)',
              zIndex: 2,
              boxShadow: step.status === 'in-progress' ? '0 0 15px rgba(0, 212, 255, 0.3)' : 'none'
            }}>
              {step.status === 'completed' ? <CheckCircle2 size={24} /> : step.icon}
            </div>

            <Card style={{
              marginLeft: '20px',
              background: step.status === 'in-progress' ? 'rgba(0, 212, 255, 0.03)' : 'var(--surface)',
              borderColor: step.status === 'in-progress' ? 'var(--accent)' : 'var(--border)'
            }}>
              <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', opacity: 0.5 }}>STEP 0{step.id}</span>
                    <Badge variant={step.status === 'completed' ? 'green' : step.status === 'in-progress' ? 'blue' : 'gray'}>
                      {step.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text)' }}>{step.title}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '1.5' }}>{step.desc}</div>
                </div>
                {step.status === 'in-progress' && (
                  <Button size="sm" onClick={() => alert('Resuming Simulator Training session...')}>Resume Task</Button>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

function Target({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}
