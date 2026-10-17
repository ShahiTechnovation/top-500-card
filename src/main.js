import { BRAND_CONFIG, SOCIAL_CONFIG, QUOTES, THEMES, BUILDER_PERSONAS } from './config.js';
import { generateXCaption, generateLinkedInCaption, validateXCaption } from './captions.js';

const $ = (id) => document.getElementById(id);
const W = 1080, H = 1350;
const cv = $('c');
const x = cv.getContext('2d');

const F = {
  head: 'Montserrat, system-ui, sans-serif',
  sans: 'Manrope, system-ui, sans-serif',
  serif: 'Fraunces, Georgia, serif',
  mono: '"DM Mono", ui-monospace, monospace',
  hand: 'Caveat, cursive'
};

const img = {};
const logos = [
  ['tinyfish', 'tinyfish-b.svg'],
  ['oc', 'oc-b.svg'],
  ['google', 'google-dev.png']
];

for (const [k, f] of logos) {
  const i = new Image();
  i.onload = () => draw();
  i.src = 'logos/' + f;
  img[k] = i;
}

const bg = {};
for (const k in THEMES) {
  const i = new Image();
  i.onload = () => draw();
  i.src = `bg/${k}.jpg`;
  bg[k] = i;
}

const st = {
  photo: null,
  zoom: 1,
  ox: 0,
  oy: 0,
  theme: 'ice',
  tags: [],
  quote: QUOTES[Math.floor(Math.random() * QUOTES.length)]
};

// Canvas layout coordinates
const LX = 94, RX = 986;
const PO = { cx: 520, cy: 590, w: 452, h: 540, rot: -0.035, m: 20, mb: 100 };
const CARD = { x: 56, w: 968, top: 914, bot: 1192 };
const RAIL = { y: 1212, h: 102 };

