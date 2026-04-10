/* ================================================
   GAMERHUB — script.js
   ================================================ */

// ── PARTICLES ──────────────────────────────────
const cv = document.getElementById('pcv');
const cx = cv.getContext('2d');
let W, H, pts = [];

function rs() {
  W = cv.width  = window.innerWidth;
  H = cv.height = window.innerHeight;
}
rs();
window.addEventListener('resize', rs);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x   = Math.random() * W;
    this.y   = Math.random() * H;
    this.vx  = (Math.random() - .5) * .45;
    this.vy  = (Math.random() - .5) * .45;
    this.r   = Math.random() * 1.6 + .3;
    this.a   = Math.random() * .5 + .15;
    this.col = Math.random() > .5 ? '#9030f0' : '#bf5fff';
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    cx.beginPath();
    cx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    cx.fillStyle  = this.col;
    cx.globalAlpha = this.a;
    cx.fill();
  }
}

for (let i = 0; i < 130; i++) pts.push(new Particle());

function drawLines() {
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx   = pts[i].x - pts[j].x;
      const dy   = pts[i].y - pts[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 110) {
        cx.beginPath();
        cx.moveTo(pts[i].x, pts[i].y);
        cx.lineTo(pts[j].x, pts[j].y);
        cx.strokeStyle  = '#6020a0';
        cx.globalAlpha  = (1 - dist / 110) * .12;
        cx.lineWidth    = .5;
        cx.stroke();
      }
    }
  }
}

function animLoop() {
  cx.clearRect(0, 0, W, H);
  pts.forEach(p => { p.update(); p.draw(); });
  drawLines();
  cx.globalAlpha = 1;
  requestAnimationFrame(animLoop);
}
animLoop();

// ── HERO BG PARALLAX ───────────────────────────
const hbg = document.getElementById('hbg');
setTimeout(() => hbg.classList.add('rdy'), 100);

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  hbg.style.transform = `translateY(${y * .28}px) scale(1.06)`;
});

// ── COUNT UP ANIMADO ───────────────────────────
function countUp(el, target, suffix = '') {
  let current = 0;
  const inc   = target / 55;
  const timer = setInterval(() => {
    current = Math.min(current + inc, target);
    el.textContent = Math.floor(current) + suffix;
    if (current >= target) clearInterval(timer);
  }, 22);
}

setTimeout(() => {
  countUp(document.getElementById('c1'), 50,  '+');
  countUp(document.getElementById('c2'), 12,  '');
  countUp(document.getElementById('c3'), 100, 'K');
}, 700);

// ── SCROLL REVEAL ──────────────────────────────
const revEls = document.querySelectorAll('[data-r]');
const revObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('on'), i * 85);
      revObs.unobserve(entry.target);
    }
  });
}, { threshold: .07, rootMargin: '0px 0px -30px 0px' });

revEls.forEach(el => revObs.observe(el));

// ── CARD STAGGER DELAY ─────────────────────────
['tgrid .tc', 'pgrid .pc', 'tipgrid .tip'].forEach(sel => {
  document.querySelectorAll('.' + sel).forEach((card, i) => {
    card.style.transitionDelay = i * 55 + 'ms';
  });
});

// ── MOUSE GLOW ─────────────────────────────────
const glowEl = document.createElement('div');
Object.assign(glowEl.style, {
  position:       'fixed',
  width:          '380px',
  height:         '380px',
  pointerEvents:  'none',
  zIndex:         '1',
  background:     'radial-gradient(circle, rgba(140,55,255,.055) 0%, transparent 70%)',
  borderRadius:   '50%',
  transform:      'translate(-50%, -50%)',
  transition:     'left .12s ease, top .12s ease',
});
document.body.appendChild(glowEl);

document.addEventListener('mousemove', e => {
  glowEl.style.left = e.clientX + 'px';
  glowEl.style.top  = e.clientY + 'px';
});

// ── NAVBAR SCROLL ──────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('nb').style.background =
    window.scrollY > 80
      ? 'rgba(4,4,10,.97)'
      : 'rgba(4,4,10,.88)';
});