/* ===========================
   GSAP SETUP
=========================== */
gsap.registerPlugin(ScrollTrigger);

/* ===========================
   HERO ENTRY
=========================== */
gsap.set(['.hero-label', '.hero-title', '.hero-sub', '.btn-primary'], { opacity: 0, y: 36 });
gsap.set('#nav', { opacity: 0, y: -64 });
gsap.set(['#astGrande', '#astPiccolo'], { transformPerspective: 900 });

window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    gsap.to(loader, { opacity: 0, duration: 0.75, delay: 0.05, ease: 'power2.out', onComplete: () => { loader.style.display = 'none'; } });
  }
  gsap.to('#nav', { opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: 'power3.out' });
  gsap.to(['.hero-label', '.hero-title', '.hero-sub', '.btn-primary'], { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.16, delay: 0.35 });
  gsap.fromTo('#astGrande', { opacity: 0, scale: 0.4, rotationZ: -80 }, { opacity: 1, scale: 1, rotationZ: 0, duration: 1.5, delay: 0.55, ease: 'elastic.out(1, 0.55)' });
  gsap.fromTo('#astPiccolo', { opacity: 0, scale: 0.4, rotationZ: 80 }, { opacity: 1, scale: 1, rotationZ: 0, duration: 1.5, delay: 0.8, ease: 'elastic.out(1, 0.55)' });
  gsap.to('#astGrande', { rotationZ: '+=360', duration: 22, ease: 'none', repeat: -1, delay: 2.1 });
  gsap.to('#astPiccolo', { rotationZ: '-=360', duration: 30, ease: 'none', repeat: -1, delay: 2.5 });
  gsap.to('#astGrande', { y: -18, duration: 4.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.1 });
  gsap.to('#astPiccolo', { y: -12, duration: 5.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.5 });

  setupImgParallax();
  connectGridToModal();
});

/* ===========================
   SCROLL REVEAL — Rich entrance animations
=========================== */
/* Base reveal: fade up */
gsap.utils.toArray('.reveal:not(.arte-item)').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    }
  );
});

/* Section headers — slide up + subtle scale */
gsap.utils.toArray('.port-section-header').forEach(header => {
  const label = header.querySelector('.section-label');
  const title = header.querySelector('.section-title');
  const sub = header.querySelector('.section-sub');
  const els = [label, title, sub].filter(Boolean);
  els.forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 30, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.9, delay: i * 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: header, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });
});

/* Arte grid items — cohesive sophisticated entry */
gsap.fromTo('.arte-item',
  { opacity: 0, scale: 0.85, y: 60 },
  {
    opacity: 1, scale: 1, y: 0,
    duration: 1,
    stagger: {
      amount: 0.6,
      from: 'center'
    },
    ease: 'back.out(1.4)',
    scrollTrigger: { trigger: '.artes-grid', start: 'top 80%', toggleActions: 'play none none none' }
  }
);

/* Carousel wraps — slide from right */
gsap.utils.toArray('.carousel-wrap').forEach(wrap => {
  gsap.fromTo(wrap,
    { opacity: 0, x: 60 },
    {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: wrap, start: 'top 88%', toggleActions: 'play none none none' }
    }
  );
});

/* Collab tags — pop in */
gsap.utils.toArray('.collab-tag').forEach((tag, i) => {
  gsap.fromTo(tag,
    { opacity: 0, scale: 0.7, y: 16 },
    {
      opacity: 1, scale: 1, y: 0, duration: 0.6, delay: 0.15 + i * 0.1,
      ease: 'back.out(1.4)',
      scrollTrigger: { trigger: tag, start: 'top 92%', toggleActions: 'play none none none' }
    }
  );
});

/* Campañas split — left slides from left, right from right */
gsap.utils.toArray('.campanas-left').forEach(el => {
  gsap.fromTo(el, { opacity: 0, x: -50 },
    { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } });
});
gsap.utils.toArray('.campanas-right').forEach(el => {
  gsap.fromTo(el, { opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } });
});

/* Ad columns — stagger in */
gsap.utils.toArray('.ad-col').forEach((col, i) => {
  gsap.fromTo(col,
    { opacity: 0, y: 40, scale: 0.95 },
    {
      opacity: 1, y: 0, scale: 1, duration: 0.9, delay: i * 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: col, start: 'top 90%', toggleActions: 'play none none none' }
    }
  );
});