function rng(s) {
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fit(t, font, size, max, min = 18) {
  let s = size;
  x.font = font.replace('S', s);
  while (x.measureText(t).width > max && s > min) {
    s -= 2;
    x.font = font.replace('S', s);
  }
  return s;
}

function spaced(t, X, Y, sp, align) {
  const ch = [...t];
  const w = ch.reduce((a, c) => a + x.measureText(c).width, 0) + sp * (ch.length - 1);
  let cx = align === 'right' ? X - w : align === 'center' ? X - w / 2 : X;
  const a = x.textAlign;
  x.textAlign = 'left';
  for (const c of ch) {
    x.fillText(c, cx, Y);
    cx += x.measureText(c).width + sp;
  }
  x.textAlign = a;
  return w;
}

function clip1(t, max) {
  if (x.measureText(t).width <= max) return t;
  while (t && x.measureText(t + '…').width > max) t = t.slice(0, -1);
  return t.trimEnd() + '…';
}

function cover(im, fx) {
  if (!im.complete || !im.naturalWidth) return false;
  const s = Math.max(W / im.naturalWidth, H / im.naturalHeight);
  const w = im.naturalWidth * s;
  const h = im.naturalHeight * s;
  x.drawImage(im, Math.min(0, Math.max(W - w, W / 2 - w * fx)), (H - h) / 2, w, h);
  return true;
}

function title(T) {
  const s = 96, y1 = 150, y2 = y1 + 86;
  x.fillStyle = T.top;
  x.font = `900 ${s}px ${F.head}`;
  x.textBaseline = 'alphabetic';
  let cx = LX - 4;
  x.fillText('H', cx, y1);
  cx += x.measureText('H').width + 2;

  // Mountain peak A
  const wA = x.measureText('A').width;
  const cap = s * 0.72;
  const ax = cx;
  const apx = ax + wA / 2;
  const apy = y1 - cap * 1.08;

  x.beginPath();
  x.moveTo(ax, y1);
  x.lineTo(apx, apy);
  x.lineTo(ax + wA, y1);
  x.closePath();
  x.moveTo(ax + wA * 0.36, y1);
  x.lineTo(apx, y1 - cap * 0.32);
  x.lineTo(ax + wA * 0.64, y1);
  x.closePath();
  x.fill('evenodd');

  const hh = y1 - apy;
  x.fillStyle = T.cap;
  x.beginPath();
  x.moveTo(apx, apy + 4);
  x.lineTo(apx + wA * 0.19, apy + hh * 0.38);
  x.lineTo(apx + wA * 0.08, apy + hh * 0.31);
  x.lineTo(apx, apy + hh * 0.42);
  x.lineTo(apx - wA * 0.09, apy + hh * 0.3);
  x.lineTo(apx - wA * 0.19, apy + hh * 0.38);
  x.closePath();
  x.fill();

  x.fillStyle = T.top;
  cx += wA + 2;
  x.fillText('CK', cx, y1);
  const w1 = cx + x.measureText('CK').width;

  x.fillText('IN HILLS', LX - 4, y2);
  const w2 = LX - 4 + x.measureText('IN HILLS').width;

  const nx = Math.max(w1, w2) + 14;
  x.fillStyle = T.num;
  x.font = `900 126px ${F.head}`;
  x.fillText('’26', nx, y1 + 30);
  const ne = nx + x.measureText('’26').width;

  x.fillStyle = T.top;
  x.font = `500 18px ${F.mono}`;
  spaced(BRAND_CONFIG.location, LX, y2 + 40, 6);

  // BUILDER PASS Pill Badge
  x.font = `500 20px ${F.mono}`;
  const pw = spaced(BRAND_CONFIG.passType, -9999, 0, 5) + 52;
  const px = RX + 20 - pw;
  x.strokeStyle = T.top;
  x.lineWidth = 3;
  x.beginPath();
  x.roundRect(px, 74, pw, 54, 27);
  x.stroke();
  x.textBaseline = 'middle';
  spaced(BRAND_CONFIG.passType, px + pw / 2, 102, 5, 'center');
  x.textBaseline = 'alphabetic';

  // Coordinates and pin
  x.font = `500 18px ${F.mono}`;
  const cw = spaced(BRAND_CONFIG.coordinates, RX + 10, 166, 2, 'right');
  pin(RX + 10 - cw - 22, 160, T.top);

  // Handwritten note: ideas climb higher.
  x.save();
  x.translate(ne + 26, 232);
  x.rotate(-0.22);
  x.fillStyle = T.top;
  x.font = `600 34px ${F.hand}`;
  BRAND_CONFIG.handwrittenNote.forEach((t, i) => x.fillText(t, i * 12, i * 30));
  x.strokeStyle = T.top;
  x.lineWidth = 2.5;
  x.lineCap = 'round';
  x.beginPath();
  x.moveTo(20, 82);
  x.quadraticCurveTo(56, 71, 96, 76);
  x.stroke();
  x.restore();
}

function pin(X, Y, c) {
  x.strokeStyle = c;
  x.lineWidth = 2.5;
  x.beginPath();
  x.arc(X, Y - 4, 7, Math.PI * 0.85, Math.PI * 0.15);
  x.lineTo(X, Y + 10);
  x.closePath();
  x.stroke();
  x.beginPath();
  x.arc(X, Y - 4, 2.2, 0, 7);
  x.stroke();
}

function polaroid() {
  x.save();
  x.translate(PO.cx, PO.cy);
  x.rotate(PO.rot);
  const { w, h, m, mb } = PO;
  const pw = w - 2 * m;
  const ph = h - m - mb;
  const px = -w / 2 + m;
  const py = -h / 2 + m;

  x.shadowColor = 'rgba(0,0,0,.35)';
  x.shadowBlur = 40;
  x.shadowOffsetY = 18;
  x.fillStyle = '#FDFCF8';
  x.beginPath();
  x.roundRect(-w / 2, -h / 2, w, h, 8);
  x.fill();
  x.shadowColor = 'transparent';

  x.save();
  x.beginPath();
  x.rect(px, py, pw, ph);
  x.clip();
  const cx = px + pw / 2;
  const cy = py + ph / 2;

  if (st.photo) {
    const p = st.photo;
    const s = Math.max(pw / p.width, ph / p.height) * st.zoom;
    const dw = p.width * s;
    const dh = p.height * s;
    const mx = (dw - pw) / 2;
    const my = (dh - ph) / 2;
    st.ox = Math.max(-mx, Math.min(mx, st.ox));
    st.oy = Math.max(-my, Math.min(my, st.oy));
    x.drawImage(p, cx - dw / 2 + st.ox, cy - dh / 2 + st.oy, dw, dh);
  } else {
    const g = x.createLinearGradient(0, py, 0, py + ph);
    g.addColorStop(0, '#EDF1F5');
    g.addColorStop(1, '#D4DDE7');
    x.fillStyle = g;
    x.fillRect(px, py, pw, ph);

    x.strokeStyle = '#8A97A6';
    x.lineWidth = 5;
    x.beginPath();
    x.arc(cx, cy - 40, 52, 0, 7);
    x.stroke();
    x.beginPath();
    x.arc(cx, cy + 110, 100, Math.PI * 1.12, Math.PI * 1.88);
    x.stroke();

    x.fillStyle = '#7A8796';
    x.font = `500 20px ${F.mono}`;
    spaced('ADD YOUR PHOTO', cx, cy + 128, 3, 'center');
  }
  x.restore();

  // Photo handwritten caption: Built for the climb.
  x.fillStyle = '#2A2A2A';
  x.font = `600 42px ${F.hand}`;
  x.textAlign = 'center';
  x.fillText(BRAND_CONFIG.photoCaption, 0, h / 2 - mb / 2 + 16);
  x.textAlign = 'left';

  // Tape effect
  x.save();
  x.translate(-w / 2 + 40, -h / 2 + 4);
  x.rotate(-0.55);
  x.fillStyle = 'rgba(236,224,188,.92)';
  x.fillRect(-64, -18, 128, 36);
  x.restore();

  x.restore();
}

function stamp(cx, cy, r, T) {
  x.save();
  x.translate(cx, cy);
  x.rotate(0.18);

  x.shadowColor = 'rgba(0,0,0,.25)';
  x.shadowBlur = 18;
  x.shadowOffsetY = 6;
  x.fillStyle = T.card;
  x.beginPath();
  x.arc(0, 0, r, 0, 7);
  x.fill();
  x.shadowColor = 'transparent';

  x.strokeStyle = T.acc;
  x.fillStyle = T.acc;
  x.lineWidth = 4;
  x.beginPath();
  x.arc(0, 0, r - 8, 0, 7);
  x.stroke();
  x.lineWidth = 2;
  x.beginPath();
  x.arc(0, 0, r - 30, 0, 7);
  x.stroke();

  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.lineWidth = 2.5;
  x.lineJoin = 'round';

  // Mountain peak stamp emblem
  x.beginPath();
  x.moveTo(-20, -18);
  x.lineTo(-7, -34);
  x.lineTo(0, -26);
  x.lineTo(7, -32);
  x.lineTo(20, -18);
  x.stroke();

  // Stamp typography: HIH '26 BUILDER
  x.font = `900 23px ${F.head}`;
  x.fillText("HIH '26", 0, -2);
  x.font = `800 13px ${F.mono}`;
  spaced('BUILDER', 0, 19, 2.5, 'center');

  const arc = (t, top) => {
    x.font = `600 12px ${F.mono}`;
    const ch = [...t];
    const ws = ch.map((c) => x.measureText(c).width + 3);
    const tot = ws.reduce((a, b) => a + b, 0);
    const rr = r - 19;
    let a = -tot / 2 / rr;
    ch.forEach((c, i) => {
      const m = a + ws[i] / 2 / rr;
      x.save();
      x.rotate(top ? m : -m);
      x.translate(0, top ? -rr : rr);
      x.fillText(c, 0, 0);
      x.restore();
      a += ws[i] / rr;
    });
  };

  arc('HACK IN HILLS ’26', true);
  arc('HIH ’26 BUILDER', false);
  x.restore();
}

// Info card: frosted glass with top mountain ridge
const RIDGE = (() => {
  const r = rng(31);
  const pts = [];
  let n = 0;
  for (let X = CARD.x; X <= CARD.x + CARD.w; X += 16) {
    n += (r() - 0.5) * 14;
    n *= 0.86;
    pts.push([
      X,
      CARD.top + n - 46 * Math.exp(-(((X - 870) / 80) ** 2)) - 22 * Math.exp(-(((X - 640) / 60) ** 2))
    ]);
  }
  return pts;
})();

function cardPath() {
  const { x: L, w, bot } = CARD;
  const Rr = 28;
  x.beginPath();
  RIDGE.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b)));
  x.lineTo(L + w, bot - Rr);
  x.arcTo(L + w, bot, L + w - Rr, bot, Rr);
  x.lineTo(L + Rr, bot);
  x.arcTo(L, bot, L, bot - Rr, Rr);
  x.closePath();
}

