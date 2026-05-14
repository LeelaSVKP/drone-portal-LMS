import { useState, useRef } from 'react'
import { useCourses } from '../../context/CourseContext'
import { Card, CardBody, Button, ProgressBar } from '../../components/shared/SharedComponents'
import styles from './TrainerPages.module.css'

export default function UploadContent() {
  const { addCourse } = useCourses()
  const [hover, setHover] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [success, setSuccess] = useState(false)

  // New Course Form State
  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('Beginner')
  const [description, setDescription] = useState('')

  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setSuccess(false)
      setProgress(0)
    }
  }

  const handleUpload = () => {
    if (!selectedFile || !title) return
    setIsUploading(true)
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5
      if (currentProgress >= 100) {
        clearInterval(interval)
        setProgress(100)
        setTimeout(() => {
          setIsUploading(false)
          setSuccess(true)

          // Add the new course globally!
          const newCourse = {
            id: 'c' + Date.now(),
            image: null,
            emoji: '📦',
            title,
            level,
            modules: 1,
            hours: 2,
            languages: 'English',
            thumbClass: level.toLowerCase(),
            enrolled: false,
            progress: 0,
            rating: 5.0,
            students: 0,
            description,
            tags: ['New'],
          }
          addCourse(newCourse)

          setSelectedFile(null)
          setProgress(0)
          setTitle('')
          setDescription('')
        }, 500)
      } else {
        setProgress(currentProgress)
      }
    }, 300)
  }

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div className={styles.title}>Upload New Course</div>
      </div>

      <Card style={{ maxWidth: 500 }}>
        <CardBody>
          <div className="field">
            <label>Course Title</label>
            <input
              placeholder="e.g. Advanced Thermal Imaging"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Difficulty Level</label>
            <select value={level} onChange={e => setLevel(e.target.value)}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Pro">Pro</option>
              <option value="Certification">Certification</option>
            </select>
          </div>

          <div className="field">
            <label>Course Description</label>
            <textarea
              rows={3}
              placeholder="Briefly describe what students will learn..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid rgba(30, 58, 95, 0.4)', borderRadius: 'var(--radius-md)', color: 'var(--text)', resize: 'vertical' }}
            />
          </div>

          <label style={{ display: 'block', marginBottom: 8, fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1.5 }}>Course Video / PDF</label>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <div
            style={{
              border: '2px dashed',
              borderColor: hover ? 'var(--accent)' : 'var(--border)',
              borderRadius: 10,
              padding: 32,
              textAlign: 'center',
              marginBottom: 16,
              cursor: 'pointer',
              transition: 'border-color 0.2s',
              background: hover ? 'rgba(0, 212, 255, 0.02)' : 'transparent'
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => fileInputRef.current.click()}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>{selectedFile ? '📄' : '📁'}</div>
            <div style={{ fontSize: 13, color: selectedFile ? 'var(--accent)' : 'var(--text-muted)' }}>
              {selectedFile ? selectedFile.name : 'Click or drag course files here'}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>MP4, PDF, ZIP · Max 2GB</div>
          </div>

          {isUploading && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4, color: 'var(--text-muted)' }}>
                <span>Uploading {selectedFile?.name}...</span>
                <span>{progress}%</span>
              </div>
              <ProgressBar value={progress} />
            </div>
          )}

          {success && (
            <div style={{ padding: 12, background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent3)', borderRadius: 8, fontSize: 13, marginBottom: 16, textAlign: 'center' }}>
              Course "{title}" uploaded successfully and published! ✅
            </div>
          )}

          <Button
            variant="primary"
            fullWidth
            onClick={handleUpload}
            disabled={!selectedFile || !title || isUploading}
          >
            {isUploading ? 'Publishing Course...' : 'Publish Course'}
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}
