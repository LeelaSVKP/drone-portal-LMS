import { useState, useRef, useEffect } from 'react'
import { MessageSquare, Send, X, Bot, User, Sparkles, Volume2, VolumeX } from 'lucide-react'
import sharedStyles from './SharedComponents.module.css'

export default function AIFlightAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true) // Default to true as user wants it active
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello Pilot! I am your ADA Flight Assistant. How can I help you today with drone regulations, technical issues, or training?' }
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const speak = (text) => {
    if (!isVoiceEnabled) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.0
    utterance.pitch = 1.0
    window.speechSynthesis.speak(utterance)
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = { role: 'user', text: input }
    setMessages([...messages, userMsg])
    setInput('')

    // Mock bot response
    setTimeout(() => {
      let response = "I'm analyzing your request. Based on current drone regulations..."
      const q = input.toLowerCase()

      if (q.includes('nano')) {
        response = "Nano drones (<250g) don't need a license for hobby use. However, you must stay below 50ft altitude and out of No-Fly Zones (NFZ). No UIN is required."
      } else if (q.includes('micro')) {
        response = "Micro drones (250g to 2kg) require a UIN registration and a Remote Pilot License for commercial ops. Max altitude is 200ft."
      } else if (q.includes('license') || q.includes('rpl')) {
        response = "To get an Indian Remote Pilot License (RPL), you need: 1. Age 18-65, 2. Passed 10th std, 3. Training from a DGCA-approved RPTO. Valid for 10 years."
      } else if (q.includes('night') || q.includes('dark')) {
        response = "Night flying requires 'Night Flying' permission on DigitalSky and anti-collision lights. Visual Line of Sight (VLOS) must be maintained."
      } else if (q.includes('weather') || q.includes('rain')) {
        response = "Avoid flying in rain, high winds (>20km/h), or low visibility. It can damage electronics and is unsafe for bystanders."
      } else if (q.includes('digitalsky') || q.includes('registration')) {
        response = "DigitalSky is the DGCA platform for drone registration. You need a UIN (Unique Identification Number) for any drone above Nano category."
      } else if (q.includes('battery') || q.includes('lipo')) {
        response = "LiPo batteries are sensitive. Store them at 3.8V per cell. Never fly below 3.2V per cell. Use a LiPo safe bag for charging."
      } else if (q.includes('hi') || q.includes('hello')) {
        response = "Hello Pilot! I'm ADA. Ask me about drone rules, categories (Nano/Micro), or how to get your license."
      } else if (q.includes('thanks') || q.includes('thank you')) {
        response = "You're welcome! Safe flying! 🚁💨"
      } else {
        response = "That's a specialized topic! For details on '" + input + "', I recommend checking the latest DGCA CAR (Civil Aviation Requirements) Section 3 Series X or asking your instructor."
      }
      
      setMessages(prev => [...prev, { role: 'bot', text: response }])
      speak(response)
    }, 800)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'var(--accent)',
          color: '#0a0e1a',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(0, 212, 255, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          transition: 'transform 0.2s'
        }}
        className="hover-scale"
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '30px',
          width: '350px',
          height: '500px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1001,
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          overflow: 'hidden'
        }} className="fade-in">
          {/* Header */}
          <div style={{ padding: '16px', background: 'var(--accent)', color: '#0a0e1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bot size={20} />
              <div style={{ fontWeight: '700', fontSize: '14px' }}>ADA Flight Assistant</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0a0e1a', display: 'flex', alignItems: 'center' }}
                title={isVoiceEnabled ? 'Mute AI' : 'Unmute AI'}
              >
                {isVoiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0a0e1a' }}>
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '13px',
                lineHeight: '1.4',
                background: m.role === 'user' ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255,255,255,0.05)',
                color: m.role === 'user' ? 'var(--accent)' : 'var(--text)',
                border: `1px solid ${m.role === 'user' ? 'var(--accent)' : 'var(--border)'}`,
                borderBottomRightRadius: m.role === 'user' ? '2px' : '12px',
                borderBottomLeftRadius: m.role === 'user' ? '12px' : '2px'
              }}>
                {m.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} style={{ padding: '12px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about regulations..."
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#fff',
                fontSize: '13px'
              }}
            />
            <button type="submit" style={{ background: 'var(--accent)', color: '#0a0e1a', border: 'none', borderRadius: '8px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Send size={18} />
            </button>
          </form>

          {/* Footer Info */}
          <div style={{ padding: '6px', textAlign: 'center', fontSize: '9px', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <Sparkles size={10} color="var(--accent)" />
            AI trained on DGCA Civil Aviation Requirements (CAR)
          </div>
        </div>
      )}
    </>
  )
}