function icon(k, X, Y, c) {
  x.save();
  x.translate(X, Y);
  x.strokeStyle = c;
  x.fillStyle = c;
  x.lineWidth = 3;
  x.lineJoin = 'round';
  x.lineCap = 'round';
  x.beginPath();
  if (k === 'cal') {
    x.roundRect(0, 4, 40, 36, 7);
    x.moveTo(0, 15);
    x.lineTo(40, 15);
    x.moveTo(11, 0);
    x.lineTo(11, 8);
    x.moveTo(29, 0);
    x.lineTo(29, 8);
    x.stroke();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        x.beginPath();
        x.arc(10 + i * 10, 24 + j * 8, 2.3, 0, 7);
        x.fill();
      }
    }
  }
  if (k === 'mtn') {
    x.moveTo(0, 38);
    x.lineTo(16, 10);
    x.lineTo(26, 25);
    x.lineTo(32, 17);
    x.lineTo(44, 38);
    x.closePath();
    x.moveTo(10, 21);
    x.lineTo(16, 25);
    x.lineTo(21, 19);
    x.stroke();
  }
  x.restore();
}

function card(T) {
  x.save();
  cardPath();
  x.clip();
  x.filter = 'blur(18px)';
  cover(bg[st.theme], T.fx);
  x.filter = 'none';
  x.globalAlpha = T.cardA;
  x.fillStyle = T.card;
  x.fillRect(0, CARD.top - 120, W, 400);
  x.globalAlpha = 1;
  x.restore();

  x.strokeStyle = T.edge;
  x.lineWidth = 3;
  x.beginPath();
  RIDGE.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b)));
  x.stroke();

  // Summit flag
  const [fx, fy] = RIDGE.reduce((a, b) => (b[1] < a[1] ? b : a));
  x.strokeStyle = T.ink;
  x.lineWidth = 3;
  x.beginPath();
  x.moveTo(fx, fy);
  x.lineTo(fx, fy - 50);
  x.stroke();

  x.fillStyle = T.acc;
  x.beginPath();
  x.moveTo(fx, fy - 50);
  x.lineTo(fx + 34, fy - 39);
  x.lineTo(fx, fy - 28);
  x.closePath();
  x.fill();

  const L = LX + 6, CW = 548;

  // Identity subtitle: HACK IN HILLS '26 · BUILDER
  x.fillStyle = T.mute;
  x.font = `600 15px ${F.mono}`;
  spaced(BRAND_CONFIG.footerIdentity, L, 966, 3.2);

  // Participant Name
  const name = ($('name').value.trim() || 'YOUR NAME').toUpperCase();
  x.fillStyle = T.ink;
  fit(name, `900 Spx ${F.head}`, 70, CW, 38);
  x.fillText(name, L - 3, 1028);

  // Role or College (optional)
  const role = $('role').value.trim();
  if (role) {
    x.fillStyle = T.mute;
    x.font = `700 26px ${F.sans}`;
    x.fillText(clip1(role, CW), L, 1066);
  }

  // Domain / Persona pills
  const tags = st.tags.length ? st.tags : ['Builder'];
  const chY = role ? 1084 : 1050;
  let fs = 24, pad = 20, ws;
  for (;;) {
    x.font = `800 ${fs}px ${F.head}`;
    ws = tags.map((t) => x.measureText(t).width + pad * 2);
    if (ws.reduce((a, b) => a + b, 0) + 10 * (ws.length - 1) <= CW || fs <= 16) break;
    fs -= 2;
    pad--;
  }

  let tx = L;
  tags.forEach((t, i) => {
    const w = Math.min(ws[i], L + CW - tx);
    if (w < 70) return;
    x.globalAlpha = 0.14;
    x.fillStyle = T.acc;
    x.beginPath();
    x.roundRect(tx, chY, w, 46, 23);
    x.fill();
    x.globalAlpha = 1;

    x.fillStyle = T.acc;
    x.fillText(clip1(t, w - pad * 2), tx + pad, chY + 23 + fs * 0.36);
    tx += w + 10;
  });

  // Right column: dates & base camp
  const vx = L + CW + 26;
  x.strokeStyle = T.ink;
  x.globalAlpha = 0.15;
  x.lineWidth = 2;
  x.beginPath();
  x.moveTo(vx, 958);
  x.lineTo(vx, 1124);
  x.stroke();
  x.globalAlpha = 1;

  [
    ['cal', 'DATES', BRAND_CONFIG.dates, 962],
    ['mtn', 'BASE CAMP', BRAND_CONFIG.baseCamp, 1052]
  ].forEach(([k, l, v, y]) => {
    icon(k, vx + 26, y, T.ink);
    x.fillStyle = T.mute;
    x.font = `500 14px ${F.mono}`;
    spaced(l, vx + 86, y + 12, 3.5);
    x.fillStyle = T.ink;
    x.font = `800 25px ${F.sans}`;
    x.fillText(v, vx + 86, y + 44);
  });

  // Builder Quote
  const q = ($('quote').value.trim() || st.quote).replace(/^["“]|["”]$/g, '');
  x.fillStyle = T.ink;
  x.font = `italic 400 31px ${F.serif}`;
  x.fillText(clip1(`“${q}”`, RX - L), L, 1168);
}

