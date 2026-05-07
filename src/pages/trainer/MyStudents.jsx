import { useState } from 'react'
import { STUDENTS, COURSES } from '../../data/mockData'
import { Card, CardHeader, Table, Badge, Button, ProgressBar, Modal } from '../../components/shared/SharedComponents'
import styles from './TrainerPages.module.css'
import sharedStyles from '../../components/shared/SharedComponents.module.css'

export default function MyStudents() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    course: COURSES[0].title,
    status: 'active'
  })

  const filteredStudents = STUDENTS.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.course.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddStudent = (e) => {
    e.preventDefault()
    // In a real app, this would be an API call
    console.log('Adding student:', newStudent)
    setShowAddModal(false)
    setNewStudent({
      name: '',
      email: '',
      phone: '',
      course: COURSES[0].title,
      status: 'active'
    })
  }

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div style={{ flex: 1 }}>
          <div className={styles.title}>My Students</div>
          <div className={styles.subtitle}>Monitor progress and send feedback</div>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px', lineHeight: 1, marginTop: '-2px' }}>+</span> 
            <span>Add New Student</span>
          </div>
        </Button>
      </div>

      <Card>
        <CardHeader 
          title={`All Students (${filteredStudents.length})`}
          action={
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                padding: '10px 16px', 
                width: '280px',
                background: 'var(--surface2)', 
                border: '1px solid rgba(0, 212, 255, 0.3)', 
                borderRadius: 8, 
                color: 'var(--text)', 
                fontSize: 14, 
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }} 
              placeholder="Search by name or course..." 
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent)'
                e.target.style.boxShadow = '0 0 0 2px rgba(0, 212, 255, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(0, 212, 255, 0.3)'
                e.target.style.boxShadow = 'none'
              }}
            />
          }
        />
        <Table headers={['Student', 'Course', 'Progress', 'Quiz Avg', 'Status', 'Action']}>
          {filteredStudents.map(s => (
            <tr key={s.id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className={styles.studentAv} style={{ width: 30, height: 30, fontSize: 11, background: `${s.color}33`, color: s.color }}>{s.avatar}</div>
                  {s.name}
                </div>
              </td>
              <td style={{ fontSize: 12, color: 'var(--muted)' }}>{s.course}</td>
              <td>
                <div style={{ width: 80, display: 'inline-block', verticalAlign: 'middle' }}>
                  <ProgressBar value={s.progress} color={s.progress === 100 ? 'var(--accent3)' : undefined} />
                </div>
              </td>
              <td style={{ color: s.quizAvg >= 90 ? 'var(--accent3)' : s.quizAvg ? 'var(--text)' : 'var(--muted)' }}>
                {s.quizAvg ? `${s.quizAvg}%` : '—'}
              </td>
              <td>
                <Badge variant={s.status === 'completed' ? 'green' : s.status === 'active' ? 'yellow' : 'blue'}>
                  {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                </Badge>
              </td>
              <td>
                <Button variant="ghost" size="sm">
                  {s.certReady ? 'Certify' : 'Message'}
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="Add New Student"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={handleAddStudent}>Add Student</Button>
          </>
        }
      >
        <form onSubmit={handleAddStudent}>
          <div className={sharedStyles.formGroup}>
            <label className={sharedStyles.label}>Full Name</label>
            <input 
              className={sharedStyles.input} 
              type="text" 
              placeholder="e.g. John Doe"
              value={newStudent.name}
              onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
              required
            />
          </div>
          <div className={sharedStyles.formGroup}>
            <label className={sharedStyles.label}>Email Address</label>
            <input 
              className={sharedStyles.input} 
              type="email" 
              placeholder="e.g. john@example.com"
              value={newStudent.email}
              onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
              required
            />
          </div>
          <div className={sharedStyles.formGroup}>
            <label className={sharedStyles.label}>Phone Number</label>
            <input 
              className={sharedStyles.input} 
              type="tel" 
              placeholder="e.g. +91 98765 43210"
              value={newStudent.phone}
              onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
            />
          </div>
          <div className={sharedStyles.formGroup}>
            <label className={sharedStyles.label}>Enrolled Course</label>
            <select 
              className={sharedStyles.select}
              value={newStudent.course}
              onChange={(e) => setNewStudent({...newStudent, course: e.target.value})}
            >
              {COURSES.map(course => (
                <option key={course.id} value={course.title}>{course.title}</option>
              ))}
            </select>
          </div>
          <div className={sharedStyles.formGroup}>
            <label className={sharedStyles.label}>Status</label>
            <select 
              className={sharedStyles.select}
              value={newStudent.status}
              onChange={(e) => setNewStudent({...newStudent, status: e.target.value})}
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  )
}
