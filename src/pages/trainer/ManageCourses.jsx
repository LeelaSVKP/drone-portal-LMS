import { useState } from 'react'
import { useCourses } from '../../context/CourseContext'
import { Card, CardBody, Table, Badge, Button } from '../../components/shared/SharedComponents'
import styles from './TrainerPages.module.css'

export default function ManageCourses() {
  const { courses, addCourse } = useCourses()
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('Beginner')
  const [description, setDescription] = useState('')

  const getBadgeVariant = (level) => {
    switch (level) {
      case 'Beginner': return 'green'
      case 'Intermediate': return 'yellow'
      case 'Advanced': return 'red'
      case 'Pro': return 'purple'
      case 'Certification': return 'purple'
      default: return 'blue'
    }
  }

  const handleSaveCourse = () => {
    if (!title) return
    const newCourse = {
      id: 'c' + Date.now(),
      image: null,
      emoji: '📦',
      title,
      level,
      modules: 0,
      hours: 0,
      languages: 'English',
      thumbClass: level.toLowerCase(),
      enrolled: false,
      progress: 0,
      rating: 0,
      students: 0,
      description,
      tags: ['New'],
    }
    addCourse(newCourse)
    setShowForm(false)
    setTitle('')
    setDescription('')
    setLevel('Beginner')
  }

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div className={styles.title}>Manage Courses</div>
        <div className={styles.subtitle}>Edit content, add modules, manage curriculum</div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Button variant="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Course'}
        </Button>
      </div>

      {showForm && (
        <Card style={{ marginBottom: 24 }}>
          <CardBody>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 16 }}>Create New Course</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="field" style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Course Title</label>
                <input 
                  placeholder="e.g. Advanced Thermal Imaging" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid rgba(0, 212, 255, 0.3)', borderRadius: 8, color: 'var(--text)', fontSize: 14, outline: 'none' }}
                />
              </div>
              <div className="field" style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Difficulty Level</label>
                <select 
                  value={level} 
                  onChange={e => setLevel(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid rgba(0, 212, 255, 0.3)', borderRadius: 8, color: 'var(--text)', fontSize: 14, outline: 'none' }}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Pro">Pro</option>
                  <option value="Certification">Certification</option>
                </select>
              </div>
            </div>
            <div className="field" style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Description</label>
              <textarea 
                rows={3}
                placeholder="Briefly describe what students will learn..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid rgba(0, 212, 255, 0.3)', borderRadius: 8, color: 'var(--text)', resize: 'vertical', fontSize: 14, outline: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="primary" disabled={!title} onClick={handleSaveCourse}>Save Course as Draft</Button>
            </div>
          </CardBody>
        </Card>
      )}

      <Card>
        <Table headers={['Course', 'Level', 'Students', 'Modules', 'Status', 'Actions']}>
          {courses.map(c => (
            <tr key={c.id}>
              <td>{c.emoji} {c.title}</td>
              <td><Badge variant={getBadgeVariant(c.level)}>{c.level}</Badge></td>
              <td>{c.students}</td>
              <td>{c.modules}</td>
              <td>
                <Badge variant={c.id.startsWith('c') && c.id.length > 3 ? 'yellow' : 'green'}>
                  {c.id.startsWith('c') && c.id.length > 3 ? 'Draft' : 'Published'}
                </Badge>
              </td>
              <td>
                <Button 
                  variant={c.id.startsWith('c') && c.id.length > 3 ? 'primary' : 'ghost'} 
                  size="sm"
                  onClick={() => alert(c.id.startsWith('c') && c.id.length > 3 ? `Publishing ${c.title}...` : `Opening editor for ${c.title}...`)}
                >
                  {c.id.startsWith('c') && c.id.length > 3 ? 'Publish' : 'Edit'}
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}
