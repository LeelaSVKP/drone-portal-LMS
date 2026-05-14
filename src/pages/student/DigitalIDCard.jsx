import { Card, CardHeader, Button, Badge } from '../../components/shared/SharedComponents'
import { Download, Share2, ShieldCheck, QrCode, Mail, Phone, MapPin } from 'lucide-react'
import styles from './StudentDashboard.module.css'

export default function DigitalIDCard() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Digital Pilot ID',
        text: 'Check out my official ADA Digital Pilot ID!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Sharing is not supported on this browser. Link copied to clipboard!');
      navigator.clipboard.writeText(window.location.href);
    }
  }

  const handleDownload = () => {
    alert('Generating PDF... Your Digital Pilot ID will be downloaded shortly.');
    // Simulated download logic
  }

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <div className={styles.title}>Digital Pilot ID</div>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
          <Button 
            variant="ghost" 
            onClick={handleShare}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Share2 size={18} />
            <span>Share ID</span>
          </Button>
          <Button 
            onClick={handleDownload}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Download size={18} />
            <span>Download PDF</span>
          </Button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        {/* The ID Card */}
        <div style={{ 
          width: '400px', 
          height: '240px', 
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
          borderRadius: '16px', 
          position: 'relative', 
          padding: '24px',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden'
        }}>
          {/* Abstract Design Elements */}
          <div style={{ 
            position: 'absolute', 
            top: '-50px', 
            right: '-50px', 
            width: '150px', 
            height: '150px', 
            background: 'rgba(0, 212, 255, 0.05)', 
            borderRadius: '50%' 
          }}></div>
          <div style={{ 
            position: 'absolute', 
            bottom: '-20px', 
            left: '100px', 
            width: '100px', 
            height: '100px', 
            background: 'rgba(124, 58, 237, 0.05)', 
            borderRadius: '50%' 
          }}></div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', background: 'var(--accent)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                <ShieldCheck size={20} />
              </div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#fff', letterSpacing: '1px' }}>AKIN DRONE ACADEMY</div>
            </div>
            <Badge variant="blue" style={{ fontSize: '10px' }}>STUDENT PILOT</Badge>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '12px', 
              border: '2px solid rgba(255,255,255,0.1)',
              background: 'url(https://i.pravatar.cc/150?u=student) center/cover'
            }}></div>
            
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>Mohammed Rafi</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>ID: ADA-2025-0492</div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Course</div>
                  <div style={{ fontSize: '11px', color: '#fff' }}>Aerial Cinematography</div>
                </div>
                <div>
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Expires</div>
                  <div style={{ fontSize: '11px', color: '#fff' }}>Dec 2025</div>
                </div>
              </div>
            </div>

            <div style={{ alignSelf: 'flex-end' }}>
              <QrCode size={48} color="rgba(255,255,255,0.8)" />
            </div>
          </div>

          <div style={{ 
            position: 'absolute', 
            bottom: '0', 
            left: '0', 
            right: '0', 
            height: '4px', 
            background: 'linear-gradient(to right, var(--accent), var(--accent4))' 
          }}></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '40px' }}>
        <Card>
          <CardHeader title="Field Permission Info" />
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <ShieldCheck size={20} color="var(--accent3)" />
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Authorized for Nano & Micro category drones in designated training fields.</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Phone size={20} color="var(--text-muted)" />
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Emergency Support: +91 98765 43210</div>
            </div>
          </div>
        </Card>
        
        <Card>
          <CardHeader title="ID Verification" />
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Scanning the QR code on the front will link to your official ADA profile for real-time verification of credentials.
            </p>
            <Button variant="ghost" size="sm" onClick={() => alert('Verification Successful! Status: Active Student Pilot')}>Verify My Status</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
