import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { askNothingAI } from '@/lib/nothingAI'

interface Message {
  role: 'user' | 'ai'
  text: string
}

interface ChatModalProps {
  open: boolean
  onClose: () => void
}

const SUGGESTIONS = [
  'Что купить за $300?',
  'Phone (3) vs Phone (4a) Pro',
  'Лучший Nothing с камерой',
  'Что такое Glyph?',
]

export default function ChatModal({ open, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Привет! Я Nothing Device Expert — спроси меня про любой смартфон Nothing или CMF: характеристики, цены, сравнения.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  const send = async (text: string) => {
    const q = text.trim()
    if (!q || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: q }])
    setLoading(true)
    const answer = await askNothingAI(q)
    setMessages(prev => [...prev, { role: 'ai', text: answer }])
    setLoading(false)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Chat window */}
          <motion.div
            className="fixed z-50 inset-x-4 bottom-4 md:inset-auto md:right-6 md:bottom-6 md:w-[420px] flex flex-col bg-[#0E0E0E] border border-[#1E1E1E]"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E1E1E] flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] shadow-[0_0_6px_#FF4D00]" />
                <span className="text-xs font-mono tracking-widest uppercase text-white/80">Nothing Device Expert</span>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-600 hover:text-white transition-colors font-mono text-lg leading-none"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 text-xs font-mono leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-[#FF4D00]/15 border border-[#FF4D00]/30 text-white'
                        : 'bg-white/[0.03] border border-[#1E1E1E] text-neutral-300'
                    }`}
                  >
                    {msg.role === 'ai' && (
                      <div className="text-[9px] text-[#FF4D00] tracking-widest uppercase mb-1">AI ·</div>
                    )}
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/[0.03] border border-[#1E1E1E] px-3 py-2">
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="w-1 h-1 bg-[#FF4D00] rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[10px] font-mono px-2.5 py-1 border border-neutral-800 text-neutral-500 hover:border-[#FF4D00]/50 hover:text-[#FF4D00] transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-[#1E1E1E] flex gap-2 flex-shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Спроси про любой Nothing..."
                className="flex-1 bg-transparent border border-[#1E1E1E] px-3 py-2 text-xs font-mono text-white placeholder-neutral-700 outline-none focus:border-[#FF4D00]/50 transition-colors"
                disabled={loading}
              />
              <button
                onClick={() => send(input)}
                disabled={loading || !input.trim()}
                className="px-3 py-2 bg-[#FF4D00] text-black text-xs font-mono uppercase tracking-widest disabled:opacity-30 hover:bg-[#FF4D00]/90 transition-colors"
              >
                →
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