function rail() {
  const { y, h } = RAIL, L = CARD.x, w = CARD.w;
  x.shadowColor = 'rgba(0,0,0,.18)';
  x.shadowBlur = 24;
  x.shadowOffsetY = 8;
  x.fillStyle = 'rgba(255,255,255,.97)';
  x.beginPath();
  x.roundRect(L, y, w, h, 24);
  x.fill();
  x.shadowColor = 'transparent';

  let sx = L;
  [
    ['POWERED BY', 'tinyfish', 284, [206, 46]],
    ['SPONSORED BY', 'google', 288, [214, 48]],
    ['ORGANISED BY', 'oc', 396, [300, 60]]
  ].forEach(([t, k, sw, [mw, mh]], i) => {
    const cx = sx + sw / 2;
    if (i) {
      x.strokeStyle = 'rgba(15,31,58,.12)';
      x.lineWidth = 2;
      x.beginPath();
      x.moveTo(sx, y + 20);
      x.lineTo(sx, y + h - 20);
      x.stroke();
    }
    x.fillStyle = '#6B7380';
    x.font = `500 13px ${F.mono}`;
    spaced(t, cx, y + 28, 3.5, 'center');
    logo(k, cx, y + 66, mw, mh);
    sx += sw;
  });
}

function logo(k, cx, cy, mw, mh) {
  const im = img[k];
  if (!im || !im.complete || !im.naturalWidth) return;
  const s = Math.min(mw / im.naturalWidth, mh / im.naturalHeight);
  const w = im.naturalWidth * s;
  const h = im.naturalHeight * s;
  x.drawImage(im, cx - w / 2, cy - h / 2, w, h);
}

