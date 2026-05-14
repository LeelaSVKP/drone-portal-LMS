import { useAuth } from '../../context/AuthContext'
import { useCourses } from '../../context/CourseContext'
import { StatCard, Card, CardHeader, CardBody } from '../../components/shared/SharedComponents'
import styles from './TrainerPages.module.css'

export default function TrainerDashboard() {
  const { user } = useAuth()
  const { courses } = useCourses()

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div className={styles.title}>Trainer Dashboard</div>
      </div>

      <div className={styles.stats}>
        <StatCard label="Active Students" value="34" sub="+3 this week" color="blue" />
        <StatCard label="Courses Active" value={courses.length.toString()} color="purple" />
        <StatCard label="Avg Completion" value="68%" color="green" />
        <StatCard label="Certs Issued" value="21" color="yellow" />
      </div>

      <div className={styles.grid2}>
        <Card>
          <CardHeader title="Recent Student Activity" />
          <CardBody style={{ padding: '12px 20px' }}>
            <div className={styles.studentRow}>
              <div className={styles.studentAv} style={{ background: 'rgba(0,212,255,0.2)', color: 'var(--accent)' }}>RK</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13 }}>Ravi Kumar</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>Completed Module 5 — Drone Fundamentals</div>
              </div>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>2h ago</span>
            </div>
            <div className={styles.studentRow}>
              <div className={styles.studentAv} style={{ background: 'rgba(245,158,11,0.2)', color: 'var(--accent4)' }}>AS</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13 }}>Anjali Singh</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>Scored 94% in Quiz — Aerial Photography</div>
              </div>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>5h ago</span>
            </div>
            <div className={styles.studentRow} style={{ border: 'none' }}>
              <div className={styles.studentAv} style={{ background: 'rgba(16,185,129,0.2)', color: 'var(--accent3)' }}>MR</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13 }}>Mohammed Rafi</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>Enrolled in FPV Racing Techniques</div>
              </div>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>1d ago</span>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Today's Schedule" />
          <CardBody style={{ padding: '12px 20px' }}>
            <div style={{ padding: '10px 0', borderBottom: '1px solid rgba(30,58,95,0.5)' }}>
              <div style={{ fontSize: 12, color: 'var(--accent)', marginBottom: 2 }}>11:00 AM</div>
              <div style={{ fontSize: 13 }}>Live Session — Drone Fundamentals Batch B</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>12 students · Zoom Link ready</div>
            </div>
            <div style={{ padding: '10px 0' }}>
              <div style={{ fontSize: 12, color: 'var(--accent4)', marginBottom: 2 }}>3:00 PM</div>
              <div style={{ fontSize: 13 }}>Assignment Review — Aerial Cinematography</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>8 submissions pending review</div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