/* Ad labels — slide from side */
gsap.utils.toArray('.ad-label-before').forEach(el => {
  gsap.fromTo(el, { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.6, delay: 0.3, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' } });
});
gsap.utils.toArray('.ad-label-after').forEach(el => {
  gsap.fromTo(el, { opacity: 0, x: 20 },
    { opacity: 1, x: 0, duration: 0.6, delay: 0.3, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' } });
});

/* Ad controls — fade up */
gsap.utils.toArray('.ad-controls').forEach(el => {
  gsap.fromTo(el, { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, delay: 0.4, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 95%', toggleActions: 'play none none none' } });
});

/* Contact section — stagger inner elements */
gsap.utils.toArray('.contacto-center').forEach(el => {
  const elements = el.querySelectorAll('.section-label, .contacto-sub, .btn-cta, .contacto-frase');
  gsap.fromTo(elements, { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } });
});

/* Footer — fade in */
gsap.fromTo('#footer', { opacity: 0 },
  { opacity: 1, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '#footer', start: 'top 95%', toggleActions: 'play none none none' } });

/* ===========================
   PARALLAX HERO BG
=========================== */
gsap.to('.hero-bg', {
  yPercent: 30, ease: 'none',
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
});

/* ===========================
   PARALLAX — CAROUSEL IMAGES
=========================== */
const paralaxDone = new WeakSet();
function setupImgParallax() {
  document.querySelectorAll('.car-slide .par-wrap').forEach(wrap => {
    if (paralaxDone.has(wrap)) return;
    paralaxDone.add(wrap);
    const trigger = wrap.closest('.car-slide');
    gsap.fromTo(wrap, { yPercent: -8 }, {
      yPercent: 8, ease: 'none',
      scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: 1 }
    });
  });
  ScrollTrigger.refresh();
}

/* ===========================
   STAR MOUSE TILT
=========================== */
if (!('ontouchstart' in window)) {
  document.addEventListener('mousemove', e => {
    const dx = (e.clientX / window.innerWidth - 0.5) * 2;
    const dy = (e.clientY / window.innerHeight - 0.5) * 2;
    gsap.to('#astGrande', { rotationX: -dy * 18, rotationY: dx * 22, duration: 0.9, ease: 'power2.out' });
    gsap.to('#astPiccolo', { rotationX: -dy * 12, rotationY: dx * 14, duration: 1.1, ease: 'power2.out' });
  }, { passive: true });
}

/* ===========================
   NAV SCROLL
=========================== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 60); }, { passive: true });

/* ===========================
   HAMBURGER
=========================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => {
  if (mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  } else {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
});
mobileClose.addEventListener('click', () => { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; });
mobileMenu.addEventListener('click', (e) => { if (e.target === mobileMenu) { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; } });
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; }));

/* ===========================
   MOUSE GLOW
=========================== */
const mouseGlow = document.getElementById('mouseGlow');
if (mouseGlow && !('ontouchstart' in window)) {
  let mx = window.innerWidth / 2, my = window.innerHeight / 2, cx = mx, cy = my;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  (function loopGlow() {
    cx += (mx - cx) * 0.07; cy += (my - cy) * 0.07;
    mouseGlow.style.left = cx + 'px'; mouseGlow.style.top = cy + 'px';
    requestAnimationFrame(loopGlow);
  })();
}

/* ===========================
   IMPACT NUMBER — Count-up animation
=========================== */
(function () {
  const numEl = document.querySelector('.impact-number');
  if (!numEl) return;

  const target = parseInt(numEl.dataset.target || '200000', 10);
  let triggered = false;

  function fmt(n) {
    return Math.round(n).toLocaleString('de-DE'); // 200.000 (punto miles)
  }

  ScrollTrigger.create({
    trigger: numEl,
    start: 'top 85%',
    onEnter: () => {
      if (triggered) return;
      triggered = true;

      /* Cascade Slide-Up Text Reveal */
      const targetStr = fmt(target);
      numEl.innerHTML = '';
      numEl.style.display = 'inline-flex';
      numEl.style.overflow = 'hidden';
      numEl.style.lineHeight = '1.1';
      numEl.style.padding = '0.05em 0';

      targetStr.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        numEl.appendChild(span);
      });

      const row = numEl.closest('.impact-row');
      const tl = gsap.timeline();
      const plusEl = row.querySelector('.impact-plus');
      const unitEl = row.querySelector('.impact-unit');
      const rightEl = row.querySelector('.impact-right');

      if (plusEl) gsap.set(plusEl, { opacity: 0, scale: 0.5 });
      if (unitEl) gsap.set(unitEl, { opacity: 0, x: -20 });
      if (rightEl) gsap.set(rightEl, { opacity: 0, x: 20 });

      if (plusEl) {
        tl.to(plusEl, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' });
      }

      tl.fromTo(numEl.children,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
        "-=0.3"
      );

      if (unitEl) {
        tl.to(unitEl, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, "-=0.5");
      }

      if (rightEl) {
        tl.to(rightEl, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6");
      }
    }
  });
})();

/* ===========================
   CAROUSELS — FIXED WIDTH
=========================== */
function initCarousel(trackId, slideCount) {
  const track = document.getElementById(trackId);
  if (!track) return;

  const viewport = track.parentElement;
  const dotsEl = document.getElementById(trackId.replace('track-', 'dots-'));
  const prevBtn = viewport.querySelector('.prev-btn');
  const nextBtn = viewport.querySelector('.next-btn');
  const GAP = 12;
  let current = 0;

  const slides = Array.from(track.querySelectorAll('.car-slide'));

  function getOffset(idx) {
    const slideW = slides[0]?.offsetWidth || 0;
    return idx * (slideW + GAP);
  }
  function getMaxOffset() {
    const slideW = slides[0]?.offsetWidth || 0;
    const total = slides.length * (slideW + GAP) - GAP;
    return Math.max(0, total - viewport.offsetWidth);
  }

  function buildDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    slides.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.className = 'car-dot' + (i === current ? ' active' : '');
      btn.setAttribute('aria-label', 'Slide ' + (i + 1));
      btn.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(btn);
    });
  }
  function updateDots() {
    if (!dotsEl) return;
    dotsEl.querySelectorAll('.car-dot').forEach((d, i) => { d.classList.toggle('active', i === current); });
  }

  let autoTimer;

  function startAuto() {
    autoTimer = setInterval(() => {
      let nextIdx = current + 1;
      if (getOffset(nextIdx) > getMaxOffset() || nextIdx >= slides.length) {
        nextIdx = 0;
      }
      goTo(nextIdx, true);
    }, 4500);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  function goTo(idx, isAuto = false) {
    current = Math.max(0, Math.min(idx, slides.length - 1));
    const clamped = Math.min(getOffset(current), getMaxOffset());
    const slideDur = isAuto ? 1.2 : 0.52;
    
    gsap.to(track, { x: -clamped, duration: slideDur, ease: 'power2.inOut' });
    
    // Scale animation during slide movement
    gsap.to(slides, {
      keyframes: [
        { scale: 0.92, duration: slideDur / 2, ease: 'power1.inOut' },
        { scale: 1, duration: slideDur / 2, ease: 'power1.inOut' }
      ]
    });

    updateDots();
  }

  prevBtn?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  let touchX = 0;
  viewport.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; resetAuto(); }, { passive: true });
  viewport.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
  });

  window.addEventListener('resize', () => { gsap.set(track, { x: 0 }); current = 0; buildDots(); updateDots(); resetAuto(); });

  buildDots();
  startAuto();
}

