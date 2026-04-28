# Initializing Page + Enhanced Hero — Integration Guide

Complete setup for your new landing page sequence:
1. **InitializingPage** — Pre-loading gate (appears first)
2. **EnhancedHero** — Hero section with improved hierarchy (appears after)

---

## File Overview

### 1. InitializingPage.jsx
**Purpose:** System boot sequence animation that plays before the portfolio loads.

**Sequence (4.5s total):**
- 0-1.5s: "PORTFOLIO" text scrambles in (█████ → random chars → final)
- 0.5-2.5s: Progress bar animates 0→100% with realistic stutters
- 1-2.5s: System logs appear (terminal style)
- 2.5-3s: Red flash, screen cracks
- 3-3.5s: Voronoi glass shards explode outward
- 3.5-4.5s: Fade to Hero page
- 4.5s+: Unmounts, Hero becomes visible

**Key Features:**
- Scramble effect on "PORTFOLIO" headline
- Realistic progress bar with stutter points (18%, 45%, 72%, 88%, 95%)
- System logs with terminal aesthetic
- Glass shatter + Voronoi shard effects
- Red glow and crack lines
- Smooth fade transition to Hero

**Props:**
```jsx
<InitializingPage onComplete={() => setInitialized(true)} />
```

---

### 2. EnhancedHero.jsx
**Purpose:** Hero section with improved text hierarchy and clear CTA.

**Visual Hierarchy:**
1. Name dominates (8.5vw) → **ANGELINA CHATTERJEE**
2. Tagline underneath (2.2vw) → **STILL DEBUGGING LIFE. SHIPPING CODE.**
3. CTA button → **VIEW MY WORK ↓**
4. Secondary badges → GSSoC '26 · SSoC '26 · Open to Opportunities
5. Scroll indicator → Animated chevron bouncing

**Key Features:**
- Shatter fragments positioned as background layer (z-index behind text)
- Text scrambles in on load
- Tagline split: purple + white for emphasis
- Button hover: slides up + glows
- Animated chevron scroll indicator
- Responsive scaling with clamp()
- Ambient purple glow
- Custom cursor integration ready

---

## Setup Instructions

### Step 1: Copy Files to Your Project

```
src/
  pages/
    InitializingPage.jsx
    EnhancedHero.jsx
```

### Step 2: Update App.jsx or main layout

```jsx
import { useState } from 'react';
import InitializingPage from './pages/InitializingPage';
import EnhancedHero from './pages/EnhancedHero';
import About from './sections/About';
import Projects from './sections/Projects';
// ... other sections

export default function App() {
  const [initialized, setInitialized] = useState(false);

  return (
    <>
      {/* Initializing gate — shows first */}
      {!initialized && (
        <InitializingPage onComplete={() => setInitialized(true)} />
      )}

      {/* Main portfolio — shows after initialization */}
      {initialized && (
        <>
          <EnhancedHero />
          <About />
          <Projects />
          <ProcessBreakdown />
          <ContributionsTimeline />
          {/* ... rest of sections */}
        </>
      )}
    </>
  );
}
```

### Step 3: Ensure About section has correct ID

For the "VIEW MY WORK ↓" button to work, your About section needs an ID:

```jsx
// In About.jsx
<section id="about" ...>
```

Or update the handleViewWork function in EnhancedHero:

```jsx
const handleViewWork = () => {
  // Change "about" to whatever your next section ID is
  document.getElementById("your-section-id")?.scrollIntoView({ 
    behavior: "smooth" 
  });
};
```

---

## Customization Guide

### InitializingPage

**Change the "PORTFOLIO" text:**
```jsx
// Line ~145 (in scramble effect)
const text = "YOUR_TEXT_HERE";
```

**Change system log messages:**
```jsx
// Line ~155
const logLines = [
  "Your custom log 1",
  "Your custom log 2",
  // ... etc
];
```

**Adjust animation timings:**
```jsx
// Line ~166
const timer1 = setTimeout(() => setCrackPhase(1), 2500);  // Start cracks
const timer2 = setTimeout(() => setCrackPhase(2), 3000);  // Start shatter
const timer3 = setTimeout(() => onComplete(), 4500);      // Complete
```