export function draw() {
  const T = THEMES[st.theme];
  x.save();
  x.clearRect(0, 0, W, H);
  if (!cover(bg[st.theme], T.fx)) {
    x.fillStyle = T.card;
    x.fillRect(0, 0, W, H);
  }
  const g = x.createLinearGradient(0, 0, 0, 440);
  g.addColorStop(0, T.wash);
  g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, W, 440);
  title(T);
  polaroid();
  stamp(PO.cx + PO.w / 2 + 18, PO.cy - PO.h / 2 + 70, 90, T);
  card(T);
  rail();
  x.restore();
}

// Photo Upload Handling
const drop = $('drop'), file = $('file');
drop.onclick = () => file.click();
['dragover', 'dragenter'].forEach((ev) =>
  drop.addEventListener(ev, (e) => {
    e.preventDefault();
    drop.classList.add('on');
  })
);
['dragleave', 'drop'].forEach((ev) =>
  drop.addEventListener(ev, () => drop.classList.remove('on'))
);
drop.addEventListener('drop', (e) => {
  e.preventDefault();
  const f = e.dataTransfer.files[0];
  if (f) loadPhoto(f);
});
file.onchange = () => {
  if (file.files[0]) loadPhoto(file.files[0]);
};

function loadPhoto(f) {
  if (!f.type.startsWith('image/')) {
    $('status').textContent = 'That file isn’t an image.';
    return;
  }
  const i = new Image();
  i.onload = () => {
    st.photo = i;
    st.zoom = 1;
    st.ox = 0;
    st.oy = 0;
    $('zoom').value = 1;
    $('zoomL').hidden = false;
    $('status').textContent = 'Drag the photo on the pass to adjust position.';
    $('dropT').textContent = 'Change photo';
    draw();
  };
  i.onerror = () => {
    $('status').textContent = 'Couldn’t read that image. Try a JPG or PNG.';
  };
  i.src = URL.createObjectURL(f);
}