initCarousel('track-branding', 7);
initCarousel('track-planning', 2);
initCarousel('track-campanas-results', 12);
initCarousel('track-merch', 4);

/* ===========================
   ANTES / DESPUÉS — Sincronizado con autoplay
=========================== */
(function () {
  const antesEl = document.getElementById('ad-antes');
  const despuesEl = document.getElementById('ad-despues');
  const dotsEl = document.getElementById('ad-dots');
  if (!antesEl || !despuesEl) return;

  const antesImgs = antesEl.querySelectorAll('.ad-img');
  const despuesImgs = despuesEl.querySelectorAll('.ad-img');
  const totalSteps = Math.max(antesImgs.length, despuesImgs.length);
  let current = 0;
  let autoTimer = null;

  function show(idx) {
    current = ((idx % totalSteps) + totalSteps) % totalSteps;
    antesImgs.forEach((img, i) => img.classList.toggle('active', i === current % antesImgs.length));
    despuesImgs.forEach((img, i) => img.classList.toggle('active', i === current % despuesImgs.length));
    if (dotsEl) {
      dotsEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
    }
  }

  function buildDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    for (let i = 0; i < totalSteps; i++) {
      const d = document.createElement('button');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Imagen ' + (i + 1));
      d.addEventListener('click', () => { show(i); restartAuto(); });
      dotsEl.appendChild(d);
    }
  }

  function startAuto() { autoTimer = setInterval(() => show(current + 1), 2500); }
  function restartAuto() { clearInterval(autoTimer); startAuto(); }

  const prev = document.querySelector('.ad-prev');
  const next = document.querySelector('.ad-next');
  prev && prev.addEventListener('click', () => { show(current - 1); restartAuto(); });
  next && next.addEventListener('click', () => { show(current + 1); restartAuto(); });

  buildDots();
  startAuto();
})();

