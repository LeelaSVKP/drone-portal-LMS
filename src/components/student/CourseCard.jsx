import { ProgressBar, Badge, Button } from '../shared/SharedComponents'
import styles from './CourseCard.module.css'

const LEVEL_BADGE = {
  Beginner: 'green',
  Intermediate: 'yellow',
  Advanced: 'red',
  Pro: 'purple',
  Certification: 'purple',
}

export default function CourseCard({ course, onAction, showEnroll }) {
  const badgeVariant = LEVEL_BADGE[course.level] || 'blue'

  return (
    <div className={`${styles.card} ${styles[course.thumbClass]}`}>
      <div className={`${styles.thumb} ${styles[`thumb_${course.thumbClass}`]}`}>
        {course.image ? (
          <img 
            src={course.image} 
            alt={course.title} 
            className={styles.courseImage} 
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'inline';
            }}
          />
        ) : null}
        <span style={{ display: course.image ? 'none' : 'inline' }}>{course.emoji}</span>
        <div className={styles.ratingBadge}>⭐ {course.rating}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.topRow}>
          <Badge variant={badgeVariant}>{course.level}</Badge>
          <span className={styles.meta}>{course.modules} modules · {course.hours}h</span>
        </div>
        <div className={styles.title}>{course.title}</div>
        <div className={styles.languages}>🌐 {course.languages}</div>

        {!showEnroll && (
          <>
            <ProgressBar
              value={course.progress}
              color={
                course.progress === 100
                  ? 'var(--accent3)'
                  : course.progress > 50
                  ? 'linear-gradient(90deg, var(--accent3), var(--accent))'
                  : 'linear-gradient(90deg, var(--accent4), var(--accent))'
              }
            />
            <div className={styles.progressRow}>
              <span className={styles.progressText} style={{ color: course.progress === 100 ? 'var(--accent3)' : 'var(--text-muted)' }}>
                {course.progress === 100 ? '✓ Completed' : `${course.progress}% complete`}
              </span>
              <Button
                variant={course.progress === 100 ? 'ghost' : 'primary'}
                size="sm"
                onClick={() => onAction && onAction(course)}
              >
                {course.progress === 100 ? 'Review' : course.progress === 0 ? 'Start' : 'Resume'}
              </Button>
            </div>
          </>
        )}

        {showEnroll && (
          <Button
            variant={course.enrolled ? 'ghost' : 'primary'}
            size="sm"
            fullWidth
            onClick={() => onAction && onAction(course)}
          >
            {course.enrolled ? 'Enrolled ✓' : 'Enroll Now'}
          </Button>
        )}
      </div>
    </div>
  )
}