$('zoom').oninput = (e) => {
  st.zoom = +e.target.value;
  draw();
};

let drag = null;
cv.addEventListener('pointerdown', (e) => {
  if (!st.photo) return;
  drag = { x: e.clientX, y: e.clientY, ox: st.ox, oy: st.oy };
  cv.setPointerCapture(e.pointerId);
  cv.style.cursor = 'grabbing';
});
cv.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const k = W / cv.getBoundingClientRect().width;
  st.ox = drag.ox + (e.clientX - drag.x) * k;
  st.oy = drag.oy + (e.clientY - drag.y) * k;
  draw();
});
['pointerup', 'pointercancel'].forEach((ev) =>
  cv.addEventListener(ev, () => {
    drag = null;
    cv.style.cursor = 'grab';
  })
);

// Theme Switcher
document.querySelectorAll('#theme button').forEach((b) =>
  b.onclick = () => {
    st.theme = b.dataset.v;
    document.querySelectorAll('#theme button').forEach((o) => o.setAttribute('aria-pressed', o === b));
    setBg(st.theme);
    draw();
  }
);

// Dynamic Particle & Drift Background Animation
const FX = {
  ice: { n: 70, c: '255,255,255', sh: 'rgba(40,70,110,.35)', r: [1.2, 3.4], vx: [-0.2, 0.2], vy: [0.3, 0.9], a: [0.6, 0.95], sway: 1 },
  dusk: { n: 90, c: '255,240,220', r: [0.5, 1.7], vx: [-0.03, 0.03], vy: [-0.03, 0.03], a: [0.3, 1], tw: 1 },
  topo: { n: 50, c: '120,80,50', r: [1, 2.4], vx: [0.12, 0.4], vy: [-0.12, 0.06], a: [0.2, 0.55], tw: 1 },
  sunrise: { n: 55, c: '236,150,50', sh: 'rgba(255,190,90,.9)', r: [1, 3], vx: [-0.1, 0.1], vy: [-0.45, -0.12], a: [0.35, 0.85], tw: 1 }
};