/* ===========================
   IMAGE MODAL
=========================== */
const imgModal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const modalClose = document.querySelector('.img-modal-close');
const modalOverlay = document.querySelector('.img-modal-overlay');
const modalPrev = document.querySelector('.img-modal-prev');
const modalNext = document.querySelector('.img-modal-next');

let modalSrcs = [], modalIdx = 0;

function showSlide(idx) {
  modalIdx = Math.max(0, Math.min(idx, modalSrcs.length - 1));
  gsap.to(modalImg, {
    opacity: 0, scale: 0.97, duration: 0.15, onComplete: () => {
      modalImg.src = modalSrcs[modalIdx];
      gsap.to(modalImg, { opacity: 1, scale: 1, duration: 0.2 });
    }
  });
  if (modalPrev) modalPrev.style.opacity = modalIdx === 0 ? '0.3' : '1';
  if (modalNext) modalNext.style.opacity = modalIdx === modalSrcs.length - 1 ? '0.3' : '1';
}

function openModal(srcs, idx) {
  modalSrcs = srcs;
  modalImg.style.opacity = '0';
  modalImg.src = srcs[idx];
  imgModal.classList.add('open');
  gsap.fromTo(modalImg, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' });
  document.body.style.overflow = 'hidden';
  showSlide(idx);
}

function closeModal() {
  gsap.to(modalImg, {
    opacity: 0, scale: 0.96, duration: 0.2, onComplete: () => {
      imgModal.classList.remove('open');
      document.body.style.overflow = '';
      modalSrcs = [];
    }
  });
}

/* Wire carousels → modal */
document.querySelectorAll('.carousel-viewport').forEach(vp => {
  const slides = Array.from(vp.querySelectorAll('.car-slide'));
  const srcs = slides.map(s => s.querySelector('img')?.src).filter(Boolean);
  slides.forEach((slide, i) => { slide.addEventListener('click', () => openModal(srcs, i)); });
});

/* Wire grid items → modal (called once in load event) */
function connectGridToModal() {
  ['.arte-item', '.mood-item'].forEach(selector => {
    document.querySelectorAll(selector).forEach(item => {
      const src = item.getAttribute('data-src');
      if (!src) return;
      item.addEventListener('click', () => openModal([src], 0));
    });
  });
}

modalPrev?.addEventListener('click', e => { e.stopPropagation(); showSlide(modalIdx - 1); });
modalNext?.addEventListener('click', e => { e.stopPropagation(); showSlide(modalIdx + 1); });
modalClose?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (!imgModal.classList.contains('open')) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowLeft') showSlide(modalIdx - 1);
  if (e.key === 'ArrowRight') showSlide(modalIdx + 1);
});

/* ===========================
   CONTACTO TITLE — word reveal
=========================== */
(function () {
  const words = document.querySelectorAll('#contactoTitulo .ct-word');
  if (!words.length) return;
  gsap.to(words, {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.11, delay: 0.1,
    scrollTrigger: { trigger: '.contacto-center', start: 'top 85%', toggleActions: 'play none none none' }
  });
})();

/* ===========================
   MAGNETIC BUTTONS
=========================== */
document.querySelectorAll('.btn-primary, .btn-cta').forEach(btn => {
  const shine = btn.querySelector('.btn-shine');
  btn.addEventListener('mouseenter', () => {
    if (shine) gsap.fromTo(shine, { x: '-110%' }, { x: '110%', duration: 0.65, ease: 'power2.inOut' });
    gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
  });
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    gsap.to(btn, { x: (e.clientX - rect.left - rect.width / 2) * 0.3, y: (e.clientY - rect.top - rect.height / 2) * 0.3, duration: 0.25, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
  });
});