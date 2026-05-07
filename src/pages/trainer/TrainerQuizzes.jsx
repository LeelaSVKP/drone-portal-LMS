import { useState } from 'react'
import { TRAINER_QUIZZES } from '../../data/mockData'
import { useCourses } from '../../context/CourseContext'
import { Card, CardBody, Table, Button } from '../../components/shared/SharedComponents'
import styles from './TrainerPages.module.css'

export default function TrainerQuizzes() {
  const { courses } = useCourses()
  const [quizzes, setQuizzes] = useState(TRAINER_QUIZZES)
  const [showForm, setShowForm] = useState(false)
  
  const [title, setTitle] = useState('')
  const [course, setCourse] = useState(courses[0]?.title || '')
  const [questions, setQuestions] = useState(10)
  const [duration, setDuration] = useState(20)

  const handleSaveQuiz = () => {
    if (!title) return
    const newQuiz = {
      id: 'tq' + Date.now(),
      title,
      course,
      attempts: 0,
      avgScore: 0,
      passRate: 0,
    }
    setQuizzes([newQuiz, ...quizzes])
    setShowForm(false)
    setTitle('')
  }

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div className={styles.title}>Quizzes & Assessments</div>
        <div className={styles.subtitle}>Create, edit, and review quiz performance</div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Button variant="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Create Quiz'}
        </Button>
      </div>

      {showForm && (
        <Card style={{ marginBottom: 24 }}>
          <CardBody>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 16 }}>Create New Quiz</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="field" style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Quiz Title</label>
                <input 
                  placeholder="e.g. Aerial Photography Midterm" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid rgba(0, 212, 255, 0.3)', borderRadius: 8, color: 'var(--text)', fontSize: 14, outline: 'none' }}
                />
              </div>
              <div className="field" style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Select Course</label>
                <select 
                  value={course} 
                  onChange={e => setCourse(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid rgba(0, 212, 255, 0.3)', borderRadius: 8, color: 'var(--text)', fontSize: 14, outline: 'none' }}
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div className="field">
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Number of Questions</label>
                <input 
                  type="number"
                  value={questions}
                  onChange={e => setQuestions(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid rgba(0, 212, 255, 0.3)', borderRadius: 8, color: 'var(--text)', fontSize: 14, outline: 'none' }}
                />
              </div>
              <div className="field">
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Duration (Minutes)</label>
                <input 
                  type="number"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid rgba(0, 212, 255, 0.3)', borderRadius: 8, color: 'var(--text)', fontSize: 14, outline: 'none' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="primary" disabled={!title} onClick={handleSaveQuiz}>Save Quiz</Button>
            </div>
          </CardBody>
        </Card>
      )}

      <Card>
        <Table headers={['Quiz Title', 'Course', 'Attempts', 'Avg Score', 'Pass Rate', '']}>
          {quizzes.map(q => (
            <tr key={q.id}>
              <td>{q.title}</td>
              <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{q.course}</td>
              <td>{q.attempts}</td>
              <td style={{ color: q.avgScore >= 80 ? 'var(--accent3)' : q.avgScore >= 70 ? 'var(--text)' : 'var(--accent4)' }}>
                {q.avgScore}%
              </td>
              <td style={{ color: q.passRate >= 80 ? 'var(--accent3)' : 'var(--accent4)' }}>
                {q.passRate}%
              </td>
              <td><Button variant="ghost" size="sm">View Results</Button></td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}