const fx = $('fx');
const fc = fx.getContext('2d');
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
let P = [], FC, dpr = 1, layer = 0;
const rnd = (a) => a[0] + Math.random() * (a[1] - a[0]);

function fxSize() {
  dpr = Math.min(2, window.devicePixelRatio || 1);
  if (!fx.width) {
    P.forEach((q) => {
      q.x = Math.random() * innerWidth;
      q.y = Math.random() * innerHeight;
    });
  }
  fx.width = innerWidth * dpr;
  fx.height = innerHeight * dpr;
}

function setBg(t) {
  document.documentElement.dataset.bg = t;
  const a = $(layer ? 'bgA' : 'bgB');
  const b = $(layer ? 'bgB' : 'bgA');
  a.style.backgroundImage = `url(bg/${t}.jpg)`;
  a.classList.add('on');
  b.classList.remove('on');
  layer ^= 1;
  FC = FX[t];
  P = Array.from({ length: FC.n }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: rnd(FC.r),
    vx: rnd(FC.vx),
    vy: rnd(FC.vy),
    a: rnd(FC.a),
    p: Math.random() * 6.3
  }));
}

function tick() {
  const w = innerWidth, h = innerHeight, c = FC;
  if (!c) return;
  fc.setTransform(dpr, 0, 0, dpr, 0, 0);
  fc.clearRect(0, 0, w, h);
  fc.shadowColor = c.sh || 'transparent';
  fc.shadowBlur = c.sh ? 6 : 0;
  for (const q of P) {
    q.p += 0.012;
    q.x += q.vx + (c.sway ? Math.sin(q.p) * 0.35 : 0);
    q.y += q.vy;
    if (q.y > h + 8) q.y = -8;
    if (q.y < -8) q.y = h + 8;
    if (q.x > w + 8) q.x = -8;
    if (q.x < -8) q.x = w + 8;
    fc.fillStyle = `rgba(${c.c},${c.tw ? q.a * (0.5 + 0.5 * Math.sin(q.p * 2.6)) : q.a})`;
    fc.beginPath();
    fc.arc(q.x, q.y, q.r, 0, 7);
    fc.fill();
  }
  requestAnimationFrame(tick);
}

fxSize();
window.addEventListener('resize', fxSize);
setBg(st.theme);
if (!still) requestAnimationFrame(tick);

// Default Builder Quote
const setQuote = () => {
  $('quote').placeholder = st.quote;
  draw();
};

$('shuffle').onclick = () => {
  let n;
  do {
    n = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  } while (n === st.quote && QUOTES.length > 1);
  st.quote = n;
  setQuote();
};

// Builder Domain Pills
const fieldIn = $('field');

function renderTags() {
  const list = $('tagList');
  list.textContent = '';
  st.tags.forEach((t, i) => {
    const s = document.createElement('span');
    s.className = 'tag';
    s.textContent = t;
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Remove ' + t);
    b.innerHTML = '<svg class="i"><use href="#i-x"/></svg>';
    b.onclick = () => {
      st.tags.splice(i, 1);
      renderTags();
      fieldIn.focus();
    };
    s.append(b);
    list.append(s);
  });
  fieldIn.hidden = st.tags.length >= 3;
  fieldIn.placeholder = st.tags.length ? 'Add another' : 'Your domains (up to 3)';
  draw();
}

function addTag() {
  const v = fieldIn.value.replace(/,/g, '').trim();
  fieldIn.value = '';
  if (v && st.tags.length < 3 && !st.tags.some((t) => t.toLowerCase() === v.toLowerCase())) {
    st.tags.push(v);
  }
  renderTags();
}

