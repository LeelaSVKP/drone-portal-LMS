import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Card, Button } from '../../components/shared/SharedComponents'
import { User, Phone, MapPin, Globe, Camera, Edit3, Save, CheckCircle2, X } from 'lucide-react'
import styles from './StudentPages.module.css'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState(null)

  // Local state for edits
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    city: user?.city || '',
    language: user?.language || ''
  })

  useEffect(() => {
    if (user && !isEditing) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        city: user.city || '',
        language: user.language || ''
      })
    }
  }, [user, isEditing])

  const fileInputRef = useRef(null)

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleSave = () => {
    updateProfile(formData)
    setIsEditing(false)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const InputRow = ({ icon: Icon, label, field, value }) => (
    <div style={{ display: 'flex', alignItems: 'center', padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: isEditing ? 'rgba(0, 212, 255, 0.02)' : 'transparent', transition: 'background 0.2s' }}>
      <Icon size={18} color="var(--accent)" style={{ marginRight: 24 }} />
      <div style={{ width: 180, color: 'var(--text-muted)', fontSize: 13 }}>{label}</div>
      <div style={{ color: 'var(--text-muted)', marginRight: 24 }}>:</div>
      <input
        value={value}
        onChange={(e) => handleChange(field, e.target.value)}
        readOnly={!isEditing}
        style={{
          flex: 1,
          background: isEditing ? 'rgba(0,0,0,0.2)' : 'transparent',
          border: isEditing ? '1px solid rgba(0, 212, 255, 0.3)' : '1px solid transparent',
          color: 'var(--text)',
          fontSize: 14,
          outline: 'none',
          padding: isEditing ? '8px 12px' : '8px 0',
          borderRadius: 6,
          transition: 'all 0.2s'
        }}
      />
      {isEditing ? <Edit3 size={14} color="var(--accent)" style={{ marginLeft: 8 }} /> : <Icon size={18} color="rgba(255,255,255,0.2)" />}
    </div>
  )

  return (
    <div className={styles.page + ' fade-in'} style={{ maxWidth: 960, margin: '0 auto', padding: '32px 16px' }}>

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={24} color="var(--accent)" />
        </div>
        <div>
          <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--text)' }}>My Profile</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Manage your personal information and preferences</div>
        </div>
      </div>

      <Card style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, overflow: 'hidden' }}>

        {/* Top Profile Section */}
        <div style={{ padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent2), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 700, boxShadow: '0 4px 20px rgba(0, 212, 255, 0.2)', overflow: 'hidden' }}>
                {profileImage ? (
                  <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  user?.avatar
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{ position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: '50%', background: '#1e293b', border: '2px solid #0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--accent)', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                title="Change Avatar"
              >
                <Camera size={14} />
              </button>
              <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} />
            </div>

            <div>
              <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{user?.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 14, marginBottom: 12 }}>
                {user?.email}
                <CheckCircle2 size={16} color="var(--accent)" fill="rgba(0, 212, 255, 0.1)" />
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: '1px solid rgba(0, 212, 255, 0.3)', padding: '6px 14px', borderRadius: 20, fontSize: 12, color: 'var(--accent)', background: 'rgba(0, 212, 255, 0.05)' }}>
                <User size={12} />
                Drone {user?.role === 'student' ? 'Student' : 'Trainer'}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: isEditing ? 'rgba(239, 68, 68, 0.1)' : 'transparent', border: isEditing ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: 8, color: isEditing ? '#ef4444' : 'var(--text)', fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }}
          >
            {isEditing ? <X size={14} /> : <Edit3 size={14} />}
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        {/* Input Rows */}
        <div>
          <InputRow icon={User} label="Full Name" field="name" value={formData.name} />
          <InputRow icon={Phone} label="Phone" field="phone" value={formData.phone} />
          <InputRow icon={MapPin} label="City" field="city" value={formData.city} />
          <InputRow icon={Globe} label="Learning Language" field="language" value={formData.language} />
        </div>

        {/* Save Button */}
        <div style={{ padding: '24px 32px' }}>
          <Button
            variant="primary"
            fullWidth
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', border: 'none', padding: '14px', borderRadius: 8, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 500, opacity: isEditing ? 1 : 0.7 }}
          >
            <Save size={18} />
            {isEditing ? 'Save Changes' : 'Saved (Click to Edit)'}
          </Button>
        </div>

      </Card>
    </div>
  )
}
