import React, { useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { MindTypeText } from '../src/components/index.js'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const blocks = [
  'type at the speed of thought',
  'Mind::Type transforms',
  'the way you write',
  'by understanding your intent',
  'and perfecting your expression'
]

function RevealBlock({ children, threshold = 0.25 }) {
  const ref = useRef(null)
  const { ref: inViewRef, inView } = useInView({ threshold, triggerOnce: false })

  // Use a combined ref so both Framer Motion and IntersectionObserver get the same node
  const setRefs = (node) => {
    ref.current = node
    inViewRef(node)
  }

  return (
    <motion.div
      ref={setRefs}
      initial={{ opacity: 0, filter: 'blur(20px)' }}
      animate={inView ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(20px)' }}
      transition={{
        // Enter: smooth, natural
        opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        filter: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        // Exit: exponential ease-in feel
        when: 'beforeChildren'
      }}
      style={{ willChange: 'opacity, filter' }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  return (
    <div style={{ background: '#000', minHeight: '200vh', padding: '8rem 2rem' }}>
      <div className="spacer" />
      {blocks.map((text, i) => (
        <RevealBlock key={i} threshold={0.25}>
          <div style={{ marginBottom: '4rem' }}>
            <MindTypeText
              text={text}
              fontSizeDesktop={80}
              fontSizeMobile={48}
              letterSpacing={-0.03}
              lineHeight={0.92}
              waveSpeedMs={60}
              waveWidth={4}
              scrambleIntensity={0.7}
              scrollThreshold={0.25}
              triggerOnce={true}
              animationDelayMs={50}
            />
          </div>
        </RevealBlock>
      ))}
      <div className="spacer" />
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)


