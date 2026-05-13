/* ===========================
   GSAP SETUP
=========================== */
gsap.registerPlugin(ScrollTrigger);

/* ===========================
   HERO ENTRY — GSAP
=========================== */
gsap.set(['.hero-label', '.hero-title', '.hero-sub', '.btn-primary'], {
  opacity: 0,
  y: 36
});
gsap.set('#nav', { opacity: 0, y: -64 });
gsap.set(['#astGrande', '#astPiccolo'], { transformPerspective: 900 });

window.addEventListener('load', () => {
  /* 1 — fade out page curtain */
  const loader = document.getElementById('pageLoader');
  if (loader) {
    gsap.to(loader, {
      opacity: 0, duration: 0.75, delay: 0.05, ease: 'power2.out',
      onComplete: () => { loader.style.display = 'none'; }
    });
  }

  /* 2 — nav slides down */
  gsap.to('#nav', { opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: 'power3.out' });

  /* 3 — hero text stagger */
  gsap.to(['.hero-label', '.hero-title', '.hero-sub', '.btn-primary'], {
    opacity: 1, y: 0, duration: 0.9,
    ease: 'power3.out', stagger: 0.16, delay: 0.35
  });

  /* 4 — stars elastic entrance */
  gsap.fromTo('#astGrande',
    { opacity: 0, scale: 0.4, rotationZ: -80 },
    { opacity: 1, scale: 1, rotationZ: 0, duration: 1.5, delay: 0.55, ease: 'elastic.out(1, 0.55)' }
  );
  gsap.fromTo('#astPiccolo',
    { opacity: 0, scale: 0.4, rotationZ: 80 },
    { opacity: 1, scale: 1, rotationZ: 0, duration: 1.5, delay: 0.8, ease: 'elastic.out(1, 0.55)' }
  );

  /* 5 — stars slow rotation (after entrance settles) */
  gsap.to('#astGrande',  { rotationZ: '+=360', duration: 22, ease: 'none', repeat: -1, delay: 2.1 });
  gsap.to('#astPiccolo', { rotationZ: '-=360', duration: 30, ease: 'none', repeat: -1, delay: 2.5 });

  /* 6 — stars gentle float */
  gsap.to('#astGrande',  { y: -18, duration: 4.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.1 });
  gsap.to('#astPiccolo', { y: -12, duration: 5.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.5 });
});

/* ===========================
   SCROLL REVEAL — GSAP
=========================== */
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 32 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    }
  );
});

/* ===========================
   PARALLAX HERO BG — GSAP
=========================== */
gsap.to('.hero-bg', {
  yPercent: 30,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

/* ===========================
   PARALLAX — CAROUSEL & SHOWCASE IMAGES — GSAP
=========================== */
const paralaxDone = new WeakSet();
function setupImgParallax() {
  document.querySelectorAll('.car-slide .par-wrap, .showcase-wrap .par-wrap').forEach(wrap => {
    if (paralaxDone.has(wrap)) return;
    paralaxDone.add(wrap);
    const trigger = wrap.closest('.car-slide') || wrap.closest('.showcase-wrap');
    gsap.fromTo(wrap,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      }
    );
  });
  ScrollTrigger.refresh();
}

/* ===========================
   STAR MOUSE TILT
=========================== */
if (!('ontouchstart' in window)) {
  document.addEventListener('mousemove', e => {
    const dx = (e.clientX / window.innerWidth  - 0.5) * 2; // -1 → 1
    const dy = (e.clientY / window.innerHeight - 0.5) * 2;
    gsap.to('#astGrande',  { rotationX: -dy * 18, rotationY:  dx * 22, duration: 0.9, ease: 'power2.out' });
    gsap.to('#astPiccolo', { rotationX: -dy * 12, rotationY:  dx * 14, duration: 1.1, ease: 'power2.out' });
  }, { passive: true });
}

/* ===========================
   NAV SCROLL
=========================== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ===========================
   HAMBURGER
=========================== */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});
mobileClose.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
});
document.querySelectorAll('.mobile-link').forEach(l =>
  l.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  })
);

