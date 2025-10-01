# Visual Hierarchy & Animation Timing Guide
## VoiceGuard Pro - Enhanced Design System

---

## 📐 Visual Hierarchy Principles

### 1. Size Hierarchy
```
Hero Headlines:      72px - 128px (Display, Bold)
Section Headings:    36px - 60px  (Display, Semibold)
Subsection Titles:   24px - 30px  (Primary, Semibold)
Body Text:           16px - 18px  (Primary, Regular)
Small Text:          12px - 14px  (Primary, Medium)
Micro Text:          10px - 12px  (Primary, Regular)
```

### 2. Color Hierarchy
```
Primary Actions:     Gradient (Cyber_1, Aurora_1)
Secondary Actions:   Blue-600 to Blue-700
Tertiary Actions:    Gray-600 to Gray-700
Success States:      Green-500 to Green-600
Warning States:      Yellow-500 to Orange-500
Error States:        Red-500 to Red-600
Neutral Info:        Gray-500
```

### 3. Spacing Hierarchy
```
Section Margins:     96px - 128px
Card Padding:        24px - 48px
Component Spacing:   16px - 32px
Element Spacing:     8px - 16px
Tight Spacing:       4px - 8px
```

### 4. Z-Index Layering
```
Base Layer:          z-0   (Background)
Content Layer:       z-10  (Main content)
Elevated Cards:      z-20  (Cards, panels)
Floating Elements:   z-30  (FABs, badges)
Sticky Navigation:   z-40  (Fixed nav)
Overlays:            z-50  (Modals, dropdowns)
Tooltips:            z-60  (Tooltips, popovers)
Notifications:       z-70  (Toasts, alerts)
Critical Modals:     z-100 (System alerts)
```

---

## ⏱️ Animation Timing Guide

### Instant Feedback (50-100ms)
**When to use:** Immediate user feedback
```
- Button state changes
- Checkbox/radio toggles
- Color changes
- Opacity shifts
```
**Easing:** linear or ease-out
**Example:** `transition: color 50ms linear`

### Quick Actions (150-200ms)
**When to use:** Rapid interactions
```
- Hover states
- Focus indicators
- Small UI element movements
- Icon animations
```
**Easing:** ease-out
**Example:** `transition: transform 150ms ease-out`

### Standard Transitions (300ms)
**When to use:** Most UI transitions
```
- Modal open/close
- Dropdown animations
- Card flips
- Tab switches
- Accordion expand/collapse
```
**Easing:** ease-in-out
**Example:** `transition: all 300ms ease-in-out`

### Emphasized Movements (500ms)
**When to use:** Draw attention
```
- Page transitions
- Large component movements
- Hero animations
- Complex state changes
```
**Easing:** ease-out or custom cubic-bezier
**Example:** `transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1)`

### Dramatic Effects (700-1000ms)
**When to use:** Special moments
```
- Success celebrations
- Achievement unlocks
- Data visualizations
- Loading sequences
```
**Easing:** elastic or bounce
**Example:** `animation: bounce 700ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`

---

## 🎨 Component Animation Patterns

### Buttons
```css
/* Default State */
transition: all 150ms ease-out;

/* Hover */
transform: translateY(-2px);
box-shadow: 0 10px 25px rgba(0,0,0,0.15);

/* Active/Press */
transform: scale(0.98);
transition: all 50ms ease-in;

/* Success State */
animation: check-bounce 700ms ease;
```

### Cards
```css
/* Hover */
transform: translateY(-8px);
box-shadow: 0 20px 40px rgba(0,0,0,0.2);
transition: all 300ms ease-out;

/* 3D Tilt */
transform: perspective(1000px) rotateX(5deg) rotateY(5deg);
transition: transform 300ms ease-out;
```

### Modals
```css
/* Open */
animation: scale-fade-in 300ms ease-out;
backdrop-filter: blur(10px);

/* Close */
animation: scale-fade-out 200ms ease-in;
```

### Toasts/Notifications
```css
/* Appear */
animation: slide-in-right 300ms ease-out;
transform: translateX(0);

/* Dismiss */
animation: slide-out-right 200ms ease-in;
transform: translateX(120%);
```

