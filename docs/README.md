# Mind::Type Framer Components

Professional React components optimized for seamless Framer integration via GitHub Sync.

## 🚀 Quick Framer Setup

### 1. Upload to GitHub
- Create a new GitHub repository
- Upload all files from this directory
- Ensure the repository is public or accessible to Framer

### 2. Install GitHub Sync in Framer
- Open Framer → Marketplace
- Search "GitHub Sync" → Install (free)
- Connect your GitHub account
- Select this repository

### 3. Import Components
- Point to `/src/components/` directory
- Select components to sync
- Components appear in your Framer library

### 4. Use in Framer
- Drag components onto canvas
- Configure props in property panel
- Style with Framer's visual tools

## 📦 Components Included

### AirportTextReveal
**Wave animation that transforms scrambled text into clean text**

```jsx
<AirportTextReveal 
  originalText="Mind::Type turns messy typing into clean prose"
  scrambledText="Mxnd::Typr turnz mrssy typxng xnto clran prosr"
  duration={2.4}
  charSpeed={60}
  randomness={0.5}
/>
```

**Key Props:**
- `originalText` - The final clean text
- `scrambledText` - The initial scrambled version
- `duration` - Animation duration (seconds)
- `charSpeed` - Character change speed (milliseconds)
- `randomness` - Wave randomness (0-1)
- `threshold` - Scroll trigger point (0-1)
- `triggerOnce` - Animate once or repeatedly

### FloatingNav
**Apple-style floating navigation with scroll behavior**

```jsx
<FloatingNav 
  logoText="Mind::Type"
  navItems={["Features", "Specs", "Try It"]}
  ctaText="Get Access"
  showOnScroll={true}
/>
```

**Key Props:**
- `logoText` - Brand text
- `navItems` - Array of navigation links
- `ctaText` - Call-to-action button text
- `showOnScroll` - Appear on scroll
- `scrollThreshold` - Pixels to scroll before showing
- `backgroundColor` - Background color (rgba)

### VideoBackground
**Parallax video background with glass effects**

```jsx
<VideoBackground 
  videoSrc="/your-video.webm"
  enableParallax={true}
  blurAmount={80}
  overlayColor="rgba(0, 0, 0, 0.1)"
/>
```

**Key Props:**
- `videoSrc` - Video file path
- `enableParallax` - Parallax scroll effect
- `parallaxStrength` - Parallax intensity (0-1)
- `blurAmount` - Backdrop blur (pixels)
- `overlayColor` - Glass overlay color

## 🎯 Framer Integration Tips

### Property Panel Configuration
All props are automatically available in Framer's property panel:
- **Text fields** for content (originalText, scrambledText, etc.)
- **Number sliders** for timing (duration, charSpeed, etc.)
- **Color pickers** for styling (backgroundColor, textColor, etc.)
- **Checkboxes** for boolean options (triggerOnce, enableParallax, etc.)

### Responsive Design
- Components inherit Framer's responsive breakpoints
- Use Framer's responsive controls for different screen sizes
- Typography scales automatically with container

### Animation Timing
- Components use optimized defaults for smooth 60fps performance
- Adjust `duration` and `charSpeed` for different feels
- Test on mobile devices for performance

### Scroll Behavior
- `AirportTextReveal` uses intersection observer for efficient scroll detection
- `FloatingNav` responds to scroll position automatically
- `VideoBackground` parallax is GPU-accelerated

## 🔄 Development Workflow

### Making Changes
1. **Edit components** in your code editor
2. **Push to GitHub** repository
3. **Changes auto-sync** to Framer
4. **Test in Framer** preview mode

### Best Practices
- **Test locally** before pushing to GitHub
- **Use semantic versioning** for major changes
- **Document prop changes** in commit messages
- **Keep components focused** on single responsibilities

## 📱 Mobile Optimization

All components are optimized for mobile:
- **Touch-friendly** interactions
- **Performant animations** (60fps target)
- **Responsive typography** scaling
- **Efficient scroll detection**

## 🎨 Styling in Framer

### Typography
- Use Framer's text styling controls
- Components inherit font family, size, and color
- `className` prop accepts Framer's style classes

### Layout
- Components work with Framer's auto-layout
- Responsive behavior built-in
- Proper z-index management for layering

### Colors
- Use Framer's color picker for all color props
- Supports rgba, hex, and CSS color names
- Dark/light mode compatible

## 🚀 Deployment

### From Framer
- **Publish directly** from Framer for hosting
- **Export code** for custom deployment
- **Components maintain** full functionality

### Performance
- **Optimized bundle size** with tree shaking
- **Lazy loading** for scroll-triggered animations
- **GPU acceleration** for smooth effects

---

## 📞 Support

For questions about these components:
- Check component prop documentation above
- Test in the `/test` route for parameter tuning
- Refer to Framer's GitHub Sync documentation

**Ready to create amazing experiences!** 🎉

