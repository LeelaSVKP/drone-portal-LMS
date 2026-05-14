import { useState } from 'react'
import { useCourses } from '../../context/CourseContext'
import CourseCard from '../../components/student/CourseCard'
import { Button } from '../../components/shared/SharedComponents'
import styles from './StudentPages.module.css'

export default function BrowseCourses() {
  const [filter, setFilter] = useState('All')
  const { courses, enrollCourse } = useCourses()

  const categories = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Pro / Certification']

  const filteredCourses = courses.filter(c => {
    if (filter === 'All') return true
    if (filter === 'Pro / Certification') return c.level === 'Pro' || c.level === 'Certification'
    return c.level === filter
  })

  // The 3 specific courses from the image
  const premiumCourses = courses.filter(c => ['c9', 'c10', 'c11'].includes(c.id))

  const handleEnroll = (course) => {
    enrollCourse(course.id)
  }

  return (
    <div className={styles.page + ' fade-in'}>
      {/* Premium Highlight Section */}
      <div style={{ marginBottom: 40, padding: 32, background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05), rgba(124, 58, 237, 0.05))', borderRadius: 16, border: '1px solid var(--border)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', fontSize: 24, marginBottom: 8 }}>
          Professional Training & Certification
        </h2>
        <div className={styles.grid}>
          {premiumCourses.map(course => (
            <CourseCard key={course.id} course={course} showEnroll={true} onAction={handleEnroll} />
          ))}
        </div>
      </div>

      <div className={styles.header}>
        <div className={styles.title}>All Courses</div>
      </div>

      <div className={styles.filterRow}>
        {categories.map(cat => (
          <Button 
            key={cat} 
            variant={filter === cat ? 'primary' : 'ghost'} 
            size="sm"
            onClick={() => setFilter(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} showEnroll={true} onAction={handleEnroll} />
        ))}
      </div>
    </div>
  )
}