### Loading States
```css
/* Spinner */
animation: rotate-360 1000ms linear infinite;

/* Skeleton Shimmer */
animation: shimmer 2000ms ease-in-out infinite;
background: linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
background-size: 200% 100%;

/* Progress Bar */
animation: fill 2000ms cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 🎯 Page Load Animation Sequence

### Hero Section
```
1. Background gradient (0ms): Fade in 1000ms
2. Hero headline (200ms): Slide up + fade in 600ms
3. Subheading (400ms): Slide up + fade in 600ms
4. CTA buttons (600ms): Scale in + fade in 400ms
5. Floating cards (800ms): Float in staggered 200ms each
6. Particles (1000ms): Fade in 500ms
```

### Content Sections
```
Trigger: On scroll into viewport
Delay: Each element +100ms
Duration: 600ms
Animation: Slide up + fade in
Easing: ease-out
```

### Stats/Metrics
```
1. Card container: Slide up 300ms
2. Number count-up: 2000ms (spring ease)
3. Icon pulse: Start after number complete
4. Chart draw: 1500ms (ease-in-out)
```

---

## 🔥 Micro-Interaction Timings

### Ripple Effect (Click)
```
Duration: 600ms
Easing: ease-out
Scale: 0 to 2.5
Opacity: 0.3 to 0
```

### Hover Glow
```
Duration: 300ms
Easing: ease-out
Box-shadow: Expand from 10px to 30px
Opacity: 0 to 0.5
```

### Magnetic Cursor
```
Update: 16ms (60fps)
Follow distance: 100px
Strength: 0.3
Easing: ease-out
```

### Text Gradient Animation
```
Duration: 3000ms
Easing: linear
Repeat: infinite
Background-position: 0% to 200%
```

### Pulse Animation
```
Duration: 2000ms
Easing: ease-in-out
Repeat: infinite
Scale: 1 to 1.05 to 1
Opacity: 1 to 0.8 to 1
```

---

## 🎭 State Change Animations

### Success → Check Animation
```
1. Circle stroke draw (300ms)
2. Checkmark stroke draw (400ms, delay 100ms)
3. Scale bounce (500ms, delay 200ms)
4. Confetti particles (1000ms, delay 300ms)
```

### Error → Shake Animation
```
Duration: 400ms
Keyframes:
  0%, 100%: translateX(0)
  25%: translateX(-10px)
  75%: translateX(10px)
Flash background red 200ms
```

### Loading → Success Transition
```
1. Spinner fade out (200ms)
2. Check icon scale in (300ms, delay 100ms)
3. Success color transition (500ms)
4. Text change (0ms, delay 400ms)
```

---

## 📊 Data Visualization Animations

### Chart Enter Animations
```
Line Chart:
  - Draw line path: 1500ms ease-in-out
  - Fade in area fill: 1000ms (delay 500ms)
  - Pop in data points: 300ms staggered 50ms each

Bar Chart:
  - Grow from bottom: 800ms ease-out
  - Stagger: 100ms between bars

Doughnut/Pie:
  - Rotate in segments: 1200ms ease-out
  - Stagger: 150ms between segments

Radar Chart:
  - Draw polygon: 1000ms ease-out
  - Fade in area: 500ms (delay 500ms)
  - Pop in labels: 300ms staggered
```

### Real-time Updates
```
New Data Point:
  - Scale in: 400ms bounce
  - Pulse: 600ms ease-out
  - Fade to normal: 300ms (delay 600ms)

Value Change:
  - Number count animation: 1000ms
  - Color flash: 300ms
  - Smooth transition: 500ms ease-out
```

---

## 🌊 Scroll Animations

### Parallax Layers
```
Layer 1 (Background): 0.2x scroll speed
Layer 2 (Midground):  0.5x scroll speed
Layer 3 (Foreground): 1.0x scroll speed
Layer 4 (UI):         Fixed
```

### Fade In On Scroll
```
Trigger: Element 10% in viewport
Duration: 600ms
Opacity: 0 to 1
TranslateY: 20px to 0
Easing: ease-out
```

### Sticky Header
```
On Scroll:
  - Add shadow: 300ms ease-out
  - Reduce height: 200ms ease-out
  - Blur background: 300ms
```

---

## 🎪 Advanced Effects Timing

### Glassmorphism Transition
```
Duration: 500ms
Backdrop-filter: blur(0) to blur(20px)
Background: opacity 0 to 0.1
Border: opacity 0 to 0.2
```

### Neumorphism Press
```
Active State:
  - Inset shadow: 100ms ease-in
  - Transform: translateY(2px)
  - Duration: 100ms

