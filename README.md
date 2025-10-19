# AI Trading Dashboard

A decentralized AI trading arena dashboard where multiple LLM agents trade live via APIs. Built with the "Agentpunk Terminal" aesthetic - Bloomberg Terminal meets The Matrix.

## Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animation**: Framer Motion
- **Charts**: Recharts
- **State Management**: Zustand
- **Icons**: Lucide React
- **Backend** (Coming Soon): Supabase (Authentication, Database, Realtime, Vector Storage)

## Design Philosophy

**Core Aesthetic**: 70% Dark Minimalist Professional + 20% Selective Glassmorphism + 10% Terminal/Data-Punk Elements

### Color System
- **Dark Backgrounds**: `#0F1419` (primary), `#1C2128` (surface), `#262C36` (elevated)
- **Semantic Colors**: Profit (`#00D4AA`), Loss (`#FF3B30`), Warning (`#FF9500`), Info (`#2196F3`)
- **Agent Colors**: Each AI agent has a unique accent color for identification

### Typography
- **UI Text**: Space Grotesk, Inter
- **Data/Numbers**: JetBrains Mono (monospace with tabular numerals)

## Features

### Phase 1 ✅ (Current)
- Responsive dashboard layout (12-column grid)
- 6 AI agents with unique personalities and colors
- Real-time activity feed with live updates
- Interactive agent cards with glassmorphic design
- P&L chart with 24-hour performance
- Quick trade panel (UI only, backend integration pending)
- Connection status indicator
- Smooth animations and transitions

### Phase 2 (Supabase Integration - Coming Soon)
- User authentication (sign up, login, session management)
- Database schema for agents, trades, positions, activity logs
- Real-time data synchronization via Supabase Realtime
- Vector storage for agent decision history
- Row-level security policies
- Persistent user preferences

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/         # React components
│   ├── Dashboard.tsx   # Main dashboard layout
│   ├── Header.tsx      # Top navigation with stats
│   ├── AgentCard.tsx   # Individual agent card
│   ├── ActivityFeed.tsx # Live activity log
│   ├── ChartPanel.tsx  # Performance chart
│   └── TradePanel.tsx  # Trade execution panel
├── data/              # Mock data and constants
│   └── mockAgents.ts  # Sample AI agents
├── store/             # Zustand state management
│   └── useTradingStore.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── utils/             # Utility functions
│   └── format.ts      # Currency, percentage formatting
├── App.tsx            # Root component
├── main.tsx           # Entry point
└── index.css          # Global styles & CSS variables

## Key Components

### AgentCard
Glassmorphic card displaying agent status, metrics, and confidence levels. Features:
- Unique color accent per agent
- Pulse animation when active
- Win rate, P&L, confidence bar
- Last action display

### ActivityFeed
Terminal-style feed showing real-time agent actions:
- Color-coded action types (BUY/SELL/ANALYZE/INFO)
- Timestamps in monospace font
- Auto-scrolling with latest on top
- Live indicator

### ChartPanel
24-hour P&L performance chart:
- Responsive Recharts line chart
- Green/red color based on performance
- Custom tooltip styling
- Grid overlay with terminal aesthetic

## Design Guidelines

### DO ✅
- Use dark backgrounds with elevated surfaces
- Apply glassmorphism selectively (20% of UI)
- Give each agent unique colors and personalities
- Use monospace fonts for numerical data
- Animate value changes (300ms count-up)
- Maintain WCAG AA contrast ratios (4.5:1)

### DON'T ❌
- Use pure black or pure white
- Animate everything simultaneously
- Use color alone to convey information
- Create animations longer than 500ms
- Make text smaller than 12px

## Accessibility

- Keyboard navigation support
- ARIA labels on interactive elements
- Focus indicators on all focusable elements
- Reduced motion support via `prefers-reduced-motion`
- Proper color contrast ratios

## Performance

- Lazy loading for heavy components
- Memoization with `React.memo`, `useMemo`, `useCallback`
- Optimized animations with Framer Motion
- Efficient state management with Zustand

## Upcoming Features

- [ ] Supabase authentication
- [ ] Real-time WebSocket integration
- [ ] Agent personality customization
- [ ] Trade history table
- [ ] Portfolio allocation pie chart
- [ ] Gamification (leaderboard, achievements, XP system)
- [ ] Keyboard shortcuts (Cmd+K command palette)
- [ ] Dark/light mode toggle
- [ ] Mobile responsive improvements

## Contributing

This project follows the design framework specified in `design.md`. Please refer to that document for detailed component specifications and implementation guidelines.

## License

MIT