**Change progress bar duration:**
```jsx
// Line ~76
const duration = 2500; // milliseconds
```

### EnhancedHero

**Change the tagline:**
```jsx
// Line ~156
<span style={{ color: "#8B5CF6" }}>YOUR TEXT HERE.</span>
<br />
<span style={{ color: "#F0EEF6" }}>YOUR TEXT HERE.</span>
```

**Change button text:**
```jsx
// Line ~189
VIEW MY WORK ↓
```

**Adjust shatter fragment count:**
```jsx
// Line ~124
{Array.from({ length: 48 }).map((_, i) => (
  // Change 48 to your desired count
```

**Change badge text/colors:**
```jsx
// Line ~198
{[
  { label: "YOUR BADGE", color: "#COLOR_HEX" },
  // ... etc
]}
```

---

## Animation Timing Details

### InitializingPage Timeline

| Time | Event | Duration |
|------|-------|----------|
| 0.0s | Page appears, glow fades in | - |
| 0.4s | Text scramble starts | 1.1s |
| 0.6s | System logs start appearing | 1.7s |
| 0.5s | Progress bar starts (with stutters) | 2.0s |
| 2.5s | Red flash, cracks animate | 0.5s |
| 3.0s | Shards explode outward | 0.5s |
| 3.5s | Content fades, transition begins | 1.0s |
| 4.5s | Complete, Hero becomes visible | - |

### EnhancedHero Timeline

| Delay | Element | Animation |
|-------|---------|-----------|
| 0.2s | Name | Scramble effect |
| 0.5s | Tagline | Fade + slide up |
| 0.6s | Divider line | Scale in from center |
| 0.7s | CTA button | Fade in, hover lifts |
| 0.8s | Badges | Fade in together |
| 2.0s | Chevron | Bounce infinitely |

---

## Browser Support & Performance

### Tested On
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance Optimizations
- No external animation libraries (pure CSS/React)
- Hardware acceleration via transform/opacity
- requestAnimationFrame for smooth 60fps
- Lazy rendering of shatter fragments
- Minimal repaints during animations

### Mobile Considerations
- Text scales responsively with clamp()
- Shatter fragments reduced on small screens (optional)
- Button remains tap-friendly (min 44px height)
- Animations continue smoothly on iOS/Android

---

## Troubleshooting

### InitializingPage won't complete?
- Check that `onComplete` callback is passed and being called
- Verify setTimeout timers are not being cleared prematurely
- Check browser console for errors

### Hero text is tiny/huge?
- clamp() values scale based on viewport
- Adjust: `clamp(min, preferred, max)` in font-size
- Example: `clamp(3rem, 8.5vw, 10rem)`

### Button click doesn't scroll?
- Ensure target section has `id="about"` or matching ID
- Update `handleViewWork` function if using different ID
- Check for scroll behavior: smooth support (polyfill if needed)

### Animations feel laggy?
- Check for CSS will-change conflicts
- Reduce shatter fragment count from 48 to 32-40
- Disable motion if user has prefers-reduced-motion

---

## Advanced: Custom Colors

All accent colors can be changed globally by updating:

**InitializingPage:** 
- Progress bar: `linear-gradient(90deg, #8B5CF6, #00D2BE, #8B5CF6)`
- Cracks/shards: `#e10600` (red)
- Glow: `rgba(139,92,246,0.12)` (purple)

**EnhancedHero:**
- Tagline purple: `#8B5CF6`
- Button color: `#8B5CF6`
- Badge colors: Update in badge array

---

## Next Steps

1. ✅ Copy both files to your project
2. ✅ Update App.jsx with initialization state
3. ✅ Ensure About section has `id="about"`
4. ✅ Test on desktop and mobile
5. ✅ Customize colors/text to match your brand
6. ✅ Deploy!

---

## Support

- No external dependencies required (beyond React)
- Pure CSS animations + requestAnimationFrame
- Fully responsive
- Production-ready

Ship it. 🚀
