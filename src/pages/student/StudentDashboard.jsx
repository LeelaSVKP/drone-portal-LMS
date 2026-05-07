import { useAuth } from '../../context/AuthContext'
import { useCourses } from '../../context/CourseContext'
import { useQuizzes } from '../../context/QuizContext'
import { ACHIEVEMENTS } from '../../data/mockData'
import { StatCard, Card, CardHeader, CardBody, Button, ProgressBar } from '../../components/shared/SharedComponents'
import {
  Medal, Zap, Target, Rocket, Diamond, Star,
  Plane, Flag, Award, BookOpen, Clock, TrendingUp, Bell, ChevronRight
} from 'lucide-react'
import styles from './StudentDashboard.module.css'
import WeatherWidget from '../../components/shared/WeatherWidget'
import { ANNOUNCEMENTS } from '../../data/mockData'
export default function StudentDashboard({ onNavigate }) {
  const { user } = useAuth()
  const { courses, updateCourseProgress } = useCourses()
  const { getPendingQuizzes, getCompletedQuizzes } = useQuizzes()
  
  const enrolledCourses = courses.filter((c) => c.enrolled)
  const inProgress = enrolledCourses.filter((c) => c.progress > 0 && c.progress < 100)
  
  const pendingQuizzes = getPendingQuizzes()
  const completedQuizzes = getCompletedQuizzes()
  
  const avgQuizScore = completedQuizzes.length > 0 
    ? Math.round(completedQuizzes.reduce((acc, q) => acc + q.score, 0) / completedQuizzes.length) 
    : 0

  const getCourseIcon = (id) => {
    switch (id) {
      case 'c1': return <Plane size={20} color="var(--accent)" />
      case 'c3': return <Flag size={20} color="var(--accent4)" />
      default: return <BookOpen size={20} color="var(--accent)" />
    }
  }

  const getAchievementIcon = (id, earned, color) => {
    const props = { size: 28, color: earned ? color : 'var(--muted)', strokeWidth: 2 }
    switch (id) {
      case 'a1': return <Medal {...props} />
      case 'a2': return <Zap {...props} />
      case 'a3': return <Target {...props} />
      case 'a4': return <Rocket {...props} />
      case 'a5': return <Diamond {...props} />
      case 'a6': return <Star {...props} />
      default: return <Award {...props} />
    }
  }

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div className={styles.title}>Welcome back, {user?.name?.split(' ')[0]}!</div>
        <div className={styles.subtitle}>Your drone learning journey — today is a great day to fly higher.</div>
      </div>

      <div className={styles.statsGrid}>
        <StatCard 
          label="Courses Enrolled" 
          value={enrolledCourses.length.toString()} 
          sub={`${inProgress.length} in progress`} 
          color="blue" 
          icon={<BookOpen size={16} />}
        />
        <StatCard 
          label="Hours Flown" 
          value="38h" 
          sub="This month: 12h" 
          color="green" 
          icon={<Clock size={16} />}
        />
        <StatCard 
          label="Quiz Score" 
          value={`${avgQuizScore}%`} 
          sub="Avg across all" 
          color="yellow" 
          icon={<TrendingUp size={16} />}
        />
        <StatCard 
          label="Certificates" 
          value="2" 
          sub="1 pending" 
          color="purple" 
          icon={<Award size={16} />}
        />
      </div>

      <div className={styles.grid2}>
        <Card>
          <CardHeader title="Continue Learning" action={<Button variant="primary" size="sm" onClick={() => onNavigate('courses')}>View all</Button>} />
          <CardBody noPad>
            {inProgress.length > 0 ? inProgress.map((c) => (
              <div 
                key={c.id} 
                className={styles.courseRow} 
                style={{ cursor: 'pointer' }}
                onClick={() => updateCourseProgress(c.id, 25)}
              >
                <div className={styles.courseRowIcon}>
                  {getCourseIcon(c.id)}
                </div>
                <div className={styles.courseRowInfo}>
                  <div className={styles.courseRowTop}>
                    <span className={styles.courseRowTitle}>{c.title}</span>
                    <span className={styles.courseRowPct} style={{ color: c.progress > 50 ? 'var(--accent3)' : 'var(--accent4)' }}>{c.progress}%</span>
                  </div>
                  <ProgressBar value={c.progress} />
                  <div className={styles.courseRowSub}>{c.currentModule}</div>
                </div>
              </div>
            )) : (
              <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
                You have no courses in progress. Explore <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('browse'); }} style={{ color: 'var(--accent)' }}>Browse Courses</a> to start learning!
              </div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Upcoming Quizzes" />
          <CardBody noPad>
            {pendingQuizzes.map((q) => (
              <div key={q.id} className={styles.quizRow}>
                <div>
                  <div className={styles.quizTitle}>{q.title}</div>
                  <div className={styles.quizMeta}>Due: {q.dueDate} · {q.duration} min</div>
                </div>
                <Button variant="primary" size="sm" onClick={() => onNavigate('quiz')}>Start</Button>
              </div>
            ))}
          </CardBody>
        </Card>

        <WeatherWidget />
      </div>

      <div className={styles.bottomGrid}>
        <Card>
          <CardHeader title="Announcements" icon={<Bell size={18} color="var(--accent4)" />} action={<Button variant="ghost" size="sm" onClick={() => onNavigate('notifications')}>View All</Button>} />
          <CardBody noPad>
            {ANNOUNCEMENTS.slice(0, 3).map((ann) => (
              <div key={ann.id} className={styles.annItem}>
                <div className={styles.annPriority} style={{ 
                  background: ann.priority === 'high' ? 'var(--danger)' : 
                               ann.priority === 'medium' ? 'var(--accent4)' : 'var(--accent3)' 
                }} />
                <div className={styles.annMain}>
                  <div className={styles.annTop}>
                    <span className={styles.annTitle}>{ann.title}</span>
                    <span className={styles.annDate}>{ann.date}</span>
                  </div>
                  <div className={styles.annText}>{ann.content}</div>
                  <div className={styles.annTrainer}>Posted by {ann.trainer}</div>
                </div>
                <ChevronRight size={16} className={styles.annArrow} />
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Learning Streak" />
          <CardBody>
            <div className={styles.streakRow}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                <div key={d} className={styles.streakDay}>
                  <div className={`${styles.streakDot} ${i < 5 ? styles.streakActive : ''}`} />
                  <span className={styles.streakLabel}>{d}</span>
                </div>
              ))}
            </div>
            <div className={styles.streakText}>🔥 12-day streak — keep it going!</div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Achievements" />
        <CardBody>
          <div className={styles.achievementsGrid}>
            {ACHIEVEMENTS.map((a) => (
              <div key={a.id} className={`${styles.achievement} ${a.earned ? styles.earned : styles.locked}`}>
                <div className={styles.achievementIconBox}>
                  {getAchievementIcon(a.id, a.earned, a.color)}
                </div>
                <div className={styles.achievementTitle} style={{ color: a.earned ? a.color : 'var(--text-muted)' }}>{a.title}</div>
                <div className={styles.achievementDesc}>{a.description}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
