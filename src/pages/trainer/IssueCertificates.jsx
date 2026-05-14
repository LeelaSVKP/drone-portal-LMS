import { useState } from 'react'
import { CERT_PENDING } from '../../data/mockData'
import { Card, CardHeader, Table, Button } from '../../components/shared/SharedComponents'
import styles from './TrainerPages.module.css'

export default function IssueCertificates() {
  const [certs, setCerts] = useState(CERT_PENDING.map(c => ({ ...c, issued: false })))

  const handleIssue = (id) => {
    setCerts(prev => prev.map(c => c.id === id ? { ...c, issued: true } : c))
  }

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div className={styles.title}>Issue Certificates</div>
      </div>

      <Card>
        <CardHeader title="Ready for Certification" />
        <Table headers={['Student', 'Course', 'Score', 'Completed', 'Action']}>
          {certs.map(cert => (
            <tr key={cert.id}>
              <td>{cert.student}</td>
              <td>{cert.course}</td>
              <td style={{ color: cert.score >= 80 ? 'var(--accent3)' : 'var(--accent4)' }}>
                {cert.score}%
              </td>
              <td>{cert.completedDate}</td>
              <td>
                <Button 
                  variant={cert.issued ? 'ghost' : 'success'} 
                  size="sm" 
                  disabled={cert.issued}
                  onClick={() => handleIssue(cert.id)}
                >
                  {cert.issued ? 'Issued ✓' : 'Issue Certificate'}
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}
