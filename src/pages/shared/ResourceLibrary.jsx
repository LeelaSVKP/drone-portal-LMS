import { useState, useRef } from 'react'
import { Card, CardHeader, Table, Badge, Button, Modal } from '../../components/shared/SharedComponents'
import { FileText, Download, Search, Upload, Trash2, CheckCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import styles from '../trainer/TrainerPages.module.css'
import sharedStyles from '../../components/shared/SharedComponents.module.css'

export default function ResourceLibrary() {
  const { user } = useAuth()
  const isTrainer = user?.role === 'trainer'

  const [resources, setResources] = useState([
    { id: 1, title: 'DGCA Nano Drone Policy', category: 'Regulations', type: 'PDF', size: '2.4 MB', date: 'Jan 20, 2025' },
    { id: 2, title: 'Mavic 3 Safety Checklist', category: 'Checklists', type: 'PDF', size: '1.1 MB', date: 'Feb 15, 2025' },
    { id: 3, title: 'Aerial Photography Basics', category: 'Learning Material', type: 'Guide', size: '5.8 MB', date: 'Mar 02, 2025' },
    { id: 4, title: 'Flight Permission Form (Template)', category: 'Forms', type: 'DOCX', size: '450 KB', date: 'Apr 10, 2025' },
    { id: 5, title: 'LiPo Battery Safety Guide', category: 'Safety', type: 'PDF', size: '3.2 MB', date: 'May 01, 2025' },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState(null)
  const fileInputRef = useRef(null)

  const handleDownload = (res) => {
    alert(`Downloading: ${res.title}.${res.type.toLowerCase()}`)
    // Simulation of actual download
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      setResources(resources.filter(r => r.id !== id))
    }
  }

  const handleUpload = (e) => {
    e.preventDefault()
    if (!selectedFile) return
    
    setIsUploading(true)
    setProgress(0)
    setUploadStatus(null)

    let p = 0
    const interval = setInterval(() => {
      p += 10
      if (p > 100) {
        clearInterval(interval)
        setProgress(100)
        
        setTimeout(() => {
          const newRes = {
            id: Date.now(),
            title: selectedFile.name.split('.')[0],
            category: 'Regulations',
            type: selectedFile.name.split('.').pop().toUpperCase(),
            size: (selectedFile.size / 1024 / 1024).toFixed(1) + ' MB',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '4-digit' })
          }
          setResources(prev => [newRes, ...prev])
          setIsUploading(false)
          setUploadStatus('success')
        }, 600)
      } else {
        setProgress(p)
      }
    }, 100)
  }

  const resetModal = () => {
    setShowUploadModal(false)
    setIsUploading(false)
    setUploadStatus(null)
    setSelectedFile(null)
    setProgress(0)
  }

  const filteredResources = resources.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div style={{ flex: 1 }}>
          <div className={styles.title}>Resource Library</div>
        </div>
        {isTrainer && (
          <Button onClick={() => setShowUploadModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Upload size={18} />
            <span>Upload Resource</span>
          </Button>
        )}
      </div>

      <Card>
        <CardHeader 
          title={`All Resources (${filteredResources.length})`}
          action={
            <div style={{ display: 'flex', gap: '12px' }}>
              <div className={styles.filterGroup}>
                <Search size={16} className={styles.filterIcon} />
                <input 
                  type="text" 
                  placeholder="Search resources..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.dateInput}
                  style={{ minWidth: '240px' }}
                />
              </div>
            </div>
          }
        />
        <Table headers={['Document Name', 'Category', 'Type', 'Size', 'Date Added', 'Action']}>
          {filteredResources.map(res => (
            <tr key={res.id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '8px', 
                    background: 'rgba(0, 212, 255, 0.1)', 
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FileText size={20} />
                  </div>
                  <div style={{ fontWeight: '500', fontSize: '14px' }}>{res.title}</div>
                </div>
              </td>
              <td><Badge variant="blue">{res.category}</Badge></td>
              <td style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>{res.type}</td>
              <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{res.size}</td>
              <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{res.date}</td>
              <td>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleDownload(res)}
                    className={styles.statusBtn} 
                    style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent3)', border: 'none', cursor: 'pointer' }}
                  >
                    <Download size={16} />
                  </button>
                  {isTrainer && (
                    <button 
                      onClick={() => handleDelete(res.id)}
                      className={styles.statusBtn} 
                      style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: 'none', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <Modal 
        isOpen={showUploadModal} 
        onClose={resetModal}
        title="Upload New Resource"
        footer={
          uploadStatus === 'success' ? (
            <Button onClick={resetModal} fullWidth>Done</Button>
          ) : (
            <>
              <Button variant="ghost" onClick={resetModal} disabled={isUploading}>Cancel</Button>
              <Button onClick={handleUpload} disabled={!selectedFile || isUploading}>
                {isUploading ? 'Uploading...' : 'Upload Now'}
              </Button>
            </>
          )
        }
      >
        <div style={{ minHeight: '180px' }}>
          {uploadStatus === 'success' ? (
            <div style={{ textAlign: 'center', padding: '20px' }} className="fade-in">
              <div style={{ 
                width: '64px', 
                height: '64px', 
                background: 'rgba(16, 185, 129, 0.1)', 
                color: 'var(--accent3)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 16px' 
              }}>
                <CheckCircle size={32} />
              </div>
              <h3 style={{ color: '#fff', marginBottom: '8px' }}>Success!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Resource uploaded successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleUpload}>
              {isUploading && (
                <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(0,212,255,0.05)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px', color: 'var(--text)' }}>
                    <span>Uploading {selectedFile?.name}</span>
                    <span>{progress}%</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent), var(--accent2))', transition: 'width 0.1s' }}></div>
                  </div>
                </div>
              )}
              
              <div className={sharedStyles.formGroup}>
                <label className={sharedStyles.label}>Document Title</label>
                <input className={sharedStyles.input} placeholder="e.g. Safety Guide" required />
              </div>
              
              <div className={sharedStyles.formGroup}>
                <label className={sharedStyles.label}>Category</label>
                <select className={sharedStyles.select}>
                  <option>Regulations</option>
                  <option>Checklists</option>
                  <option>Safety</option>
                </select>
              </div>

              <div className={sharedStyles.formGroup}>
                <label className={sharedStyles.label}>Select File</label>
                <div 
                  onClick={() => !isUploading && fileInputRef.current?.click()}
                  style={{ 
                    border: '2px dashed var(--border)', 
                    padding: '30px', 
                    textAlign: 'center', 
                    borderRadius: '12px', 
                    cursor: isUploading ? 'not-allowed' : 'pointer',
                    background: selectedFile ? 'rgba(0, 212, 255, 0.05)' : 'transparent',
                    opacity: isUploading ? 0.6 : 1
                  }}
                >
                  <Upload size={24} style={{ marginBottom: '12px', color: 'var(--accent)' }} />
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>
                    {selectedFile ? selectedFile.name : 'Click to browse files'}
                  </div>
                  <input type="file" ref={fileInputRef} hidden onChange={(e) => setSelectedFile(e.target.files[0])} />
                </div>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </div>
  )
}
