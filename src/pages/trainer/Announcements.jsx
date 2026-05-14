import { useState } from 'react'
import { ANNOUNCEMENTS } from '../../data/mockData'
import { Card, CardHeader, Table, Badge, Button, Modal } from '../../components/shared/SharedComponents'
import { Bell, Plus, Trash2, Edit3, Send } from 'lucide-react'
import styles from './TrainerPages.module.css'
import sharedStyles from '../../components/shared/SharedComponents.module.css'

export default function Announcements() {
  const [announcements, setAnnouncements] = useState(ANNOUNCEMENTS)
  const [editingId, setEditingId] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newAnn, setNewAnn] = useState({
    title: '',
    content: '',
    priority: 'medium'
  })

  const handleAddAnn = (e) => {
    e.preventDefault()
    if (editingId) {
      setAnnouncements(announcements.map(a => a.id === editingId ? { ...a, ...newAnn } : a))
    } else {
      const ann = {
        id: 'a' + Date.now(),
        ...newAnn,
        date: 'Today',
        trainer: 'Priya Sharma (You)'
      }
      setAnnouncements([ann, ...announcements])
    }
    closeModal()
  }

  const handleEdit = (ann) => {
    setEditingId(ann.id)
    setNewAnn({ title: ann.title, content: ann.content, priority: ann.priority })
    setShowAddModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setEditingId(null)
    setNewAnn({ title: '', content: '', priority: 'medium' })
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this announcement?')) {
      setAnnouncements(announcements.filter(a => a.id !== id))
    }
  }

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div style={{ flex: 1 }}>
          <div className={styles.title}>Manage Announcements</div>
        </div>
        <Button onClick={() => setShowAddModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} />
          <span>New Announcement</span>
        </Button>
      </div>

      <div className={styles.stats} style={{ marginBottom: '24px' }}>
        <Card>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Posted</div>
            <div style={{ fontSize: '24px', fontWeight: '700' }}>{announcements.length}</div>
          </div>
        </Card>
        <Card>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>High Priority</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--danger)' }}>{announcements.filter(a => a.priority === 'high').length}</div>
          </div>
        </Card>
        <Card>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Avg Views</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent)' }}>142</div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="All Announcements" />
        <Table headers={['Date', 'Title & Content', 'Priority', 'Actions']}>
          {announcements.map(ann => (
            <tr key={ann.id}>
              <td style={{ fontSize: '13px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{ann.date}</td>
              <td>
                <div style={{ maxWidth: '400px' }}>
                  <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>{ann.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>{ann.content}</div>
                </div>
              </td>
              <td>
                <Badge variant={ann.priority === 'high' ? 'red' : ann.priority === 'medium' ? 'yellow' : 'blue'}>
                  {ann.priority.toUpperCase()}
                </Badge>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleEdit(ann)}
                    className={styles.statusBtn} 
                    style={{ background: 'rgba(0, 212, 255, 0.1)', color: 'var(--accent)', border: 'none', cursor: 'pointer' }}
                  >
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => handleDelete(ann.id)} className={styles.statusBtn} style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: 'none', cursor: 'pointer' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <Modal
        isOpen={showAddModal}
        onClose={closeModal}
        title={editingId ? 'Edit Announcement' : 'Create Announcement'}
        footer={
          <>
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
            <Button onClick={handleAddAnn} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Send size={16} />
              <span>{editingId ? 'Update' : 'Post'} Announcement</span>
            </Button>
          </>
        }
      >
        <form onSubmit={handleAddAnn}>
          <div className={sharedStyles.formGroup}>
            <label className={sharedStyles.label}>Title</label>
            <input
              className={sharedStyles.input}
              type="text"
              placeholder="e.g. Schedule Update for Batch B"
              value={newAnn.title}
              onChange={(e) => setNewAnn({ ...newAnn, title: e.target.value })}
              required
            />
          </div>
          <div className={sharedStyles.formGroup}>
            <label className={sharedStyles.label}>Content</label>
            <textarea
              className={sharedStyles.input}
              style={{ minHeight: '120px', resize: 'vertical' }}
              placeholder="Write your announcement details here..."
              value={newAnn.content}
              onChange={(e) => setNewAnn({ ...newAnn, content: e.target.value })}
              required
            ></textarea>
          </div>
          <div className={sharedStyles.formGroup}>
            <label className={sharedStyles.label}>Priority Level</label>
            <select
              className={sharedStyles.select}
              value={newAnn.priority}
              onChange={(e) => setNewAnn({ ...newAnn, priority: e.target.value })}
            >
              <option value="high">High (Red Alert)</option>
              <option value="medium">Medium (Standard Update)</option>
              <option value="low">Low (News/General)</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  )
}
