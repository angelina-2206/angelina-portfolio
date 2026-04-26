# Process Breakdown + Contributions + Lap Counter

Complete implementation guide for your portfolio enhancements.

## Files

1. **ProcessBreakdown.jsx** — Interactive project showcase (Problem → Approach → Results)
2. **ContributionsTimeline.jsx** — Community & open-source credits
3. **LapCounter.jsx** — F1-style lap tracker (bottom-right corner)

## Installation

### Step 1: Copy components to your project

```
src/
  components/
    ProcessBreakdown.jsx
    ContributionsTimeline.jsx
    LapCounter.jsx
```

### Step 2: Add to your App.jsx or main layout

```jsx
import ProcessBreakdown from './components/ProcessBreakdown';
import ContributionsTimeline from './components/ContributionsTimeline';
import LapCounter from './components/LapCounter';

export default function App() {
  return (
    <main>
      <Hero />
      <QuoteReveal />
      <About />
      <Skills />
      <Projects />
      <ProcessBreakdown />        {/* ← NEW */}
      <ContributionsTimeline />   {/* ← NEW */}
      <Contact />
      <LapCounter />              {/* ← NEW - wraps entire app */}
    </main>
  );
}
```

## Component Details

### ProcessBreakdown.jsx

**What it does:**
- Displays 4 projects (TrapEye, Burnout Sentinel, PostPehchaan, What If Wizard)
- Left side: clickable project list
- Right side: detail panel with hover reveals
- Hover "Problem" → shows problem statement
- Hover "Approach" → shows your methodology
- Hover "Results" → shows outcomes + awards + tags

**Customisation:**

Edit the `PROJECTS` array in the file:

```js
{
  id: "01",
  name: "YourProjectName",
  subtitle: "Category · Tech Stack",
  problem: "What challenge did you solve?",
  approach: "How did you attack it?",
  results: "What was the outcome?",
  tags: ["Tag1", "Tag2", "Tag3"],
  award: "Award / Status",
  accentColor: "#COLOR",
  accentGrad: "linear-gradient(...)",
  flagship: true/false  // only for one project
}
```

**Colors available:**
- Red: `#E10600`
- Purple: `#8B5CF6`
- Teal: `#00D2BE`
- Orange: `#FF6B35`
- Gold: `#FFD700`

### ContributionsTimeline.jsx

**What it does:**
- Shows 3 cards: GSSoC, SSoC, WIOS
- Hover effects with color accents
- Displays role, description, impact

**Customisation:**

Edit the `CONTRIBUTIONS` array:

```js
{
  id: "01",
  title: "Program Name",
  org: "Organization",
  role: "Your role",
  description: "What you did and why it mattered",
  impact: "Current status / outcome",
  color: "#COLOR",
  icon: "emoji"  // any emoji works
}
```

### LapCounter.jsx

**What it does:**
- Fixed position, bottom-right corner
- Shows current section name (HERO, QUOTE, ABOUT, etc.)
- Displays lap number (01, 02, 03...)
- Pulsing red on FINAL LAP
- Progress bar shows scroll % within current section

**Customisation:**

Edit the `SECTIONS` array to match your page layout:

```js
const SECTIONS = [
  { name: "SECTION_NAME", start: 0, end: 15 },   // 0-15% of page scroll
  { name: "NEXT_SECTION", start: 15, end: 30 },  // 15-30% of page scroll
  // ... etc
];
```

Percentages should add up to 100% total.

**Colors:**
- Default: Purple `#8B5CF6`
- Final lap: Red `#e10600`

## Voice & Tone

All copy has been written in **your voice**:
- Dark, witty, sarcastic
- Brutally honest ("still figuring it out", "building anyway")
- No generic "passionate developer" language
- Reflects your actual GitHub bio

Feel free to edit any copy to match your tone even more closely.

## Performance Notes

- All components use `useRef` + `requestAnimationFrame` for smooth scrolling interactions
- LapCounter runs at 60fps with minimal repaints
- ProcessBreakdown hover states are CSS-based (not animation libraries)
- Safe to use multiple instances

## Mobile Responsiveness

All components are fully responsive using `clamp()` for dynamic sizing:
- Text scales with viewport
- Spacing adapts to screen size
- Touch-friendly hover states (tap to reveal on mobile)

## No Dependencies

These components use only:
- React (useEffect, useState, useRef)
- Vanilla CSS (no Tailwind required, though compatible)
- No GSAP, no Framer Motion, no external libraries

## Next Steps

1. Copy the three files into your project
2. Import them in your main App layout
3. Adjust the copy to your taste
4. Update SECTIONS array in LapCounter to match your page structure
5. Customize colors in ProcessBreakdown (accentColor, accentGrad)

That's it. Ready to deploy.
