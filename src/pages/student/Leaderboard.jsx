import { Card, CardHeader, Table, Badge, Avatar } from '../../components/shared/SharedComponents'
import { Trophy, Medal, Target, TrendingUp } from 'lucide-react'
import styles from './StudentDashboard.module.css'

export default function Leaderboard() {
  const leaders = [
    { rank: 1, name: 'Ravi Kumar', points: 2450, courses: 4, badges: 12, color: '#00d4ff', avatar: 'RK' },
    { rank: 2, name: 'Anjali Singh', points: 2280, courses: 3, badges: 10, color: '#f59e0b', avatar: 'AS' },
    { rank: 3, name: 'Suma Reddy', points: 2100, courses: 5, badges: 8, color: '#7c3aed', avatar: 'SR' },
    { rank: 4, name: 'Mohammed Rafi', points: 1950, courses: 2, badges: 14, color: '#10b981', avatar: 'MR' },
    { rank: 5, name: 'Kiran Babu', points: 1820, courses: 3, badges: 6, color: '#ef4444', avatar: 'KB' },
    { rank: 6, name: 'Lakshmi Devi', points: 1750, courses: 4, badges: 5, color: '#00d4ff', avatar: 'LD' },
  ]

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Trophy size={20} color="#ffd700" />
      case 2: return <Medal size={20} color="#c0c0c0" />
      case 3: return <Medal size={20} color="#cd7f32" />
      default: return <span style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '14px' }}>{rank}</span>
    }
  }

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div className={styles.title}>Pilot Leaderboard</div>
      </div>

      <div className={styles.grid2} style={{ marginBottom: '24px' }}>
        <Card>
          <div style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Your Current Rank</div>
            <div style={{ fontSize: '48px', fontWeight: '800', color: 'var(--accent)' }}>#4</div>
            <div style={{ fontSize: '14px', color: 'var(--accent3)', marginTop: '4px' }}>↑ 2 spots this week</div>
          </div>
        </Card>
        <Card>
          <div style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Total XP Points</div>
            <div style={{ fontSize: '48px', fontWeight: '800', color: 'var(--accent4)' }}>1,950</div>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>Next level at 2,000 XP</div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader 
          title="Global Rankings" 
          action={
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="blue">Weekly</Badge>
              <Badge variant="gray">All Time</Badge>
            </div>
          } 
        />
        <Table headers={['Rank', 'Pilot', 'XP Points', 'Courses', 'Badges', 'Trend']}>
          {leaders.map(p => (
            <tr key={p.rank} style={{ background: p.rank === 4 ? 'rgba(0, 212, 255, 0.05)' : 'transparent' }}>
              <td>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {getRankIcon(p.rank)}
                </div>
              </td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    background: `${p.color}33`, 
                    color: p.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {p.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{p.name} {p.rank === 4 && <Badge variant="blue" style={{ fontSize: '9px', padding: '1px 4px', marginLeft: '4px' }}>YOU</Badge>}</div>
                  </div>
                </div>
              </td>
              <td style={{ fontWeight: '700', color: 'var(--text)' }}>{p.points.toLocaleString()}</td>
              <td style={{ color: 'var(--text-muted)' }}>{p.courses}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={14} color="var(--accent4)" fill="var(--accent4)" />
                  <span>{p.badges}</span>
                </div>
              </td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: p.rank % 2 === 0 ? 'var(--accent3)' : 'var(--text-muted)' }}>
                  <TrendingUp size={14} />
                  <span style={{ fontSize: '12px' }}>+{Math.floor(Math.random() * 10)}%</span>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}

function Star({ size, color, fill }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
