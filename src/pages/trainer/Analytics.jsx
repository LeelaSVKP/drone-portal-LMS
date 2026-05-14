import { TRAINER_STATS } from '../../data/mockData'
import { StatCard, Card, CardHeader, CardBody } from '../../components/shared/SharedComponents'
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts'
import styles from './TrainerPages.module.css'

// Mock data for charts
const enrollmentData = [
  { month: 'Jan', students: 45 },
  { month: 'Feb', students: 52 },
  { month: 'Mar', students: 48 },
  { month: 'Apr', students: 61 },
  { month: 'May', students: 55 },
  { month: 'Jun', students: 72 },
]

const coursePerformance = [
  { name: 'Aerial Cine', completions: 91, dropoff: 9 },
  { name: 'DGCA Regs', completions: 78, dropoff: 22 },
  { name: 'Drone Fund', completions: 68, dropoff: 32 },
  { name: 'FPV Racing', completions: 34, dropoff: 66 },
]

const studentLevels = [
  { name: 'Beginner', value: 45, color: '#00d4ff' },
  { name: 'Intermediate', value: 35, color: '#0083fe' },
  { name: 'Advanced', value: 20, color: '#10b981' },
]

export default function Analytics() {
  const chartStyles = {
    fontSize: 10,
    fontFamily: 'Inter, sans-serif',
    fill: 'rgba(255,255,255,0.5)'
  }

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div className={styles.title}>Analytics & Insights</div>
      </div>

      <div className={styles.stats}>
        <StatCard label="Total Enrollments" value={TRAINER_STATS.totalEnrollments} sub="+12% this month" color="blue" />
        <StatCard label="Completions" value={TRAINER_STATS.completions} sub="84% avg rate" color="green" />
        <StatCard label="Drop-off Rate" value={`${TRAINER_STATS.dropoffRate}%`} sub="-2% vs last month" color="yellow" />
        <StatCard label="Avg Rating" value={`${TRAINER_STATS.avgRating} ⭐`} sub="From 120 reviews" color="purple" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Enrollment Trend */}
        <Card>
          <CardHeader title="Enrollment Growth" />
          <CardBody style={{ minHeight: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto' }}>
            <LineChart width={400} height={250} data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={chartStyles} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={chartStyles} />
              <Tooltip 
                contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 12 }}
                itemStyle={{ color: '#00d4ff' }}
              />
              <Line type="monotone" dataKey="students" stroke="#00d4ff" strokeWidth={3} dot={{ fill: '#00d4ff', r: 4 }} />
            </LineChart>
          </CardBody>
        </Card>

        {/* Student Levels */}
        <Card>
          <CardHeader title="Skill Distribution" />
          <CardBody style={{ minHeight: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto' }}>
            <PieChart width={300} height={250}>
              <Pie
                data={studentLevels}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={8}
                dataKey="value"
              >
                {studentLevels.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 12 }} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </CardBody>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Course Comparison */}
        <Card>
          <CardHeader title="Course Performance Comparison" />
          <CardBody style={{ minHeight: 350, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto' }}>
            <BarChart width={500} height={300} data={coursePerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={chartStyles} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={chartStyles} />
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 12 }} />
              <Legend verticalAlign="top" align="right" />
              <Bar dataKey="completions" fill="#10b981" radius={[4, 4, 0, 0]} name="Completions %" />
              <Bar dataKey="dropoff" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Drop-off %" />
            </BarChart>
          </CardBody>
        </Card>

        {/* Quiz Avg */}
        <Card>
          <CardHeader title="Quiz Score Trends" />
          <CardBody style={{ minHeight: 350, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto' }}>
             <LineChart width={300} height={300} data={[
               { day: 'Mon', score: 72 },
               { day: 'Tue', score: 85 },
               { day: 'Wed', score: 78 },
               { day: 'Thu', score: 92 },
               { day: 'Fri', score: 88 },
             ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" tick={chartStyles} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={chartStyles} />
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 12 }} />
              <Line type="stepAfter" dataKey="score" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', r: 4 }} />
            </LineChart>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
