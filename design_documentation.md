# VoiceGuard - Deepfake Audio Detection System - Design Specification

**Version:** 1.0.0
**Created:** 2025-10-01T12:38:58.973806

---

## Table of Contents
1. [Design System](#design-system)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Components](#components)
5. [Pages](#pages)
6. [Responsive Design](#responsive-design)
7. [Accessibility](#accessibility)
8. [Interactions](#interactions)

---

## Design System

### Color Palette

#### Primary Colors

**Primary**
- `blue_50`: #EFF6FF
- `blue_100`: #DBEAFE
- `blue_400`: #60A5FA
- `blue_500`: #3B82F6
- `blue_600`: #2563EB
- `blue_700`: #1D4ED8
- `blue_800`: #1E40AF
- `blue_900`: #1E3A8A

**Secondary**
- `indigo_600`: #5E5ADB
- `indigo_700`: #4C46B6

**Success**
- `green_100`: #D1FAE5
- `green_500`: #10B981
- `green_600`: #059669
- `green_800`: #065F46
- `green_900`: #064E3B

**Warning**
- `yellow_100`: #FEF3C7
- `yellow_400`: #FBBF24
- `yellow_500`: #F59E0B
- `yellow_800`: #92400E

**Danger**
- `red_100`: #FEE2E2
- `red_400`: #F87171
- `red_500`: #EF4444
- `red_600`: #DC2626
- `red_800`: #991B1B
- `red_900`: #7F1D1D

**Neutral**
- `gray_50`: #F9FAFB
- `gray_100`: #F3F4F6
- `gray_200`: #E5E7EB
- `gray_300`: #D1D5DB
- `gray_400`: #9CA3AF
- `gray_500`: #6B7280
- `gray_600`: #4B5563
- `gray_700`: #374151
- `gray_800`: #1F2937
- `gray_900`: #111827

**Dark Mode**
- `background`: #0F172A
- `surface`: #1E293B
- `border`: #334155

### Typography

**Primary Font:** Inter, sans-serif
**Monospace Font:** Fira Code, monospace


## Pages

### Home Page
**Route:** `/`
**Sections:** 4 sections

### Detection Page
**Route:** `/detect`
**Sections:** 5 sections

### Dashboard Page
**Route:** `/dashboard`
**Sections:** 5 sections

### Feedback Page
**Route:** `/feedback`
**Sections:** 2 sections

### Authentication Page
**Route:** `/auth`
**Sections:** 2 sections


## Components

### Navigation
**Type:** component

### Floating Components
**Type:** floating

### ChatBot Widget
**Type:** modal_widget


## Responsive Breakpoints

- **Mobile:** 0px - 640px
- **Tablet:** 641px - 1024px
- **Desktop:** 1025px - 1440px
- **Wide:** 1441px+

## Accessibility

**WCAG Level:** AA

**Features:**
- Keyboard Navigation
- Screen Reader Support
- Focus Indicators
- Aria Labels
- Color Contrast Ratio 4.5:1
