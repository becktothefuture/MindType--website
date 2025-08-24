import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * FloatingNav Component
 * 
 * Apple-style floating navigation bar that appears on scroll.
 * Optimized for Framer import with configurable props.
 */
const FloatingNav = ({
  // Content
  logoText = "Mind::Type",
  navItems = ["Features", "Specs", "Try It"],
  ctaText = "Get Access",
  
  // Behavior
  showOnScroll = true,
  scrollThreshold = 100,
  
  // Styling
  backgroundColor = "rgba(0, 0, 0, 0.2)",
  backdropBlur = "xl",
  borderColor = "rgba(255, 255, 255, 0.1)",
  textColor = "#ffffff",
  
  // Callbacks (for Framer interactions)
  onLogoClick = () => {},
  onNavClick = (item) => {},
  onCtaClick = () => {},
}) => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(!showOnScroll);

  // Show/hide based on scroll position
  useEffect(() => {
    if (!showOnScroll) return;

    const unsubscribe = scrollY.onChange((latest) => {
      setIsVisible(latest > scrollThreshold);
    });

    return () => unsubscribe();
  }, [scrollY, showOnScroll, scrollThreshold]);

  // Smooth opacity animation
  const opacity = useTransform(
    scrollY,
    [0, scrollThreshold, scrollThreshold + 50],
    [0, 0, 1]
  );

  const NavLink = ({ children, onClick }) => (
    <motion.button
      onClick={() => onClick(children)}
      className="text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer bg-transparent border-none"
      style={{ color: textColor }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );

  return (
    <motion.nav
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: showOnScroll ? (isVisible ? 1 : 0) : 1, 
        y: 0 
      }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ opacity: showOnScroll ? opacity : 1 }}
    >
      <div 
        className="backdrop-blur-xl border rounded-full px-8 py-3"
        style={{
          backgroundColor,
          borderColor,
          backdropFilter: `blur(${backdropBlur === 'xl' ? '24px' : '12px'})`,
        }}
      >
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <motion.button
            onClick={onLogoClick}
            className="font-light text-lg tracking-tight cursor-pointer bg-transparent border-none"
            style={{ color: textColor }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {logoText}
          </motion.button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <NavLink key={index} onClick={onNavClick}>
                {item}
              </NavLink>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={onCtaClick}
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer border-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {ctaText}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

// Framer property controls configuration
FloatingNav.defaultProps = {
  logoText: "Mind::Type",
  navItems: ["Features", "Specs", "Try It"],
  ctaText: "Get Access",
  showOnScroll: true,
  scrollThreshold: 100,
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  backdropBlur: "xl",
  borderColor: "rgba(255, 255, 255, 0.1)",
  textColor: "#ffffff",
};

export default FloatingNav;

