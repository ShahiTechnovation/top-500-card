# Hack in Hills ’26 · Top 500 Builder Pass

An exclusive, premium, personalized digital collectible and milestone pass for teams that qualified in **Round 1** of **Hack in Hills ’26** (10,000+ registrations · Top 500 teams · The climb continues 🏔️).

Also preserves the general HIH '26 Community Builder Pass with seamless one-click edition switching.

---

## Key Features

- **Exclusive Top 500 Qualification Identity**:
  - Primary Event Branding: `HACK IN HILLS '26`
  - Selection Badge: `TOP 500` achievement badge
  - Main Pass Title: `BUILDER PASS` (bold, commanding, primary identity)
  - Qualification Status: `ROUND 1 QUALIFIED` status pill
  - Circular Checkpoint Stamp: `TOP 500 / ROUND 1 QUALIFIED` with mountain peak insignia
  - Polaroid Photo Caption: Handwritten *"Base camp cleared! 🏔️"*
  - Identity Label: `TOP 500 · HIH '26 BUILDER`
  - Bottom Tagline: *"The climb continues."*
  - Event Details: Presents upcoming finals in Manali, HP (20–21 November 2026) as the destination checkpoint, not confirmed final attendance
  - Progression Indicator: Three-step journey tracker (`Round 1 Qualified ✓` → `Round 2 Upcoming ⏳` → `Finals Manali, HP`)
- **Preserved General Edition**:
  - Toggle between **Top 500 Round 1 Pass** and **General Pass** without breaking or overwriting the original edition.
- **Client-Side Privacy**:
  - Photos stay 100% on the user's device. Everything renders client-side onto an HTML5 `<canvas>` element (1080×1350 PNG export).
- **Three Platform-Specific Action Buttons**:
  1. **Download Builder Pass**: High-resolution PNG (`HIH26-Top500-BuilderPass-<Name>.png`).
  2. **Copy X Caption**: Strictly ≤ 280-character caption with platform handles (`@Tiny_Fish`, `@theBuilder_base`, `@Web3indiaHQ`, `@nexido_official`) and `#HIH26`.
  3. **Copy LinkedIn Caption**: Professional storytelling format with full attribution (`Powered by @TinyFish. Organised by @Builderbase, @Web3India and @Nexido.`) and `#HackInHills #HIH26 #Hackathon #BuildInPublic`.
- **Himalayan Visual Design**:
  - Snowy mountain presets (Snow, Dusk, Topo, Sunrise).
  - Mountain ridge frosted glass info card with summit flag.
  - Realistic taped Polaroid frame with custom photo zoom and pan controls.
  - Full sponsor rail: **Powered by TinyFish**, **Sponsored by Google Developers**, and **Organised by OC** (Builderbase, Web3 India, Nexido).
  - Ambient snowfall/ember particles and subtle drifting backdrop.

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Development
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running Tests
Automated unit tests verify X caption character limits (≤ 280), platform-specific handles, Top 500 milestone copy, and general edition preservation:
```bash
npm test
```

### Production Build
```bash
npm run build
npm run preview
```

---

## Project Structure

```
├── bg/                   # Mountain background presets (ice, dusk, topo, sunrise)
├── logos/                # Official sponsor and organizer logos
├── src/
│   ├── config.js         # TOP_500_CONFIG, GENERAL_CONFIG, social handles, quotes, themes
│   ├── captions.js       # Top 500 & General X / LinkedIn captions and weighted counter
│   └── main.js           # Canvas rendering, photo handling, UI interactions & edition switcher
├── test/
│   └── captions.test.js  # Test suite verifying character counts, attribution, and copy
├── index.html            # Main web page, journey tracker & responsive layout
└── package.json          # Dependencies & scripts
```
