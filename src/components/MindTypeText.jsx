import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * MindTypeText
 *
 * Text animation that simulates MindType correction: characters start scrambled and
 * are corrected by a left-to-right wave. Behind the wave: corrected and white; in the
 * active wave: continues scrambling with blue highlight; ahead: gray scrambled.
 *
 * Optimized for Framer import with configurable props and sensible defaults.
 */
const MindTypeText = ({
  // Content
  text = 'type at the speed of thought',

  // Typography
  fontFamily = 'Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
  fontSizeDesktop = 120,
  fontSizeMobile = 60,
  fontWeight = 400,
  letterSpacing = -0.03,
  lineHeight = 0.9,

  // Colors
  colorScrambled = '#6B7280',
  colorCorrected = '#FFFFFF',
  colorActiveRGBA = 'rgba(59, 130, 246, 0.3)',
  colorFlashRGBA = 'rgba(34, 197, 94, 0.4)',

  // Core timing
  waveSpeedMs = 80,      // time between each character correction
  waveWidth = 4,         // number of characters in active region
  scrambleIntensity = 0.7, // probability of scramble within wave (0-1)

  // Visual effects
  activeOpacity = 0.3,
  flashDurationMs = 1000,
  characterScale = 1.05,

  // Scroll behavior
  scrollThreshold = 0.1,
  triggerOnce = true,
  animationDelayMs = 100,

  // Styling
  className = '',
  style = {},
}) => {
  const { ref, inView } = useInView({ threshold: scrollThreshold, triggerOnce });

  // Derived typography for responsiveness
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Character pool pre-generated for scrambling
  const scramblePool = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  const characters = useMemo(() => text.split(''), [text]);
  const total = characters.length;

  // State for animation
  const [waveIndex, setWaveIndex] = useState(-1); // last permanently corrected index
  const [isAnimating, setIsAnimating] = useState(false);
  const [flashingIndices, setFlashingIndices] = useState(new Set());
  const [started, setStarted] = useState(false);

  const intervalRef = useRef(null);
  const rafRef = useRef(0);

  // Start animation when in view
  useEffect(() => {
    if (!inView) return;
    const start = () => {
      if (started) return;
      setStarted(true);
      setIsAnimating(true);
      // delay start if requested
      const timeout = setTimeout(() => {
        // Use rAF loop with an internal clock to emit steps every waveSpeedMs
        let lastTs = 0;
        let acc = 0;
        const step = (ts) => {
          if (!lastTs) lastTs = ts;
          const dt = ts - lastTs;
          lastTs = ts;
          acc += dt;
          // advance in multiples of waveSpeedMs to avoid drift
          while (acc >= waveSpeedMs) {
            setWaveIndex((prev) => {
              const next = prev + 1;
              if (next >= total) {
                setIsAnimating(false);
                cancelAnimationFrame(rafRef.current);
                return total - 1;
              }
              // mark newly corrected index for flash
              setFlashingIndices((old) => {
                const clone = new Set(old);
                clone.add(next);
                // clear flash later
                setTimeout(() => {
                  setFlashingIndices((o2) => {
                    const c2 = new Set(o2);
                    c2.delete(next);
                    return c2;
                  });
                }, flashDurationMs);
                return clone;
              });
              return next;
            });
            acc -= waveSpeedMs;
          }
          rafRef.current = requestAnimationFrame(step);
        };
        rafRef.current = requestAnimationFrame(step);
      }, Math.max(0, animationDelayMs));
      // cleanup if unmounted before timeout fires
      intervalRef.current = timeout;
    };
    start();
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [inView, started, total, waveSpeedMs, animationDelayMs, flashDurationMs]);

  const getScrambledChar = useCallback(() => {
    const r = Math.floor(Math.random() * scramblePool.length);
    return scramblePool[r];
  }, [scramblePool]);

  // Render a character based on its position relative to the wave
  const renderChar = useCallback((char, index) => {
    const isBehind = index <= waveIndex; // permanently corrected
    const isInWave = index > waveIndex && index <= waveIndex + waveWidth;
    const isAhead = index > waveIndex + waveWidth;

    // Decide visual state
    let displayChar = char;
    let color = colorCorrected;
    let background = 'transparent';
    let scale = 1;

    if (isBehind) {
      displayChar = char; // corrected
      color = colorCorrected;
      // brief flash effect for newly corrected
      if (flashingIndices.has(index)) {
        background = colorFlashRGBA;
      }
    } else if (isInWave) {
      // scramble with probability
      displayChar = Math.random() < scrambleIntensity ? getScrambledChar() : char;
      color = colorScrambled;
      background = colorActiveRGBA;
      scale = characterScale;
    } else if (isAhead) {
      // ahead remains scrambled/dim
      displayChar = getScrambledChar();
      color = colorScrambled;
    }

    return (
      <motion.span
        key={`${index}-${char}`}
        aria-hidden
        style={{
          display: 'inline-block',
          color,
          background,
          lineHeight,
          letterSpacing: `${letterSpacing}em`,
          transformOrigin: 'bottom center',
          willChange: 'transform, color, background',
        }}
        animate={{ scale }}
        transition={{ duration: 0.08 }}
      >
        {displayChar}
      </motion.span>
    );
  }, [waveIndex, waveWidth, scrambleIntensity, colorCorrected, colorScrambled, colorActiveRGBA, colorFlashRGBA, flashingIndices, characterScale, lineHeight, letterSpacing, getScrambledChar]);

  const computedFontSize = isMobile ? fontSizeMobile : fontSizeDesktop;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        fontFamily,
        fontWeight,
        lineHeight,
        color: colorScrambled,
        backgroundColor: '#000000',
        textAlign: 'left',
      }}
    >
      <div
        style={{
          fontSize: `${computedFontSize}px`,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          userSelect: 'none',
        }}
      >
        {characters.map((ch, i) => renderChar(ch, i))}
      </div>
    </div>
  );
};

// Framer-friendly defaults
MindTypeText.defaultProps = {
  text: 'type at the speed of thought',
  fontSizeDesktop: 120,
  fontSizeMobile: 60,
  fontWeight: 400,
  letterSpacing: -0.03,
  lineHeight: 0.9,
  colorScrambled: '#6B7280',
  colorCorrected: '#FFFFFF',
  colorActiveRGBA: 'rgba(59, 130, 246, 0.3)',
  colorFlashRGBA: 'rgba(34, 197, 94, 0.4)',
  waveSpeedMs: 80,
  waveWidth: 4,
  scrambleIntensity: 0.7,
  activeOpacity: 0.3,
  flashDurationMs: 1000,
  characterScale: 1.05,
  scrollThreshold: 0.1,
  triggerOnce: true,
  animationDelayMs: 100,
};

export default MindTypeText;


