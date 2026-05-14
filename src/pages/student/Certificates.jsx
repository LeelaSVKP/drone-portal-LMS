import { Button } from '../../components/shared/SharedComponents'
import { useAuth } from '../../context/AuthContext'
import { useCourses } from '../../context/CourseContext'
import styles from './StudentPages.module.css'

export default function Certificates({ onNavigate }) {
  const { user } = useAuth()
  const { courses } = useCourses()

  const enrolled = courses.filter(c => c.enrolled)
  const completedCourses = enrolled.filter(c => c.progress === 100)
  const pendingCourses = enrolled.filter(c => c.progress > 0 && c.progress < 100)

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div className={styles.title}>My Certificates</div>
      </div>

      <div style={{ display: 'grid', gap: 16 }}>
        {completedCourses.map(course => (
          <div key={`cert-${course.id}`} className={styles.certBox}>
            <div className={styles.certSeal}>🏆</div>
            <div className={styles.certTitle}>Certificate of Completion</div>
            <div className={styles.certName}>{user?.name?.toUpperCase() || 'STUDENT'}</div>
            <div className={styles.certCourse}>has successfully completed <strong>{course.title}</strong></div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Issued: Today · Akin Analytics Drone Academy</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <Button variant="primary" size="sm" onClick={() => alert('Generating Digital Certificate PDF...')}>Download PDF</Button>
              <Button variant="ghost" size="sm" onClick={() => alert('Opening Share Dialog...')}>Share</Button>
            </div>
          </div>
        ))}

        {pendingCourses.map(course => (
          <div key={`pend-${course.id}`} className={styles.certBox} style={{ opacity: 0.6, borderColor: 'var(--border)' }}>
            <div className={styles.certSeal} style={{ background: 'var(--border)' }}>🔒</div>
            <div className={styles.certTitle}>Pending — Complete to Unlock</div>
            <div className={styles.certName} style={{ color: 'var(--text-muted)' }}>{course.title}</div>
            <div className={styles.certCourse} style={{ color: 'var(--text-muted)' }}>{course.progress}% complete · Finish to earn certificate</div>
            <div style={{ marginTop: 12 }}>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('courses')}>Continue Course</Button>
            </div>
          </div>
        ))}

        {enrolled.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)', background: 'var(--surface2)', borderRadius: 12 }}>
            Enroll in a course to start earning certificates!
          </div>
        )}
      </div>
    </div>
  )
}
