// Mind::Type Framer Components
// Export all components for easy importing

export { default as AirportTextReveal } from './AirportTextReveal.jsx';
export { default as FloatingNav } from './FloatingNav.jsx';
export { default as VideoBackground } from './VideoBackground.jsx';

// Component metadata for Framer
export const componentInfo = {
  AirportTextReveal: {
    description: "Wave animation that transforms scrambled text into clean text",
    category: "Text Effects",
    tags: ["animation", "text", "scroll", "wave"]
  },
  FloatingNav: {
    description: "Apple-style floating navigation bar with scroll behavior",
    category: "Navigation", 
    tags: ["navigation", "floating", "scroll", "apple"]
  },
  VideoBackground: {
    description: "Parallax video background with glass overlay effects",
    category: "Backgrounds",
    tags: ["video", "parallax", "background", "glass"]
  }
};

