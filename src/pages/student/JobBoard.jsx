import { useState } from 'react'
import { Card, CardHeader, Badge, Button, Modal } from '../../components/shared/SharedComponents'
import { Briefcase, MapPin, DollarSign, Clock, Search, Filter, Rocket, CheckCircle2 } from 'lucide-react'
import styles from './StudentDashboard.module.css'

export default function JobBoard({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedJob, setSelectedJob] = useState(null)
  const [appliedJobs, setAppliedJobs] = useState([])
  const [showSuccess, setShowSuccess] = useState(false)

  const jobs = [
    { 
      id: 1, 
      title: 'Commercial Drone Pilot', 
      company: 'Skye Air Mobility', 
      location: 'Gurugram, HR', 
      salary: '₹40k - ₹60k', 
      type: 'Full-time', 
      tags: ['Logistics', 'Micro/Small'],
      description: 'We are looking for an experienced drone pilot to handle our medical delivery operations. Must have a valid DGCA RPL and 100+ logged hours.'
    },
    { 
      id: 2, 
      title: 'Aerial Photographer', 
      company: 'Pixel Wings Studio', 
      location: 'Hyderabad, TS', 
      salary: '₹25k - ₹35k', 
      type: 'Contract', 
      tags: ['Cinematography', 'Mavic 3'],
      description: 'Join our creative team for high-end real estate and event cinematography. Proficiency in DJI Mavic 3 and post-processing is a must.'
    },
    { 
      id: 3, 
      title: 'Drone Survey Engineer', 
      company: 'Terra Maps GIS', 
      location: 'Bangalore, KA', 
      salary: '₹45k - ₹55k', 
      type: 'Full-time', 
      tags: ['Mapping', 'LiDAR'],
      description: 'Conducting large-scale topographic surveys using fixed-wing and multirotor drones. Experience with LiDAR sensors and photogrammetry software is required.'
    },
    { 
      id: 4, 
      title: 'Agriculture Drone Specialist', 
      company: 'Krishi Drone Tech', 
      location: 'Vijayawada, AP', 
      salary: '₹30k - ₹40k', 
      type: 'Full-time', 
      tags: ['Spraying', 'Agri-Tech'],
      description: 'Operate precision spraying drones for crop protection. You will work closely with local farmers to optimize pesticide application.'
    },
  ]

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleApply = (id) => {
    if (appliedJobs.includes(id)) return
    setAppliedJobs([...appliedJobs, id])
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className={styles.page + ' fade-in'}>
      {showSuccess && (
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
          <span style={{ fontWeight: '600' }}>Application Sent Successfully!</span>
        </div>
      )}

      <div className={styles.header} style={{ marginBottom: '30px' }}>
        <div style={{ flex: 1 }}>
          <div className={styles.title}>Pilot Opportunities</div>

          <div style={{
            position: 'relative',
            maxWidth: '500px',
            marginTop: '16px'
          }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--accent)',
                opacity: 0.7
              }}
            />
            <input
              type="text"
              placeholder="Search roles, companies, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 42px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {filteredJobs.length > 0 ? filteredJobs.map(job => (
          <Card key={job.id} style={{ transition: 'transform 0.2s' }} className="hover-lift">
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(0, 212, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)'
                }}>
                  <Briefcase size={24} />
                </div>
                <Badge variant={job.type === 'Full-time' ? 'blue' : 'yellow'}>{job.type}</Badge>
              </div>

              <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text)', marginBottom: '4px' }}>{job.title}</div>
              <div style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: '500', marginBottom: '16px' }}>{job.company}</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  <MapPin size={14} />
                  <span>{job.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  <DollarSign size={14} />
                  <span>{job.salary}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {job.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: '10px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border)'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Button 
                  size="sm" 
                  style={{ flex: 1 }} 
                  onClick={() => handleApply(job.id)}
                  disabled={appliedJobs.includes(job.id)}
                >
                  {appliedJobs.includes(job.id) ? 'Applied' : 'Apply Now'}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setSelectedJob(job)}>Details</Button>
              </div>
            </div>
          </Card>
        )) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>No matching jobs found</div>
            <div style={{ fontSize: '14px' }}>Try adjusting your search criteria.</div>
          </div>
        )}
      </div>

      <div style={{
        marginTop: '32px',
        padding: '24px',
        borderRadius: '16px',
        background: 'linear-gradient(90deg, rgba(0, 212, 255, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
        border: '1px solid rgba(0, 212, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
            <Rocket size={28} />
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>Get Job Ready with Advanced Training</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>Complete your DGCA certification to unlock higher paying roles.</div>
          </div>
        </div>
        <Button onClick={() => onNavigate && onNavigate('roadmap')}>View Roadmap</Button>
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        title={selectedJob?.title}
        footer={
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <Button variant="ghost" style={{ flex: 1 }} onClick={() => setSelectedJob(null)}>Close</Button>
            <Button 
              style={{ flex: 1 }} 
              onClick={() => { handleApply(selectedJob.id); setSelectedJob(null); }}
              disabled={appliedJobs.includes(selectedJob?.id)}
            >
              {appliedJobs.includes(selectedJob?.id) ? 'Applied' : 'Apply Now'}
            </Button>
          </div>
        }
      >
        {selectedJob && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--accent)' }}>{selectedJob.company}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{selectedJob.location}</div>
              </div>
              <Badge variant="blue">{selectedJob.type}</Badge>
            </div>
            
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#fff' }}>Job Description</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{selectedJob.description}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>Required Skills</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedJob.tags.map(tag => (
                  <Badge key={tag} variant="ghost">{tag}</Badge>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)', fontSize: '13px' }}>
              <DollarSign size={16} color="var(--accent3)" />
              <span style={{ color: '#fff', fontWeight: '600' }}>Estimated Salary: {selectedJob.salary}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
