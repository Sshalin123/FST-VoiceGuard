# Source Code (Frontend)

This folder contains all frontend source code for the VoiceGuard Pro web application built with React, TypeScript, and modern web technologies.

## Structure

```
src/
├── components/         # Reusable React components
├── pages/             # Page-level components
├── contexts/          # React Context providers
├── services/          # API service functions
├── styles/            # Global styles and CSS
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global CSS imports
```

## Components (`/components`)

Reusable UI components used throughout the application:
- **Navigation.tsx** - Main navigation bar with glassmorphism design
- **Button.tsx** - Custom button component with variants
- **FeatureCard.tsx** - Feature showcase cards
- **ChatBot.tsx** - AI chatbot interface
- **WaveBackground.tsx** - Animated background effects

## Pages (`/pages`)

Main application pages and routes:
- **Home.tsx** - Landing page with hero section and features
- **Detection.tsx** - Audio upload and detection interface
- **Dashboard.tsx** - User analytics and history dashboard
- **Pricing.tsx** - Pricing plans and subscription options
- **About.tsx** - Team information and company story
- **Blog.tsx** - Blog posts and articles
- **Contact.tsx** - Contact form and information
- **authpage.tsx** - Login and registration
- **DeepfakeAudio.tsx** - Audio generation tool
- **Feedback.tsx** - User feedback submission

## Contexts (`/contexts`)

React Context providers for state management:
- **AuthContext.tsx** - Authentication state and user management
- **DetectionContext.tsx** - Audio detection state and results

## Services (`/services`)

API integration and service functions:
- **authService.ts** - Authentication API calls
- Additional services for detection, user data, etc.

## Styles (`/styles`)

Global styling and design system:
- **globals.css** - Global styles, animations, utility classes
  - Glassmorphism effects
  - Neumorphism styles
  - Custom animations
  - Gradient definitions
  - Typography system

## Design System

### Colors
- Neon Blue: `#00D9FF`
- Electric Purple: `#7C3AED`
- Cyber Pink: `#EC4899`
- Matrix Green: `#10B981`

### Typography
- Primary: Inter
- Display: Poppins
- Monospace: Fira Code

### Effects
- Glassmorphism with backdrop blur
- Smooth animations with Framer Motion
- Hover effects and transitions
- Responsive grid layouts

## Tech Stack

- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Router** - Client-side routing
- **Chart.js** - Data visualization

## Development

### Running Locally
```bash
npm run dev
```
Starts dev server at `http://localhost:5173`

### Building for Production
```bash
npm run build
```
Creates optimized production build in `/dist`

### Type Checking
```bash
npm run type-check
```

## Key Features

- 🎨 Beautiful glassmorphism UI
- ✨ Smooth animations and transitions
- 📱 Fully responsive design
- ♿ Accessibility-focused
- 🚀 Fast and optimized
- 🎯 Type-safe with TypeScript
- 🔄 Real-time updates
- 📊 Interactive data visualizations
