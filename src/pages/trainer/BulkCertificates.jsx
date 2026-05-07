import { useState } from 'react'
import { Card, CardHeader, Table, Badge, Button, Modal } from '../../components/shared/SharedComponents'
import { Award, CheckCircle, Send, Filter, Users, Download, ShieldCheck } from 'lucide-react'
import { STUDENTS } from '../../data/mockData'
import styles from './TrainerPages.module.css'
import sharedStyles from '../../components/shared/SharedComponents.module.css'

export default function BulkCertificates() {
  const [selectedStudents, setSelectedStudents] = useState([])
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const toggleStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter(sid => sid !== id))
    } else {
      setSelectedStudents([...selectedStudents, id])
    }
  }

  const handleBulkIssue = () => {
    setIsProcessing(true)
    // Mock processing delay
    setTimeout(() => {
      setIsProcessing(false)
      setIsDone(true)
    }, 2000)
  }

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div style={{ flex: 1 }}>
          <div className={styles.title}>Bulk Certificate Issuance</div>
          <div className={styles.subtitle}>Verify and issue digital Remote Pilot Certificates to multiple students at once.</div>
        </div>
        <Button 
          onClick={() => setShowConfirmModal(true)} 
          disabled={selectedStudents.length === 0}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Award size={18} />
          <span>Issue {selectedStudents.length} Certificates</span>
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <Card>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Eligible Students</div>
            <div style={{ fontSize: '24px', fontWeight: '800' }}>12</div>
          </div>
        </Card>
        <Card>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Avg Course Score</div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--accent3)' }}>88%</div>
          </div>
        </Card>
        <Card>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Selected</div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--accent)' }}>{selectedStudents.length}</div>
          </div>
        </Card>
        <Card>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Auto-Verify Status</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--accent3)', marginTop: '8px' }}>ACTIVE</div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader 
          title="Candidate List" 
          action={
            <Button size="sm" variant="ghost" onClick={() => setSelectedStudents(STUDENTS.map(s => s.id))}>Select All</Button>
          }
        />
        <Table headers={['', 'Pilot Name', 'Course', 'Exam Score', 'Field Hrs', 'Status']}>
          {STUDENTS.map(student => (
            <tr key={student.id} style={{ background: selectedStudents.includes(student.id) ? 'rgba(0, 212, 255, 0.05)' : 'transparent' }}>
              <td>
                <input 
                  type="checkbox" 
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => toggleStudent(student.id)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
              <td style={{ fontWeight: '600' }}>{student.name}</td>
              <td style={{ fontSize: '13px' }}>{student.course}</td>
              <td style={{ fontWeight: '700', color: student.progress > 80 ? 'var(--accent3)' : 'var(--text)' }}>{student.progress}%</td>
              <td>12.5 hrs</td>
              <td>
                <Badge variant={student.progress > 75 ? 'green' : 'yellow'}>
                  {student.progress > 75 ? 'ELIGIBLE' : 'PENDING'}
                </Badge>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <Modal 
        isOpen={showConfirmModal} 
        onClose={() => {
          setShowConfirmModal(false)
          setIsDone(false)
        }}
        title="Confirm Issuance"
        footer={
          !isDone ? (
            <>
              <Button variant="ghost" onClick={() => setShowConfirmModal(false)} disabled={isProcessing}>Cancel</Button>
              <Button onClick={handleBulkIssue} disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Confirm & Issue'}
              </Button>
            </>
          ) : (
            <Button onClick={() => setShowConfirmModal(false)}>Close Window</Button>
          )
        }
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          {!isProcessing && !isDone && (
            <>
              <div style={{ width: '64px', height: '64px', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', margin: '0 auto 20px' }}>
                <Award size={32} />
              </div>
              <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Issue {selectedStudents.length} Certificates?</div>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                This will generate official ADA Digital Pilot Certificates and send them to the students' registered emails and dashboards.
              </p>
            </>
          )}

          {isProcessing && (
            <>
              <div className="loader" style={{ margin: '0 auto 20px' }}></div>
              <div style={{ fontSize: '16px', fontWeight: '600' }}>Generating Certificates...</div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>Digitally signing and encrypting PDF files.</p>
            </>
          )}

          {isDone && (
            <>
              <div style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent3)', margin: '0 auto 20px' }}>
                <CheckCircle size={32} />
              </div>
              <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Success!</div>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                {selectedStudents.length} Remote Pilot Certificates have been successfully issued and delivered.
              </p>
            </>
          )}
        </div>
      </Modal>

      <style>{`
        .loader {
          border: 3px solid rgba(0, 212, 255, 0.1);
          border-top: 3px solid var(--accent);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
