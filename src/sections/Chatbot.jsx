import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrollRevealText from '../components/ScrollRevealText'

const SYSTEM_PROMPT = `You are AC-01, Angelina Chatterjee's personal AI assistant. You are confident, minimal, and knowledgeable about her work. Answer questions about her skills, projects, achievements, and background. If you don't know something, respond: "That's outside my current context. Reach out directly."

Key facts:
- Full Stack Developer + AI Builder
- CS Business Systems student
- Projects: Burnout Sentinel (AI mental health), PostPehchaan (mail automation), TrapEye (surveillance AI), EcoPulse (environmental dashboard), Sentinelix (mobile security), AquaPredict (water quality ML)
- Skills: Python, JavaScript, React, TensorFlow, PyTorch, Node.js, Flask
- Multiple hackathon wins including 1st at National Hackathon for AI`

const quickPrompts = [
  "What projects has Angelina built?",
  "What tech stack does she use?",
  "Tell me about her achievements",
]

export default function Chatbot() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [messages, setMessages] = useState([
    { role: 'ai', content: "AC-01 online. Ask me anything about Angelina's work." }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const generateResponse = (userMessage) => {
    const msg = userMessage.toLowerCase()
    if (msg.includes('project')) return 'She\'s built 6 major systems: Burnout Sentinel (AI mental health), PostPehchaan (mail automation), TrapEye (surveillance), EcoPulse (environmental data), Sentinelix (mobile security), and AquaPredict (water quality ML).'
    if (msg.includes('tech') || msg.includes('stack') || msg.includes('skill')) return 'Core stack: Python, JavaScript/TypeScript, React, Node.js. AI: TensorFlow, PyTorch, OpenCV, Hugging Face. Backend: Flask, FastAPI, PostgreSQL, MongoDB.'
    if (msg.includes('achieve') || msg.includes('award') || msg.includes('win')) return '1st place at National AI Hackathon (Burnout Sentinel), 2nd at Smart India Hackathon Regional (PostPehchaan), Winner at CodeStorm 2024, plus multiple top finishes.'
    if (msg.includes('contact') || msg.includes('hire') || msg.includes('reach')) return 'Best way is the contact section below. She\'s responsive.'
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) return 'Hey. What would you like to know about Angelina\'s work?'
    return 'Interesting question. For specifics, try asking about her projects, tech stack, or achievements.'
  }

  const handleSend = () => {
    if (!input.trim() || isTyping) return
    const userMsg = input.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: generateResponse(userMsg) }])
      setIsTyping(false)
    }, 800)
  }

  return (
    <section data-section="chatbot" id="chatbot" ref={ref} className="section section-dark">
      <div className="section-number">006</div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
        <motion.div className="section-label" initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
          TERMINAL
        </motion.div>

        <ScrollRevealText as="h2" className="section-title">
          Ask me anything.
        </ScrollRevealText>

        <motion.div
          className="chatbot-container"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="chatbot-header">
            <div className="tri-dots">
              <div className="tri-dot" style={{ background: '#ff5f57' }} />
              <div className="tri-dot" style={{ background: '#febc2e' }} />
              <div className="tri-dot" style={{ background: '#28c840' }} />
            </div>
            <span>AC-01 TERMINAL</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.role === 'ai' ? 'chat-ai' : 'chat-user'}`}>
                {msg.content}
              </div>
            ))}
            {isTyping && (
              <div className="chat-message chat-ai" style={{ opacity: 0.5 }}>
                Thinking...
              </div>
            )}
          </div>

          {/* Quick prompts */}
          <div style={{ padding: '8px 16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => { setInput(prompt); }}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                  padding: '5px 12px', borderRadius: '999px',
                  background: 'var(--color-primary-glow)',
                  border: '1px solid var(--color-border-hover)',
                  color: 'var(--color-primary-light)',
                  transition: 'all 0.2s',
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>SEND</button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
