import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

/**
 * VideoBackground Component
 * 
 * Parallax video background with glass overlay effects.
 * Optimized for Framer import with configurable props.
 */
const VideoBackground = ({
  // Video source
  videoSrc = "/background-video.webm",
  videoSrcMp4 = "/background-video.mp4",
  
  // Parallax effect
  enableParallax = true,
  parallaxStrength = 0.1, // How much the video moves (0-1)
  
  // Glass overlay
  blurAmount = 80,
  overlayOpacity = 0.1,
  overlayColor = "rgba(0, 0, 0, 0.1)",
  
  // Video behavior
  autoPlay = true,
  loop = true,
  muted = true,
  
  // Vignette effect
  enableVignette = true,
  vignetteOpacity = 0.4,
  vignetteColor = "rgba(0, 0, 0, 0.3)",
  
  // Styling
  className = "",
  style = {},
}) => {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    
    // Force video to play
    if (videoRef.current && autoPlay) {
      videoRef.current.play().catch(e => {
        console.log('Video autoplay failed:', e);
        // Try again after user interaction
        const playVideo = () => {
          videoRef.current?.play();
          document.removeEventListener('click', playVideo);
          document.removeEventListener('touchstart', playVideo);
        };
        document.addEventListener('click', playVideo);
        document.addEventListener('touchstart', playVideo);
      });
    }
  }, [autoPlay]);

  // Parallax effect
  const videoY = useTransform(
    scrollYProgress, 
    [0, 1], 
    ['0vh', `-${parallaxStrength * 50}vh`]
  );
  
  if (!mounted) return null;

  return (
    <div 
      className={`fixed inset-0 w-full h-full overflow-hidden z-0 ${className}`}
      style={style}
    >
      {/* Video element with parallax */}
      <motion.video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{
          y: enableParallax ? videoY : 0,
        }}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        preload="auto"
        onError={(e) => console.error('Video error:', e)}
        onLoadedData={() => {
          if (videoRef.current && autoPlay) {
            videoRef.current.play();
          }
        }}
      >
        <source src={videoSrc} type="video/webm" />
        {videoSrcMp4 && <source src={videoSrcMp4} type="video/mp4" />}
      </motion.video>
      
      {/* Glass overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backdropFilter: `blur(${blurAmount}px) saturate(1.1)`,
          background: overlayColor,
          opacity: overlayOpacity,
        }}
      />
      
      {/* Vignette effect */}
      {enableVignette && (
        <div 
          className="absolute inset-0"
          style={{
            opacity: vignetteOpacity,
            background: `radial-gradient(ellipse at center, transparent 0%, transparent 60%, ${vignetteColor} 100%)`,
          }}
        />
      )}
    </div>
  );
};

// Framer property controls configuration
VideoBackground.defaultProps = {
  videoSrc: "/background-video.webm",
  videoSrcMp4: "/background-video.mp4",
  enableParallax: true,
  parallaxStrength: 0.1,
  blurAmount: 80,
  overlayOpacity: 0.1,
  overlayColor: "rgba(0, 0, 0, 0.1)",
  autoPlay: true,
  loop: true,
  muted: true,
  enableVignette: true,
  vignetteOpacity: 0.4,
  vignetteColor: "rgba(0, 0, 0, 0.3)",
};

export default VideoBackground;

