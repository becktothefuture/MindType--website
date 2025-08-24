# 🎯 Framer Setup Guide

## Step-by-Step Integration

### Step 1: Upload to GitHub
1. **Create new repository** on GitHub
2. **Upload all files** from this folder
3. **Make repository public** (or ensure Framer has access)
4. **Verify structure**: `/src/components/` contains all .jsx files

### Step 2: Install GitHub Sync Plugin
1. **Open Framer** → Go to **Marketplace**
2. **Search "GitHub Sync"** → Click **Install** (free plugin)
3. **Authorize GitHub** → Connect your account
4. **Select repository** → Choose your Mind::Type repo

### Step 3: Configure Component Import
1. **Set source directory** → `/src/components/`
2. **Select components** → Check all three components:
   - ✅ AirportTextReveal.jsx
   - ✅ FloatingNav.jsx  
   - ✅ VideoBackground.jsx
3. **Enable auto-sync** → Changes in GitHub update Framer automatically
4. **Import dependencies** → Plugin handles framer-motion and react-intersection-observer

### Step 4: Use Components in Framer
1. **Components appear** in your Framer component library
2. **Drag AirportTextReveal** onto canvas
3. **Configure in property panel**:
   - Original Text: "Your clean text here"
   - Scrambled Text: "Ypur scrxmblrd trxt hrr"
   - Duration: 2.4
   - Char Speed: 60
   - Randomness: 0.5
4. **Style with Framer tools** → Typography, colors, spacing

### Step 5: Deploy and Iterate
1. **Test in preview** → Check animations work
2. **Publish from Framer** → Get live URL
3. **Make code changes** → Edit in GitHub
4. **Auto-sync to Framer** → No manual re-import needed

## 🎨 Framer Property Panel Controls

### AirportTextReveal
- **Text Fields**: originalText, scrambledText
- **Number Sliders**: duration (0.5-5s), charSpeed (10-200ms)
- **Range Sliders**: randomness (0-1), threshold (0-1)
- **Checkboxes**: triggerOnce, enableRandomChars
- **Advanced**: waveWidth (1-10)

### FloatingNav  
- **Text Fields**: logoText, ctaText
- **Array Field**: navItems (comma-separated)
- **Number Slider**: scrollThreshold (0-500px)
- **Color Pickers**: backgroundColor, textColor, borderColor
- **Checkboxes**: showOnScroll
- **Dropdown**: backdropBlur (sm, md, lg, xl)

### VideoBackground
- **Text Fields**: videoSrc, videoSrcMp4
- **Number Sliders**: blurAmount (0-200px), parallaxStrength (0-1)
- **Color Pickers**: overlayColor, vignetteColor
- **Range Sliders**: overlayOpacity (0-1), vignetteOpacity (0-1)
- **Checkboxes**: enableParallax, autoPlay, loop, muted, enableVignette

## 🚀 Pro Tips

### Performance
- **Test on mobile** → Adjust charSpeed if needed
- **Use triggerOnce: true** → For better performance
- **Optimize video files** → Keep under 10MB for web

### Design
- **Large text works best** → 32px+ for airport effect
- **High contrast** → White text on dark backgrounds
- **Consistent spacing** → Use Framer's auto-layout

### Animation Timing
- **Duration 2-3s** → Sweet spot for readability
- **CharSpeed 50-80ms** → Smooth but not too fast
- **Randomness 0.3-0.7** → Balanced scrambling effect

### Responsive Design
- **Test all breakpoints** → Components adapt automatically
- **Adjust text sizes** → Use Framer's responsive typography
- **Consider mobile performance** → Reduce effects if needed

## 🔧 Troubleshooting

### Components Not Appearing
- ✅ Check repository is public or accessible
- ✅ Verify `/src/components/` directory structure
- ✅ Ensure .jsx files are properly formatted
- ✅ Re-sync in GitHub Sync plugin

### Animation Not Working
- ✅ Check scroll threshold setting (try 0.1)
- ✅ Verify triggerOnce is appropriate for your use
- ✅ Test in Framer preview mode
- ✅ Check browser console for errors

### Performance Issues
- ✅ Reduce charSpeed (increase number)
- ✅ Increase duration for smoother effect
- ✅ Use triggerOnce: true
- ✅ Optimize video file size

### Styling Problems
- ✅ Use Framer's typography controls
- ✅ Set proper text color contrast
- ✅ Check className prop for conflicts
- ✅ Verify responsive breakpoints

## 📱 Mobile Considerations

### Text Size
- **Minimum 24px** → For readability during animation
- **Test on actual devices** → Emulators may not show true performance
- **Consider shorter text** → On small screens

### Performance
- **Reduce randomness** → On slower devices
- **Increase charSpeed** → For smoother animation
- **Test scroll performance** → Especially with video backgrounds

### Touch Interactions
- **Larger touch targets** → For navigation elements
- **Test scroll behavior** → Ensure animations trigger properly
- **Consider reduced motion** → For accessibility

---

**Ready to create amazing text animations in Framer!** 🎉

Need help? Check the main README.md for detailed component documentation.

