import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * AirportTextReveal Component
 * 
 * Creates a wave animation that transforms scrambled text into clean text,
 * simulating the Mind::Type correction behavior.
 * 
 * Perfect for Framer import - all props are configurable via Framer's property panel.
 */
const AirportTextReveal = ({ 
  // Text content
  originalText = "Mind::Type turns messy typing into clean prose",
  scrambledText = "Mxnd::Typr turnz mrssy typxng xnto clran prosr",
  
  // Animation parameters (optimized defaults)
  duration = 2.4,        // Total animation duration in seconds
  charSpeed = 60,        // Speed of character changes in milliseconds
  randomness = 0.5,      // How much randomness in the wave (0-1)
  
  // Scroll behavior
  threshold = 0.1,       // How much of element must be visible to trigger (0-1)
  triggerOnce = true,    // Whether to animate only once or every time scrolled into view
  
  // Styling
  className = "",
  style = {},
  
  // Advanced options
  waveWidth = 5,         // Width of the randomness wave ahead of correction
  enableRandomChars = true, // Whether to use random characters in the wave
}) => {
  const { ref, inView } = useInView({ 
    threshold, 
    triggerOnce 
  });
  
  const [displayText, setDisplayText] = useState(scrambledText);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!inView) return;

    setIsAnimating(true);
    
    // Create wave effect that travels through the entire text
    const totalChars = originalText.length;
    let currentCharIndex = 0;
    let displayArray = scrambledText.split('');

    const animateWave = () => {
      const waveInterval = setInterval(() => {
        if (currentCharIndex >= totalChars) {
          clearInterval(waveInterval);
          setIsAnimating(false);
          setDisplayText(originalText); // Ensure final text is perfect
          return;
        }

        // Create wave effect - correct characters in sequence
        for (let i = 0; i < totalChars; i++) {
          if (i <= currentCharIndex) {
            // Characters behind the wave are corrected
            displayArray[i] = originalText[i];
          } else if (i <= currentCharIndex + waveWidth && enableRandomChars) {
            // Characters in the wave get randomness
            if (Math.random() > randomness) {
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ';
              displayArray[i] = chars[Math.floor(Math.random() * chars.length)];
            } else {
              displayArray[i] = scrambledText[i] || originalText[i];
            }
          } else {
            // Characters ahead of the wave remain scrambled
            displayArray[i] = scrambledText[i] || originalText[i];
          }
        }

        setDisplayText(displayArray.join(''));
        currentCharIndex++;
      }, charSpeed);
    };

    animateWave();
  }, [inView, originalText, scrambledText, duration, charSpeed, randomness, waveWidth, enableRandomChars]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0.1 }}
      animate={inView ? { opacity: 1 } : { opacity: 0.1 }}
      transition={{ duration: 0.3 }}
    >
      <span style={{ 
        fontFamily: 'inherit',
        letterSpacing: 'inherit',
        lineHeight: 'inherit'
      }}>
        {displayText}
      </span>
      {/* Optional animation indicator - remove in production */}
      {isAnimating && process.env.NODE_ENV === 'development' && (
        <span style={{ marginLeft: '8px', color: '#10b981' }}>●</span>
      )}
    </motion.div>
  );
};

// Framer property controls configuration
AirportTextReveal.defaultProps = {
  originalText: "Mind::Type turns messy typing into clean prose",
  scrambledText: "Mxnd::Typr turnz mrssy typxng xnto clran prosr",
  duration: 2.4,
  charSpeed: 60,
  randomness: 0.5,
  threshold: 0.1,
  triggerOnce: true,
  waveWidth: 5,
  enableRandomChars: true,
};

export default AirportTextReveal;