/* ===========================
   MOUSE GLOW
=========================== */
const mouseGlow = document.getElementById('mouseGlow');
if (mouseGlow && !('ontouchstart' in window)) {
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  (function loopGlow() {
    cx += (mx - cx) * 0.07;
    cy += (my - cy) * 0.07;
    mouseGlow.style.left = cx + 'px';
    mouseGlow.style.top  = cy + 'px';
    requestAnimationFrame(loopGlow);
  })();
}

/* ===========================
   CAROUSELS — VARIABLE WIDTH
=========================== */
function initCarousel(trackId, total) {
  const track = document.getElementById(trackId);
  if (!track) return;

  const viewport = track.parentElement;
  const dotsEl   = document.getElementById(trackId.replace('track-', 'dots-'));
  const prevBtn  = viewport.querySelector('.prev-btn');
  const nextBtn  = viewport.querySelector('.next-btn');
  const GAP      = 10;
  let   current  = 0;

  const slides = Array.from(track.querySelectorAll('.car-slide'));

  function getSlideH() { return window.innerWidth <= 768 ? 320 : 460; }

  /* Set each slide's width based on the image's natural aspect ratio */
  function setSlideDimensions() {
    const h = getSlideH();
    slides.forEach(slide => {
      slide.style.height = h + 'px';
      const img = slide.querySelector('img');
      if (!img || !img.naturalWidth) return;
      const ratio = img.naturalWidth / img.naturalHeight;
      const maxW  = Math.round(viewport.offsetWidth * 0.72);
      const minW  = 220;
      const w     = Math.min(Math.max(Math.round(h * ratio), minW), maxW);
      slide.style.width = w + 'px';
    });
    ScrollTrigger.refresh();
  }

  /* Watch each image load */
  let loadedCount = 0;
  slides.forEach(slide => {
    const img = slide.querySelector('img');
    if (!img) return;
    const onLoad = () => {
      setSlideDimensions();
      loadedCount++;
      /* Set up parallax once all images in this carousel are ready */
      if (loadedCount >= slides.length) setupImgParallax();
    };
    if (img.complete && img.naturalWidth > 0) onLoad();
    else img.addEventListener('load', onLoad, { once: true });
  });

  /* Pixel offset to reach slide[idx] */
  function getOffset(idx) {
    let off = 0;
    slides.slice(0, idx).forEach(s => { off += (s.offsetWidth || 300) + GAP; });
    return off;
  }

  /* Max scroll offset: never show empty space on the right */
  function getMaxOffset() {
    let total = 0;
    slides.forEach(s => { total += (s.offsetWidth || 300) + GAP; });
    return Math.max(0, total - GAP - viewport.offsetWidth);
  }

  function buildDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    /* Calculate usable slide positions (stop before empty space) */
    const maxOff = getMaxOffset();
    let dotCount = 0;
    let acc = 0;
    for (let i = 0; i < slides.length; i++) {
      if (acc <= maxOff) dotCount = i + 1;
      acc += (slides[i].offsetWidth || 300) + GAP;
    }
    dotCount = Math.min(dotCount, slides.length);
    for (let i = 0; i < dotCount; i++) {
      const btn = document.createElement('button');
      btn.className = 'car-dot' + (i === current ? ' active' : '');
      btn.setAttribute('aria-label', 'Slide ' + (i + 1));
      btn.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(btn);
    }
  }

  function updateDots() {
    if (!dotsEl) return;
    dotsEl.querySelectorAll('.car-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, total - 1));
    /* Clamp offset so last slides always fill viewport */
    const rawOff    = getOffset(current);
    const clamped   = Math.min(rawOff, getMaxOffset());
    gsap.to(track, { x: -clamped, duration: 0.58, ease: 'power3.out' });
    updateDots();
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  let touchX = 0;
  viewport.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  viewport.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  });

  window.addEventListener('resize', () => { setSlideDimensions(); goTo(0); buildDots(); });

  buildDots();
}

