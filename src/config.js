/**
 * Hack in Hills '26 — Brand and Social Configuration
 */

export const TOP_500_CONFIG = {
  eventName: "HACK IN HILLS '26",
  editionBadge: 'TOP 500',
  passType: 'BUILDER PASS',
  statusBadge: 'ROUND 1 QUALIFIED',
  stampHeading: "HACK IN HILLS '26",
  stampCenterTop: 'TOP 500',
  stampCenterBottom: 'ROUND 1 QUALIFIED',
  photoCaption: 'Base camp cleared! 🏔️',
  footerIdentity: "TOP 500 · HIH '26 BUILDER",
  tagline: 'The climb continues.',
  datesLabel: 'UPCOMING FINALS',
  dates: '20–21 NOV 2026',
  baseCampLabel: 'DESTINATION',
  baseCamp: 'MANALI · 2,050 M',
  location: 'MANALI · HIMACHAL PRADESH',
  coordinates: '32.24°N  77.19°E',
  filePrefix: 'HIH26-Top500-BuilderPass',
  handwrittenNote: ['base camp', 'cleared.', 'climb on.'],
  progression: {
    round1: 'QUALIFIED',
    round2: 'UPCOMING',
    finals: 'MANALI, HP'
  }
};

export const GENERAL_CONFIG = {
  eventName: "Hack in Hills ’26",
  editionBadge: '',
  passType: 'BUILDER PASS',
  statusBadge: 'BUILDER',
  stampHeading: "HACK IN HILLS ’26",
  stampCenterTop: "HIH '26",
  stampCenterBottom: 'BUILDER',
  photoCaption: 'Built for the climb.',
  footerIdentity: "HACK IN HILLS '26 · BUILDER",
  tagline: 'Built for the climb.',
  datesLabel: 'DATES',
  dates: '20–21 NOV 2026',
  baseCampLabel: 'BASE CAMP',
  baseCamp: 'MANALI · 2,050 M',
  location: 'MANALI · HIMACHAL PRADESH',
  coordinates: '32.24°N  77.19°E',
  filePrefix: 'HIH26-Builder-Pass',
  handwrittenNote: ['ideas', 'climb', 'higher.'],
  progression: null
};

export const BRAND_CONFIG = TOP_500_CONFIG;

export const SOCIAL_CONFIG = {
  x: {
    handles: {
      tinyfish: '@Tiny_Fish',
      builderbase: '@theBuilder_base',
      web3india: '@Web3indiaHQ',
      nexido: '@nexido_official'
    },
    attribution: 'Powered by @Tiny_Fish\nOrganised by @theBuilder_base, @Web3indiaHQ & @nexido_official',
    hashtags: ['#HIH26'],
    generalHashtags: ['@HackInHills', '#HIH26'],
    charLimit: 280
  },
  linkedIn: {
    handles: {
      tinyfish: '@TinyFish',
      builderbase: '@Builderbase',
      web3india: '@Web3India',
      nexido: '@Nexido'
    },
    attribution: 'Powered by @TinyFish. Organised by @Builderbase, @Web3India and @Nexido.',
    hashtags: ['#HackInHills', '#HIH26', '#Hackathon', '#BuildInPublic']
  }
};

export const QUOTES = [
  'The climb continues.',
  'Base camp cleared! The climb continues. 🏔️',
  '10,000+ registrations. Top 500 cleared. On to Round 2.',
  'Every summit starts with git init.',
  'Thin air, thick code.',
  'I climb in commits.',
  'Altitude is just another constraint.',
  'Low oxygen, high output.',
  'From base camp to production.',
  'Ship it before the snow sets in.',
  'The view is better after the bugs.',
  'Built for the climb.',
  'Code at altitude, dream without limits.'
];

export const BUILDER_PERSONAS = [
  'AI Builder',
  'Full-Stack Builder',
  'Design Engineer',
  'Vibe Coder',
  'Web3 Native',
  'Open Source Hacker',
  'DevTools',
  'FinTech',
  'Climate Tech',
  'HealthTech',
  'Cybersecurity'
];

export const THEMES = {
  ice: {
    label: 'Snow',
    fx: 0.5,
    top: '#0E2236',
    wash: 'rgba(255,255,255,.6)',
    num: '#2F74C9',
    cap: '#FFFFFF',
    card: '#F6F9FC',
    cardA: 0.84,
    ink: '#0E2236',
    mute: '#5B6B7E',
    acc: '#2F6FC4',
    edge: 'rgba(255,255,255,.95)'
  },
  dusk: {
    label: 'Dusk',
    fx: 0.5,
    top: '#06262A',
    wash: 'rgba(150,240,225,.35)',
    num: '#E2522A',
    cap: '#9BE8DA',
    card: '#061A1D',
    cardA: 0.76,
    ink: '#EAF7F4',
    mute: '#8DB5B0',
    acc: '#FF8A4C',
    edge: 'rgba(255,150,100,.8)'
  },
  topo: {
    label: 'Topo',
    fx: 0.5,
    top: '#FFFFFF',
    wash: 'rgba(8,18,28,.6)',
    num: '#F2B06B',
    cap: '#22324A',
    card: '#F4EEE6',
    cardA: 0.86,
    ink: '#2B2420',
    mute: '#7A6E62',
    acc: '#B5562E',
    edge: 'rgba(255,255,255,.9)'
  },
  sunrise: {
    label: 'Sunrise',
    fx: 0.42,
    top: '#13243B',
    wash: 'rgba(255,255,255,.45)',
    num: '#D9632F',
    cap: '#FFFFFF',
    card: '#FFFDF6',
    cardA: 0.84,
    ink: '#1E2B1F',
    mute: '#66705F',
    acc: '#C2601F',
    edge: 'rgba(255,255,255,.95)'
  }
};
