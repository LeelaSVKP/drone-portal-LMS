import { useCourses } from '../../context/CourseContext'
import CourseCard from '../../components/student/CourseCard'
import { StatCard } from '../../components/shared/SharedComponents'
import { BookOpen, CheckCircle, Clock, CircleDashed } from 'lucide-react'
import styles from './MyCourses.module.css'

export default function MyCourses() {
  const { courses, updateCourseProgress } = useCourses()
  const enrolled = courses.filter((c) => c.enrolled)
  const completedCount = enrolled.filter((c) => c.progress === 100).length
  const inProgressCount = enrolled.filter((c) => c.progress > 0 && c.progress < 100).length
  const notStartedCount = enrolled.filter((c) => c.progress === 0).length

  const handleAction = (course) => {
    // Simulate learning by incrementing progress by 25%
    if (course.progress < 100) {
      updateCourseProgress(course.id, 25)
    }
  }

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div className={styles.title}>My Courses</div>
      </div>

      <div className={styles.statsGrid}>
        <StatCard label="Total Enrolled" value={enrolled.length} color="blue" icon={<BookOpen size={20} />} />
        <StatCard label="Completed" value={completedCount} color="green" icon={<CheckCircle size={20} />} />
        <StatCard label="In Progress" value={inProgressCount} color="yellow" icon={<Clock size={20} />} />
        <StatCard label="Not Started" value={notStartedCount} color="purple" icon={<CircleDashed size={20} />} />
      </div>

      <div className={styles.grid}>
        {enrolled.map((course) => (
          <CourseCard key={course.id} course={course} showEnroll={false} onAction={handleAction} />
        ))}
      </div>
    </div>
  )
}
