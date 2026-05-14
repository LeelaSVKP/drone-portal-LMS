import { useState } from 'react'
import { Card, CardHeader, Badge, Button, Avatar, Modal } from '../../components/shared/SharedComponents'
import { MessageCircle, ThumbsUp, Share2, MoreHorizontal, MessageSquare, Flame } from 'lucide-react'
import styles from './StudentDashboard.module.css'

export default function CommunityForum() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Vikram Mehta',
      role: 'Advanced Pilot',
      time: '2h ago',
      content: 'Just finished a 10km survey mission with the Mavic 3 Enterprise. The RTK accuracy is mind-blowing. Any tips on processing large point clouds in Pix4D?',
      likes: 24,
      replies: 8,
      trending: true
    },
    {
      id: 2,
      author: 'Anjali Singh',
      role: 'Student',
      time: '5h ago',
      content: 'Passed my DGCA ground exam today! Huge thanks to Trainer Priya for the extra sessions on aerodynamics.',
      likes: 42,
      replies: 12,
      trending: false
    },
    {
      id: 3,
      author: 'Kiran Babu',
      role: 'Instructor',
      time: 'Yesterday',
      content: 'Reminder: New No-Fly Zone active near Gachibowli Stadium due to a VIP event. Stay updated with DigitalSky map before your flights.',
      likes: 15,
      replies: 3,
      trending: false
    }
  ])
  const [showModal, setShowModal] = useState(false)
  const [newPostContent, setNewPostContent] = useState('')

  const handleLike = (id) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        const isLiked = p.isLiked;
        return { 
          ...p, 
          likes: isLiked ? p.likes - 1 : p.likes + 1,
          isLiked: !isLiked
        }
      }
      return p
    }))
  }

  const handleComment = (post) => {
    alert(`Opening comments for: "${post.content.substring(0, 30)}..."`)
  }

  const handleShare = (post) => {
    if (navigator.share) {
      navigator.share({
        title: 'Drone Pilot Discussion',
        text: post.content,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Link copied to clipboard!');
      navigator.clipboard.writeText(window.location.href);
    }
  }

  const handlePostDiscussion = () => {
    if (!newPostContent.trim()) return
    const newPost = {
      id: Date.now(),
      author: 'Mohammed Rafi', // Current user
      role: 'Student',
      time: 'Just now',
      content: newPostContent,
      likes: 0,
      replies: 0,
      trending: false,
      isLiked: false
    }
    setPosts([newPost, ...posts])
    setShowModal(false)
    setNewPostContent('')
  }

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
        <div style={{ flex: 1 }}>
          <div className={styles.title}>Pilot Community</div>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(0, 212, 255, 0.2)' }}
        >
          <MessageSquare size={18} />
          <span>New Discussion</span>
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
        {/* Main Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {posts.map(post => (
            <Card key={post.id}>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                      {post.author[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>{post.author}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{post.role} • {post.time}</div>
                    </div>
                  </div>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: '1.6', marginBottom: '20px' }}>{post.content}</p>

                <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                  <button 
                    onClick={() => handleLike(post.id)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px', 
                      background: 'none', 
                      border: 'none', 
                      color: post.isLiked ? 'var(--accent)' : 'var(--text-muted)', 
                      cursor: 'pointer', 
                      fontSize: '13px',
                      transition: 'all 0.2s'
                    }} 
                  >
                    <ThumbsUp size={16} fill={post.isLiked ? 'var(--accent)' : 'none'} />
                    <span>{post.likes}</span>
                  </button>
                  <button 
                    onClick={() => handleComment(post)}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '13px' }}
                  >
                    <MessageCircle size={16} />
                    <span>{post.replies} Replies</span>
                  </button>
                  <button 
                    onClick={() => handleShare(post)}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '13px' }}
                  >
                    <Share2 size={16} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card>
            <CardHeader title="Trending Topics" />
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text)' }}>#DGCA_Rules</span>
                <Badge variant="blue" style={{ fontSize: '9px' }}>1.2k posts</Badge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text)' }}>#Mavic3Pro</span>
                <Badge variant="blue" style={{ fontSize: '9px' }}>840 posts</Badge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text)' }}>#FPV_Racing</span>
                <Badge variant="blue" style={{ fontSize: '9px' }}>560 posts</Badge>
              </div>
            </div>
          </Card>

          <Card style={{ background: 'rgba(255, 215, 0, 0.05)', borderColor: 'rgba(255, 215, 0, 0.2)' }}>
            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffd700', marginBottom: '8px' }}>
                <Flame size={18} />
                <span style={{ fontSize: '14px', fontWeight: '700' }}>Hot Discussed</span>
              </div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text)', marginBottom: '4px' }}>Is the Neo drone worth it for beginners?</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>42 pilots currently discussing</div>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Start a New Discussion"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handlePostDiscussion} disabled={!newPostContent.trim()}>Post Discussion</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px' }}>M</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>Mohammed Rafi</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Posting to Community Feed</div>
            </div>
          </div>
          <textarea
            placeholder="What's on your mind? Share a tip, ask a question, or show off your latest flight..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              color: '#fff',
              minHeight: '150px',
              fontSize: '14px',
              lineHeight: '1.6',
              outline: 'none'
            }}
          ></textarea>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Badge variant="blue" style={{ cursor: 'pointer' }}>#DGCA</Badge>
            <Badge variant="blue" style={{ cursor: 'pointer' }}>#Training</Badge>
            <Badge variant="blue" style={{ cursor: 'pointer' }}>#Help</Badge>
          </div>
        </div>
      </Modal>
    </div>
  )
}