/* Initialize new carousels */
initCarousel('track-branding', 5);
initCarousel('track-planning', 2);
initCarousel('track-campanas-results', 10);
initCarousel('track-merch', 4);

/* Grid items connect to modal (ARTES, MOOD BOARDS, ANTES Y DESPUÉS) */
function connectGridToModal() {
  const gridSelectors = ['.arte-item', '.mood-item', '.antesdespues-item'];
  gridSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(item => {
      const src = item.getAttribute('data-src');
      if (src) {
        item.addEventListener('click', () => {
          openModal([src], 0);
        });
      }
    });
  });
}
connectGridToModal();

window.addEventListener('load', () => {
  setupImgParallax();
  connectGridToModal();
});

/* ===========================
   IMAGE MODAL WITH NAVIGATION
=========================== */
const imgModal     = document.getElementById('imgModal');
const modalImg     = document.getElementById('modalImg');
const modalClose   = document.querySelector('.img-modal-close');
const modalOverlay = document.querySelector('.img-modal-overlay');
const modalPrev    = document.querySelector('.img-modal-prev');
const modalNext    = document.querySelector('.img-modal-next');

let modalSrcs = [];
let modalIdx  = 0;

function showSlide(idx) {
  modalIdx = Math.max(0, Math.min(idx, modalSrcs.length - 1));
  gsap.to(modalImg, { opacity: 0, scale: 0.97, duration: 0.15, onComplete: () => {
    modalImg.src = modalSrcs[modalIdx];
    gsap.to(modalImg, { opacity: 1, scale: 1, duration: 0.2 });
  }});
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
  gsap.to([modalImg], { opacity: 0, scale: 0.96, duration: 0.2, onComplete: () => {
    imgModal.classList.remove('open');
    document.body.style.overflow = '';
    modalSrcs = [];
  }});
}

/* Wire up carousel slides */
document.querySelectorAll('.carousel-wrap').forEach(wrap => {
  const slides = Array.from(wrap.querySelectorAll('.car-slide'));
  const srcs   = slides.map(s => s.querySelector('img')?.src).filter(Boolean);
  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => openModal(srcs, i));
  });
});

/* Wire up Tessa showcase */
const showcaseWrap = document.querySelector('.showcase-wrap');
if (showcaseWrap) {
  const showcaseImg = showcaseWrap.querySelector('img');
  if (showcaseImg) showcaseWrap.addEventListener('click', () => openModal([showcaseImg.src], 0));
}

modalPrev?.addEventListener('click',   e => { e.stopPropagation(); showSlide(modalIdx - 1); });
modalNext?.addEventListener('click',   e => { e.stopPropagation(); showSlide(modalIdx + 1); });
modalClose?.addEventListener('click',  closeModal);
modalOverlay?.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (!imgModal.classList.contains('open')) return;
  if (e.key === 'Escape')     closeModal();
  if (e.key === 'ArrowLeft')  showSlide(modalIdx - 1);
  if (e.key === 'ArrowRight') showSlide(modalIdx + 1);
});

/* ===========================
   CONTACTO TITLE — WORD REVEAL
=========================== */
(function () {
  const words = document.querySelectorAll('#contactoTitulo .ct-word');
  if (!words.length) return;
  gsap.to(words, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.11,
    scrollTrigger: {
      trigger: '#contactoTitulo',
      start: 'top 82%',
      toggleActions: 'play none none none'
    }
  });
})();

/* ===========================
   MAGNETIC BUTTONS — GSAP
=========================== */
document.querySelectorAll('.btn-primary, .btn-cta').forEach(btn => {
  const shine = btn.querySelector('.btn-shine');

  btn.addEventListener('mouseenter', () => {
    if (shine) gsap.fromTo(shine,
      { x: '-110%' },
      { x: '110%', duration: 0.65, ease: 'power2.inOut' }
    );
    gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
  });

  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) * 0.3;
    const y = (e.clientY - rect.top  - rect.height / 2) * 0.3;
    gsap.to(btn, { x, y, duration: 0.25, ease: 'power2.out' });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
  });
});
