import { useState } from 'react'
import { STUDENTS, TRAINER_COURSES } from '../../data/mockData'
import { Card, CardHeader, Table, Badge, Button, Modal } from '../../components/shared/SharedComponents'
import { Check, X, Clock, Calendar as CalendarIcon, Filter, Save } from 'lucide-react'
import styles from './TrainerPages.module.css'
import sharedStyles from '../../components/shared/SharedComponents.module.css'

export default function Attendance() {
  const [selectedCourse, setSelectedCourse] = useState(TRAINER_COURSES[0].title)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [attendanceData, setAttendanceData] = useState(() => {
    // Initializing with mock data for students in the first course
    const initialData = {}
    STUDENTS.filter(s => s.course === TRAINER_COURSES[0].title).forEach(s => {
      initialData[s.id] = 'present'
    })
    return initialData
  })
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const courseStudents = STUDENTS.filter(s => s.course === selectedCourse)

  const handleStatusChange = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }))
  }

  const handleSaveAttendance = () => {
    console.log('Saving attendance for', selectedCourse, 'on', selectedDate, attendanceData)
    setShowSuccessModal(true)
  }

  const stats = {
    present: Object.values(attendanceData).filter(v => v === 'present').length,
    absent: Object.values(attendanceData).filter(v => v === 'absent').length,
    late: Object.values(attendanceData).filter(v => v === 'late').length,
    total: courseStudents.length
  }

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div style={{ flex: 1 }}>
          <div className={styles.title}>Student Attendance</div>
          <div className={styles.subtitle}>Track and manage daily attendance for your drone batches</div>
        </div>
        <Button onClick={handleSaveAttendance} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Save size={18} />
          <span>Save Attendance</span>
        </Button>
      </div>

      <div className={styles.statsGrid} style={{ marginBottom: '24px' }}>
        <Card>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent3)' }}>
              <Check size={24} />
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statLabel}>Present</div>
              <div className={styles.statValue}>{stats.present}</div>
            </div>
          </div>
        </Card>
        <Card>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
              <X size={24} />
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statLabel}>Absent</div>
              <div className={styles.statValue}>{stats.absent}</div>
            </div>
          </div>
        </Card>
        <Card>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <Clock size={24} />
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statLabel}>Late</div>
              <div className={styles.statValue}>{stats.late}</div>
            </div>
          </div>
        </Card>
        <Card>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(0, 212, 255, 0.1)', color: 'var(--accent)' }}>
              <CalendarIcon size={24} />
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statLabel}>Total Students</div>
              <div className={styles.statValue}>{stats.total}</div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader 
          title="Mark Attendance"
          action={
            <div style={{ display: 'flex', gap: '12px' }}>
              <div className={styles.filterGroup}>
                <CalendarIcon size={16} className={styles.filterIcon} />
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={styles.dateInput}
                />
              </div>
              <div className={styles.filterGroup}>
                <Filter size={16} className={styles.filterIcon} />
                <select 
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className={styles.courseSelect}
                >
                  {TRAINER_COURSES.map(course => (
                    <option key={course.id} value={course.title}>{course.title}</option>
                  ))}
                </select>
              </div>
            </div>
          }
        />
        <Table headers={['Student', 'Course', 'Status', 'Mark Attendance']}>
          {courseStudents.map(s => (
            <tr key={s.id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className={styles.studentAv} style={{ width: 36, height: 36, fontSize: 13, background: `${s.color}33`, color: s.color }}>{s.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 500 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{s.email}</div>
                  </div>
                </div>
              </td>
              <td style={{ fontSize: 12, color: 'var(--muted)' }}>{s.course}</td>
              <td>
                <Badge variant={
                  attendanceData[s.id] === 'present' ? 'green' : 
                  attendanceData[s.id] === 'absent' ? 'red' : 'yellow'
                }>
                  {(attendanceData[s.id] || 'Not Marked').toUpperCase()}
                </Badge>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleStatusChange(s.id, 'present')}
                    className={styles.statusBtn}
                    style={{ 
                      background: attendanceData[s.id] === 'present' ? 'var(--accent3)' : 'rgba(16, 185, 129, 0.1)',
                      color: attendanceData[s.id] === 'present' ? 'white' : 'var(--accent3)',
                      border: 'none'
                    }}
                    title="Mark Present"
                  >
                    <Check size={16} />
                  </button>
                  <button 
                    onClick={() => handleStatusChange(s.id, 'absent')}
                    className={styles.statusBtn}
                    style={{ 
                      background: attendanceData[s.id] === 'absent' ? '#ef4444' : 'rgba(239, 68, 68, 0.1)',
                      color: attendanceData[s.id] === 'absent' ? 'white' : '#ef4444',
                      border: 'none'
                    }}
                    title="Mark Absent"
                  >
                    <X size={16} />
                  </button>
                  <button 
                    onClick={() => handleStatusChange(s.id, 'late')}
                    className={styles.statusBtn}
                    style={{ 
                      background: attendanceData[s.id] === 'late' ? '#f59e0b' : 'rgba(245, 158, 11, 0.1)',
                      color: attendanceData[s.id] === 'late' ? 'white' : '#f59e0b',
                      border: 'none'
                    }}
                    title="Mark Late"
                  >
                    <Clock size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {courseStudents.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
                No students enrolled in this course yet.
              </td>
            </tr>
          )}
        </Table>
      </Card>

      <Modal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}
        title="Attendance Saved"
        footer={<Button onClick={() => setShowSuccessModal(false)}>Close</Button>}
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            background: 'rgba(16, 185, 129, 0.1)', 
            color: 'var(--accent3)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 20px',
            fontSize: '30px'
          }}>
            ✅
          </div>
          <h3>Success!</h3>
          <p style={{ color: 'var(--muted)', marginTop: '8px' }}>
            Attendance for {selectedCourse} on {selectedDate} has been successfully recorded.
          </p>
        </div>
      </Modal>
    </div>
  )
}
