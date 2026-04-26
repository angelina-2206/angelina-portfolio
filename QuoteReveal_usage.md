# QuoteReveal — Drop-in Usage Guide

## Install
No extra packages needed. Pure React + inline styles.

## Drop into your portfolio

```jsx
// In App.jsx or your main layout
import QuoteReveal from './QuoteReveal';

export default function App() {
  return (
    <main>
      <Hero />
      <About />
      <QuoteReveal />   {/* ← place between any two sections */}
      <Projects />
      <Contact />
    </main>
  );
}
```

## Customise the quote

Edit the `PHRASES` array at the top of QuoteReveal.jsx:

```js
const PHRASES = [
  { id: "w1", text: "Performance",               highlight: false, size: "hero" },
  { id: "w2", text: "Settles",                   highlight: false, size: "hero" },
  { id: "w3", text: "Conversations.",            highlight: true,  size: "hero" },  // lavender + glow
  { id: "w4", text: "Everything else follows.",  highlight: false, size: "sub"  },
];
```

- `highlight: true` → lavender color (#C4B5FD) + italic + glow
- `size: "hero"` → massive text (clamp 2.4rem → 7rem)
- `size: "sub"`  → smaller closing line (clamp 1.2rem → 3rem)

## Adjust timing

```js
// Scroll progress (0→1) when each word STARTS revealing
const THRESHOLDS = [0.08, 0.22, 0.40, 0.58];

// How wide each reveal window is (bigger = slower reveal)
const WINDOWS    = [0.12, 0.12, 0.14, 0.16];
```

## Adjust how long the sticky section lasts

```js
const SECTION_HEIGHT = "420vh"; // increase for more dramatic pacing
                                 // decrease for faster pacing
```

## Colors
- Background: `#050505`
- Body text: `#F0EEF6`
- Highlighted word: `#C4B5FD` (lavender)
- Accent glow: `rgba(139,92,246,...)`
- Progress dots: `#8B5CF6`
