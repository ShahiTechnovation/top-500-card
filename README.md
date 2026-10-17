# Hack in Hills ’26 · Builder Pass V2

A digital builder pass generator for everyone participating in the **Hack in Hills ’26** community (20–21 November 2026, Manali, Himachal Pradesh).

Built as a community identity card celebrating all builders: *"Built for the climb. 🏔️"*.

---

## Features

- **Community Builder Identity**: A personalized digital pass for all HIH '26 community members, builders, and dreamers.
- **Client-Side Privacy**: Photos never leave the browser. Everything is rendered client-side on a `<canvas>` element (1080×1350 PNG export).
- **Mountain Visual Design**:
  - Snowy Himalayan mountain backgrounds (Snow, Dusk, Topo, Sunrise presets).
  - Polaroid-style photo element with realistic tape overlay and handwritten *"Built for the climb."* caption.
  - Stamped circular **HIH '26 BUILDER** seal with mountain peak emblem.
  - Frosted glass info card shaped like a mountain ridge with summit flag.
  - Full sponsor rail: **Powered by TinyFish**, **Sponsored by Google Developers**, and **Organised by OC** (Builderbase, Web3 India, Nexido).
  - Subtle drifting background and ambient snowfall/ember particle canvas.
- **Two Independent Social Caption Generators**:
  - **Copy X Caption**: Strictly validated to 280 characters or fewer with platform handles (`@Tiny_Fish`, `@theBuilder_base`, `@Web3indiaHQ`, `@nexido_official`) and `#HackInHills #HIH26`.
  - **Copy LinkedIn Caption**: Storytelling format with exact LinkedIn attribution (`Powered by @TinyFish. Organised by @Builderbase, @Web3India and @Nexido.`) and `#HackInHills #HIH26 #BuildInPublic`.
- **Customizable Profile**:
  - Name and optional role/college.
  - Up to 3 domain/persona pills (`AI Builder`, `Web3 Native`, `Open Source Hacker`, `Full-Stack Builder`, `Design Engineer`, etc.).
  - Builder quotes with one-click random shuffle.
  - Photo pan/drag and zoom controls.

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
Automated unit tests verify X caption character limits (≤ 280), attribution handles, and community positioning:
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
│   ├── config.js         # Centralized brand copy, social handles, quotes, themes
│   ├── captions.js       # X and LinkedIn caption generators & X character counter
│   └── main.js           # Canvas rendering, photo handling, UI interactions
├── test/
│   └── captions.test.js  # Test suite for captions & Twitter character counting
├── index.html            # Main web page & responsive layout
└── package.json          # Dependencies & scripts
```
