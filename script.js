// ═══════════ Navigation scroll glass effect ═══════════
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ═══════════ HERO PARTICLE NETWORK ═══════════
(function heroParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let w = 0, h = 0, dpr = 1;
  const particles = [];
  const PARTICLE_COUNT = 70;
  const LINK_DISTANCE  = 140;
  const SPEED          = 0.18;
  const mouse = { x: -9999, y: -9999, active: false };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawn() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x:  Math.random() * w,
        y:  Math.random() * h,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r:  Math.random() * 1.6 + 0.6,
      });
    }
  }

  resize();
  spawn();

  window.addEventListener('resize', () => { resize(); spawn(); }, { passive: true });

  canvas.addEventListener = canvas.addEventListener || (() => {});
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.clientY < rect.bottom && e.clientY > rect.top) {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    } else {
      mouse.active = false;
    }
  }, { passive: true });
  window.addEventListener('mouseleave', () => { mouse.active = false; }, { passive: true });

  function tick() {
    ctx.clearRect(0, 0, w, h);

    // Update + draw particles
    for (const p of particles) {
      // Subtle attraction to cursor
      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d2 = dx*dx + dy*dy;
        if (d2 < 22500) { // 150px radius
          const f = (1 - d2/22500) * 0.04;
          p.vx += dx * f * 0.01;
          p.vy += dy * f * 0.01;
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      // Damping so cursor pull doesn't run away
      p.vx *= 0.985;
      p.vy *= 0.985;

      // Maintain minimum drift
      const speed = Math.hypot(p.vx, p.vy);
      if (speed < SPEED * 0.4) {
        p.vx += (Math.random() - 0.5) * SPEED * 0.3;
        p.vy += (Math.random() - 0.5) * SPEED * 0.3;
      }

      // Wrap edges (donut topology — never feels boundary)
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20;
      if (p.y > h + 20) p.y = -20;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(180, 200, 240, 0.85)';
      ctx.fill();
    }

    // Connection lines
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK_DISTANCE) {
          const alpha = (1 - dist / LINK_DISTANCE) * 0.32;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(120, 160, 220, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();


// ═══════════ Scroll-driven AI carousel ═══════════
const aiSections = document.querySelectorAll('.ai-section');
const scrollDots = document.querySelector('.scroll-dots');
const dots       = document.querySelectorAll('.scroll-dot');
const carouselEl = document.querySelector('.ai-carousel');

// helper: absolute page-top of ANY element (ignores offsetParent chain)
function absTop(el) {
  return el.getBoundingClientRect().top + window.scrollY;
}

function updateCarousel() {
  const scrollY  = window.scrollY;
  const windowH  = window.innerHeight;

  // ONE getBoundingClientRect call — carousel is position:relative so
  // section.offsetTop values are relative to it; we add carouselTop once.
  const carouselTop = absTop(carouselEl);
  const carouselEnd = carouselTop + carouselEl.offsetHeight;

  // Show dots only while inside the carousel zone
  scrollDots.classList.toggle(
    'visible',
    scrollY > carouselTop - windowH * 0.5 &&
    scrollY < carouselEnd - windowH * 0.5
  );

  aiSections.forEach((section, index) => {
    // Absolute top = carousel abs top + section's offset within carousel
    const sectionTop  = carouselTop + section.offsetTop;
    const stickyRange = section.offsetHeight - windowH; // = 100vh
    const scrollInSec = scrollY - sectionTop;
    const progress    = Math.max(0, Math.min(1, scrollInSec / stickyRange));

    const content   = section.querySelector('.ai-content');
    const imageWrap = section.querySelector('.ai-image-wrapper');
    if (!content || !imageWrap) return;

    // ── Text: fade in 0→0.12 | hold 0.12→0.65 | fade out 0.65→1
    let opacity, scale, translateY;
    if (progress < 0.12) {
      const t = progress / 0.12;
      opacity = t; scale = 0.92 + 0.08 * t; translateY = 40 * (1 - t);
    } else if (progress < 0.65) {
      opacity = 1; scale = 1; translateY = 0;
    } else {
      const t = (progress - 0.65) / 0.35;
      opacity = 1 - t; scale = 1 - 0.08 * t; translateY = -30 * t;
    }
    content.style.opacity   = opacity;
    content.style.transform = `translateY(${translateY}px) scale(${scale})`;

    // ── Image: slightly delayed entrance/exit
    let io, is, iy;
    if (progress < 0.15) {
      const t = progress / 0.15;
      io = t; is = 0.88 + 0.12 * t; iy = 60 * (1 - t);
    } else if (progress < 0.6) {
      io = 1; is = 1; iy = 0;
    } else {
      const t = (progress - 0.6) / 0.4;
      io = 1 - t; is = 1 - 0.12 * t; iy = -40 * t;
    }
    imageWrap.style.opacity   = io;
    imageWrap.style.transform = `translateY(${iy}px) scale(${is})`;

    // ── Dot active state
    if (dots[index]) {
      dots[index].classList.toggle(
        'active',
        scrollInSec > -windowH * 0.3 &&
        scrollInSec < stickyRange + windowH * 0.3 &&
        progress > 0.05 && progress < 0.95
      );
    }
  });
}

window.addEventListener('scroll', updateCarousel, { passive: true });
window.addEventListener('resize', updateCarousel, { passive: true });
// Run after layout settles
window.addEventListener('load', updateCarousel);
updateCarousel();

// ═══════════ Dot click navigation ═══════════
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    const section = aiSections[index];
    if (!section) return;
    // Use carousel abs top + section.offsetTop for exact position
    const top         = absTop(carouselEl) + section.offsetTop;
    const stickyRange = section.offsetHeight - window.innerHeight;
    // Land at 40% of sticky range — solidly in the hold phase (12%–65%)
    window.scrollTo({ top: top + stickyRange * 0.4, behavior: 'smooth' });
  });
});

// ═══════════ Smooth anchor links ═══════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const href   = this.getAttribute('href');
    const target = document.querySelector(href);
    if (!target) return;

    if (href === '#carousel' && aiSections.length > 0) {
      const first       = aiSections[0];
      const top         = absTop(carouselEl) + first.offsetTop;
      const stickyRange = first.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + stickyRange * 0.4, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: absTop(target), behavior: 'smooth' });
    }
  });
});