Release:
  - Outset shadow: 200ms ease-out
  - Transform: translateY(0)
```

### 3D Card Tilt
```
Update: Real-time (mouse move)
Max rotation: 15deg
Perspective: 1000px
Transition: 300ms ease-out
Reset: 500ms ease-out (mouse leave)
```

### Particle System
```
Spawn rate: 5 particles/second
Lifetime: 3-6 seconds
Velocity: Random (50-150px/s)
Fade out: Last 1000ms of life
Float animation: 2000ms ease-in-out infinite
```

---

## ⚡ Performance Guidelines

### Animation Performance
```
✅ DO:
- Use transform (translate, scale, rotate)
- Use opacity
- Use will-change for complex animations
- Enable hardware acceleration

❌ DON'T:
- Animate width/height
- Animate margin/padding
- Animate top/left/bottom/right
- Animate box-shadow directly (use pseudo-elements)
```

### Optimization Techniques
```
1. Use CSS transforms over position changes
2. Enable GPU acceleration: transform: translateZ(0)
3. Use will-change sparingly
4. Debounce scroll events
5. Use requestAnimationFrame for JS animations
6. Implement intersection observer for scroll triggers
7. Reduce motion for accessibility
```

---

## 🎨 Color Transition Timing

### Hover Color Changes
```
Fast: 150ms ease-out
Standard: 300ms ease-out
Gradient: 500ms ease-in-out
```

### Theme Switching
```
All colors: 300ms ease-in-out
Background: 400ms ease-in-out
Borders: 200ms ease-in-out
Shadows: 500ms ease-in-out
```

---

## 🎯 Accessibility Considerations

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Indicators
```
Duration: 150ms
Outline: 3px solid
Outline-offset: 2px
Animation: Gentle pulse 2000ms
```

---

## 📱 Mobile-Specific Timings

### Touch Feedback
```
Instant: 50ms
Quick: 100ms
(Faster than desktop for responsive feel)
```

### Swipe Gestures
```
Distance threshold: 50px
Velocity threshold: 0.5px/ms
Animation: 300ms spring ease
```

### Bottom Sheet
```
Expand: 400ms ease-out
Collapse: 300ms ease-in
Snap points: Smooth interpolation 200ms
```

---

## 🎬 Complete Animation Timeline Example

### Homepage Load Sequence
```
0ms:    Start background gradient animation
200ms:  Hero headline appears (600ms)
400ms:  Hero subheading appears (600ms)
600ms:  CTA buttons scale in (400ms)
800ms:  Floating card 1 enters (300ms)
1000ms: Floating card 2 enters (300ms)
1200ms: Floating card 3 enters (300ms)
1400ms: Floating card 4 enters (300ms)
1600ms: Floating card 5 enters (300ms)
1800ms: Particles fade in (500ms)
2000ms: Stats counter starts (2000ms)
2300ms: All animations complete
```

### Modal Open Sequence
```
0ms:    Backdrop blur starts (300ms)
50ms:   Modal scale in starts (300ms)
100ms:  Modal header fades in (200ms)
200ms:  Modal content slides up (400ms)
300ms:  Modal footer fades in (200ms)
500ms:  Focus first input (0ms)
```

---

## 💡 Best Practices

1. **Layer animations**: Start next before previous finishes
2. **Stagger timing**: Add 50-150ms between similar elements
3. **Match motion to meaning**: Fast for small, slow for large
4. **Ease out for entering**: Makes UI feel responsive
5. **Ease in for exiting**: Smooth departure
6. **Bounce for success**: Adds joy to positive feedback
7. **Shake for errors**: Creates urgency
8. **Always provide fallbacks**: For prefers-reduced-motion

---

## 🔧 Implementation Examples

### CSS Animation
```css
@keyframes slide-up-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.element {
  animation: slide-up-fade-in 600ms ease-out;
  animation-fill-mode: both;
}
```

### JavaScript Animation
```javascript
element.animate([
  { opacity: 0, transform: 'translateY(20px)' },
  { opacity: 1, transform: 'translateY(0)' }
], {
  duration: 600,
  easing: 'ease-out',
  fill: 'both'
});
```

### Framer Motion
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Content
</motion.div>
```

---

*This guide ensures consistent, performant, and delightful animations throughout the VoiceGuard platform.*