fieldIn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    addTag();
  } else if (e.key === 'Backspace' && !fieldIn.value && st.tags.length) {
    st.tags.pop();
    renderTags();
  }
});
fieldIn.addEventListener('input', (e) => {
  if (fieldIn.value.includes(',') || e.inputType === 'insertReplacementText' || !e.inputType) {
    addTag();
  }
});
fieldIn.addEventListener('blur', () => {
  if (fieldIn.value.trim()) addTag();
});
$('tagBox').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) fieldIn.focus();
});

// Prevent Enter in text inputs from submitting the form
$('f').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
    e.preventDefault();
  }
});

['name', 'role', 'quote'].forEach((id) => $(id).addEventListener('input', draw));

// Clipboard Helper
async function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to fallback
    }
  }
  try {
    const a = document.createElement('textarea');
    a.value = text;
    a.style.position = 'fixed';
    a.style.opacity = '0';
    document.body.append(a);
    a.select();
    const ok = document.execCommand('copy');
    a.remove();
    return ok;
  } catch {
    return false;
  }
}

// Copy X Caption
$('copyX').onclick = async () => {
  const caption = generateXCaption({ domains: st.tags, includeDomain: true });
  const validation = validateXCaption(caption);

  if (!validation.isValid) {
    $('status').textContent = `X caption warning: ${validation.length}/280 characters. Length exceeded.`;
    return;
  }

  const ok = await copyToClipboard(caption);
  const copyXT = $('copyXT');
  if (ok) {
    copyXT.textContent = 'X caption copied!';
    $('status').textContent = `X caption copied! (${validation.length}/280 chars) Ready to paste on X.`;
    $('copyX').classList.add('copied');
  } else {
    copyXT.textContent = 'Copy failed';
    $('status').textContent = 'Your browser blocked copying. Please copy manually.';
  }
  setTimeout(() => {
    copyXT.textContent = 'Copy X caption';
    $('copyX').classList.remove('copied');
  }, 2400);
};

// Copy LinkedIn Caption
$('copyLi').onclick = async () => {
  const caption = generateLinkedInCaption({ domains: st.tags });
  const ok = await copyToClipboard(caption);
  const copyLiT = $('copyLiT');
  if (ok) {
    copyLiT.textContent = 'LinkedIn caption copied!';
    $('status').textContent = 'LinkedIn caption copied! Paste it on LinkedIn, then select the tagged handles.';
    $('copyLi').classList.add('copied');
  } else {
    copyLiT.textContent = 'Copy failed';
    $('status').textContent = 'Your browser blocked copying. Please copy manually.';
  }
  setTimeout(() => {
    copyLiT.textContent = 'Copy LinkedIn caption';
    $('copyLi').classList.remove('copied');
  }, 2400);
};

// Pass Download Handler
$('f').onsubmit = (e) => {
  e.preventDefault();
  draw();
  const rawName = $('name').value.trim();
  const slug = rawName
    ? rawName.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '')
    : 'Pass';

  try {
    cv.toBlob(
      (blob) => {
        if (!blob) {
          $('status').textContent = 'Failed to generate image file. Please try again.';
          return;
        }
        const u = URL.createObjectURL(blob);
        const l = document.createElement('a');
        l.href = u;
        l.download = `HIH26-Builder-Pass-${slug}.png`;
        document.body.appendChild(l);
        l.click();
        l.remove();
        setTimeout(() => URL.revokeObjectURL(u), 4000);
        $('status').textContent = 'Pass downloaded! Built for the climb. 🏔️';
      },
      'image/png'
    );
  } catch {
    $('status').textContent = 'Download blocked. Open the page from a web server, not as a local file.';
  }
};

// Ensure all Google Fonts are loaded before initial draw
document.fonts.ready
  .then(() =>
    Promise.all([
      '900 20px Montserrat',
      '800 20px Montserrat',
      '800 20px Manrope',
      '700 20px Manrope',
      'italic 400 20px Fraunces',
      '500 20px "DM Mono"',
      '600 20px Caveat'
    ].map((f) => document.fonts.load(f)))
  )
  .then(() => draw());

setQuote();
