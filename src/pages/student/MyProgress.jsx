import { StatCard, Card, CardHeader, Table, ProgressBar, Badge } from '../../components/shared/SharedComponents'
import styles from './StudentPages.module.css'

export default function MyProgress() {
  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div className={styles.title}>My Progress</div>
        <div className={styles.subtitle}>Detailed analytics of your learning journey</div>
      </div>

      <div className={styles.stats}>
        <StatCard label="Total Hours" value="38h" color="blue" />
        <StatCard label="Avg Quiz Score" value="87%" color="green" />
        <StatCard label="Modules Done" value="23" color="yellow" />
        <StatCard label="Streak" value="12🔥" color="purple" />
      </div>

      <Card>
        <CardHeader title="Course Progress Overview" />
        <Table headers={['Course', 'Level', 'Progress', 'Score', 'Status']}>
          <tr>
            <td>Drone Fundamentals</td>
            <td><Badge variant="green">Beginner</Badge></td>
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 100 }}><ProgressBar value={72} /></div>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>72%</span>
              </div>
            </td>
            <td>89%</td>
            <td><Badge variant="yellow">In Progress</Badge></td>
          </tr>
          <tr>
            <td>Aerial Cinematography</td>
            <td><Badge variant="yellow">Intermediate</Badge></td>
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 100 }}><ProgressBar value={100} color="var(--accent3)" /></div>
                <span style={{ fontSize: 12, color: 'var(--accent3)' }}>100%</span>
              </div>
            </td>
            <td>92%</td>
            <td><Badge variant="green">Completed</Badge></td>
          </tr>
          <tr>
            <td>FPV Racing</td>
            <td><Badge variant="red">Advanced</Badge></td>
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 100 }}><ProgressBar value={35} /></div>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>35%</span>
              </div>
            </td>
            <td>85%</td>
            <td><Badge variant="yellow">In Progress</Badge></td>
          </tr>
          <tr>
            <td>Drone Mapping & GIS</td>
            <td><Badge variant="purple">Pro</Badge></td>
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 100 }}><ProgressBar value={0} /></div>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>0%</span>
              </div>
            </td>
            <td>—</td>
            <td><Badge variant="blue">Not Started</Badge></td>
          </tr>
        </Table>
      </Card>
    </div>
  )
}
