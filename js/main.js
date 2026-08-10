/* ============================================================
   AI Odyssey 2026 — Main Interactions
   ============================================================ */

(function () {
  'use strict';

  // Mark that JS is active so the reveal-on-scroll hidden state applies.
  // If this script fails to load, content stays visible (no blank page).
  document.documentElement.classList.add('js');

  /* ============================================================
     LOADING SCREEN
     ============================================================ */
function initLoading() {
    const screen = document.getElementById('loading-screen');
    const progress = document.getElementById('loader-progress');
    const pctEl = document.getElementById('loader-pct');
    const typeEl = document.getElementById('loader-type');
    if (!screen || !progress) return;
    document.body.classList.add('loading');

    // Typewriter cycling messages
    const messages = [
      'Initializing Neural Networks…',
      'Loading AI Models…',
      'Training Deep Learning…',
      'Compiling Prompts…',
      'Warming Up Engines…',
      'Preparing Your Journey…'
    ];
    let msgIndex = 0;
    let charIndex = 0;
    let deleting = false;
    function typeLoop() {
      const full = messages[msgIndex];
      if (!deleting) {
        charIndex++;
        if (charIndex === full.length) { deleting = true; return setTimeout(typeLoop, 1100); }
      } else {
        charIndex--;
        if (charIndex === 0) { deleting = false; msgIndex = (msgIndex + 1) % messages.length; }
      }
      typeEl.textContent = full.slice(0, charIndex);
      setTimeout(typeLoop, deleting ? 30 : 70);
    }
    typeLoop();

    let p = 0;
    const timer = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) {
        p = 100;
        clearInterval(timer);
        progress.style.width = '100%';
        if (pctEl) pctEl.textContent = '100%';
        setTimeout(() => {
          screen.classList.add('hide');
          document.body.classList.remove('loading');
          window.scrollTo({ top: 0, behavior: 'auto' });
        }, 500);
      } else {
        progress.style.width = Math.floor(p) + '%';
        if (pctEl) pctEl.textContent = Math.floor(p) + '%';
      }
    }, 140);
  }

  /* ============================================================
     SCROLL PROGRESS BAR
     ============================================================ */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = p + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ============================================================
     HERO VIDEO READY
     ============================================================ */
  function initHeroVideo() {
    const video = document.getElementById('hero-video');
    if (!video) return;
    const show = () => video.classList.add('ready');
    if (video.readyState >= 2) { show(); }
    else {
      video.addEventListener('loadeddata', show);
      video.addEventListener('canplay', show);
      video.addEventListener('error', show); // fall back to gradient bg
    }
    // Fallback: ensure it shows even if the CDN video fails
    setTimeout(show, 2500);
  }

  /* ============================================================
     HERO TAGLINE TYPEWRITER
     ============================================================ */
  function initTagline() {
    const el = document.querySelector('.hero-tagline');
    if (!el) return;
    const phrases = [
      'From Prompt to Product',
      'Think Smarter. Build Faster.',
      'Innovate Together.'
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    function tick() {
      const full = phrases[phraseIdx];
      charIdx += deleting ? -1 : 1;
      el.textContent = full.slice(0, charIdx);
      let delay = deleting ? 40 : 85;
      if (!deleting && charIdx === full.length) {
        delay = 1800;
        deleting = true;
      } else if (deleting && charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = 350;
      }
      setTimeout(tick, delay);
    }
    if (document.documentElement.classList.contains('js')) {
      setTimeout(tick, 800);
    }
  }

  /* ============================================================
     MAGNETIC BUTTONS
     ============================================================ */
  function initMagnetic() {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    const magnets = document.querySelectorAll('.btn, .social-btn');
    magnets.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ============================================================
     TILT / 3D HOVER ON CARDS
     ============================================================ */
  function initTilt() {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
const cards = document.querySelectorAll('.round-card, .judge-card, .entry-card, .stat-card, .person-card, .req-card, .rank-node, .hierarchy-card');
    cards.forEach((card) => {
      card.style.transformStyle = 'preserve-3d';
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ============================================================
     CUSTOM CURSOR
     ============================================================ */
  function initCursor() {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;
    document.body.classList.add('no-cursor');
    let mx = -100, my = -100;
    let rx = mx, ry = my;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    });

    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    }
    loop();

    const hoverTargets = 'a, button, .btn, input, select, textarea, .faq-question';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest && e.target.closest(hoverTargets)) ring.classList.add('hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest && e.target.closest(hoverTargets)) ring.classList.remove('hover');
    });
  }

/* ============================================================
     THEME TOGGLE
     ============================================================ */
  function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
    if (!toggle) return;
    const saved = localStorage.getItem('aiodyssey-theme');
    if (saved) root.setAttribute('data-theme', saved);
    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('aiodyssey-theme', next);
    });
  }

  /* ============================================================
     NAVIGATION (scroll, active link, mobile menu)
     ============================================================ */
  function initNav() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!navbar || !hamburger || !mobileMenu) return;

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
      updateActiveLink();
    });

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });

    function updateActiveLink() {
      const sections = document.querySelectorAll('section[id]');
      const links = document.querySelectorAll('.nav-link');
      let current = 'home';
      sections.forEach((sec) => {
        const top = window.scrollY + 120;
        if (top >= sec.offsetTop) current = sec.id;
      });
      links.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
      });
    }
  }

  /* ============================================================
     COUNTDOWN TIMER
     ============================================================ */
  function initCountdown() {
const target = new Date('2026-09-12T09:00:00+05:30').getTime();
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');
    if (!daysEl) return;

    function tick() {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minsEl.textContent = '00';
        secsEl.textContent = '00';
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minsEl.textContent = String(mins).padStart(2, '0');
      secsEl.textContent = String(secs).padStart(2, '0');
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ============================================================
     FAQ ACCORDION
     ============================================================ */
  function initFaq() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach((item) => {
      const q = item.querySelector('.faq-question');
      const ans = item.querySelector('.faq-answer');
      if (!q || !ans) return;
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach((other) => {
          other.classList.remove('open');
          other.querySelector('.faq-answer').style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('open');
          ans.style.maxHeight = ans.scrollHeight + 'px';
        }
      });
    });
  }

  /* ============================================================
     REVEAL ON SCROLL
     ============================================================ */
  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }

  /* ============================================================
     STAT COUNTERS
     ============================================================ */
  function initCounters() {
    const counters = document.querySelectorAll('.stat-num[data-count]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1500;
        const start = performance.now();
        function update(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target);
          if (p < 1) requestAnimationFrame(update);
          else el.textContent = target;
        }
        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => observer.observe(el));
  }

  /* ============================================================
     JUDGING BARS
     ============================================================ */
  function initJudgeBars() {
    const bars = document.querySelectorAll('.judge-bar');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const w = el.getAttribute('style').match(/--w:([\d.]+)%/);
          if (w) el.style.width = w[1] + '%';
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach((el) => observer.observe(el));
  }

/* ============================================================
     JOURNEY MAP (Interactive Schedule)
     ============================================================ */
  function initJourney() {
const stage = document.querySelector('.journey-stage');
    const nodesWrap = document.getElementById('journey-nodes');
    const popup = document.getElementById('journey-popup');
    const marker = document.getElementById('journey-marker');
    const progressPath = document.getElementById('journey-path-progress');
    const infoCard = document.getElementById('journey-info');
    const stopNum = document.getElementById('journey-stop-num');
    const stopTime = document.getElementById('journey-stop-time');
    const stopTitle = document.getElementById('journey-stop-title');
if (!stage || !nodesWrap || !popup || !marker || !progressPath || !infoCard) return;

const destinations = [
      { num: 'NODE 1', time: '9.00 – 9.45 AM', title: 'Inauguration', desc: 'Opening ceremony and welcome address.' },
      { num: 'NODE 2', time: '9.45 – 10.00 AM', title: 'Break Time', desc: 'Short break before the competition begins.' },
      { num: 'NODE 3', time: '10.00 – 10.45 AM', title: 'Round 1 · Scan & Create', desc: 'AI image generation challenge.' },
      { num: 'NODE 4', time: '10.45 AM – 12.00 PM', title: 'Round 2 · Bug Battle', desc: 'Debugging challenge with live leaderboard.' },
      { num: 'NODE 5', time: '12.00 – 12.45 PM', title: 'Lunch', desc: 'Break for lunch and networking.' },
      { num: 'NODE 6', time: '1.00 – 2.00 PM', title: 'Round 3 · Motion Rush', desc: 'Animated UI recreation challenge.' },
      { num: 'NODE 7', time: '2.00 – 3.45 PM', title: 'Round 4 · Build Blitz', desc: 'Build a fully functional web application.' },
      { num: 'NODE 8', time: '4.00 – 4.30 PM', title: 'Prize Distribution', desc: 'Awards and closing ceremony.' }
    ];

    const total = destinations.length;
    const pathLength = progressPath.getTotalLength() || 2000;

    // Map SVG viewBox coords (1000 x 620) to the stage's actual pixels.
    function scaleX(v) { return (v / 1000) * stage.clientWidth; }
    function scaleY(v) { return (v / 620) * stage.clientHeight; }

    // Sample a point on the path at normalized distance t (0..1).
    function pathPoint(t) {
      const pt = progressPath.getPointAtLength(Math.max(0, Math.min(1, t)) * pathLength);
      return { x: scaleX(pt.x), y: scaleY(pt.y) };
    }

    // Pre-compute node positions evenly along the path so they sit exactly on it.
    const positions = destinations.map((_, i) => pathPoint(i / (total - 1)));

    // Build nodes
    const nodes = [];
    destinations.forEach((d, i) => {
      const node = document.createElement('div');
      node.className = 'journey-node';
      node.dataset.index = i;
      node.style.left = positions[i].x + 'px';
      node.style.top = positions[i].y + 'px';
      node.innerHTML = '<div class="node-dot">' + (i + 1) + '</div><div class="node-label">' + d.title + '</div>';
node.addEventListener('click', () => { animateTo(i); showPopup(i); });
      node.addEventListener('mouseenter', () => showPopup(i));
      node.addEventListener('mouseleave', hidePopup);
      nodesWrap.appendChild(node);
      nodes.push(node);
    });

    // Popup helpers
    function showPopup(i) {
      const d = destinations[i];
      popup.innerHTML = '<div class="popup-arrow"></div><div class="popup-num">' + d.num +
        ' · ' + d.time + '</div><div class="popup-title">' + d.title +
        '</div><div class="popup-desc">' + d.desc + '</div>';
      popup.classList.add('show');
      const px = positions[i].x;
      const py = positions[i].y;
      popup.style.left = px + 'px';
      popup.style.top = Math.max(24, py - popup.offsetHeight - 12) + 'px';
      popup.style.transform = 'translateX(-50%)';
    }
    function hidePopup() { popup.classList.remove('show'); }

// Set state (marker, progress, labels, node classes) for a given index.
    function setState(i) {
      i = Math.max(0, Math.min(total - 1, i));
      currentIndex = i;
      const t = i / (total - 1);
      marker.style.left = positions[i].x + 'px';
      marker.style.top = positions[i].y + 'px';
progressPath.style.strokeDashoffset = pathLength - (pathLength * t);
      stopNum.textContent = destinations[i].num + ' · ' + (i + 1) + ' / ' + total;
      stopTime.textContent = destinations[i].time;
      stopTitle.textContent = destinations[i].title;
      nodes.forEach((el, idx) => {
        el.classList.toggle('reached', idx <= i);
        el.classList.toggle('current', idx === i);
      });
      // Show the info card and popup when the rocket has reached a node.
      infoCard.classList.add('show');
      showPopup(i);
    }

// Smoothly animate the marker from current index to target index along the path.
    function animateTo(target, dur) {
      target = Math.max(0, Math.min(total - 1, target));
      if (target === currentIndex) { setState(target); return; }
      // Hide the info card and popup while the rocket is travelling between nodes.
      infoCard.classList.remove('show');
      hidePopup();
      const from = currentIndex;
      const start = performance.now();
      // Default is quick; pass a large duration for a slow cruise to the destination.
      const duration = dur || 700;
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const t = from + (target - from) * eased;
        const pt = pathPoint(t / (total - 1));
        marker.style.left = pt.x + 'px';
        marker.style.top = pt.y + 'px';
        const prog = t / (total - 1);
        progressPath.style.strokeDashoffset = pathLength - (pathLength * prog);
        if (p < 1) requestAnimationFrame(tick);
        else setState(target);
      }
      requestAnimationFrame(tick);
    }

let currentIndex = 0;

// Initialize
    setState(0);
    hidePopup();

    /* ---------- Interactive rocket controls ---------- */

    // Convert a pointer/client event to coordinates relative to the stage.
    function localPos(e) {
      const rect = stage.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    // Find the normalized distance t (0..1) of the point on the path nearest to (x, y).
    const SAMPLE = 600;
    function nearestT(x, y) {
      let bestT = 0;
      let bestD = Infinity;
      for (let i = 0; i <= SAMPLE; i++) {
        const t = i / SAMPLE;
        const pt = progressPath.getPointAtLength(t * pathLength);
        const dx = pt.x - x;
        const dy = pt.y - y;
        const d = dx * dx + dy * dy;
        if (d < bestD) { bestD = d; bestT = t; }
      }
      return bestT;
    }

    // Nearest stop index for a given normalized distance t.
    function nearestStop(t) {
      return Math.round(t * (total - 1));
    }

    // Immediately place the marker at t (used while dragging) with a live popup.
    function placeAt(t) {
      t = Math.max(0, Math.min(1, t));
      const pt = pathPoint(t);
      marker.style.left = pt.x + 'px';
      marker.style.top = pt.y + 'px';
      progressPath.style.strokeDashoffset = pathLength - (pathLength * t);
      const idx = nearestStop(t);
      nodes.forEach((el, i) => {
        el.classList.toggle('reached', i <= idx);
        el.classList.toggle('current', i === idx);
      });
      showPopup(idx);
    }

    // 1) DRAG: grab the rocket and pull it along the path.
    let dragging = false;
    marker.style.pointerEvents = 'auto';
    marker.style.cursor = 'grab';
    marker.addEventListener('pointerdown', (e) => {
      dragging = true;
      marker.style.cursor = 'grabbing';
      if (marker.setPointerCapture) marker.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    marker.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const p = localPos(e);
      placeAt(nearestT(p.x, p.y));
    });
    function endDrag() {
      if (!dragging) return;
      dragging = false;
      marker.style.cursor = 'grab';
      const x = parseFloat(marker.style.left);
      const y = parseFloat(marker.style.top);
      animateTo(nearestStop(nearestT(x, y)));
    }
    marker.addEventListener('pointerup', endDrag);
    marker.addEventListener('pointercancel', endDrag);

    // 2) CLICK PATH: click anywhere on the route to fly the rocket to that spot.
    stage.addEventListener('click', (e) => {
      if (e.target.closest('.journey-node')) return; // nodes handle their own clicks
      const p = localPos(e);
      animateTo(nearestStop(nearestT(p.x, p.y)));
    });

// 3) KEYBOARD: use ArrowLeft / ArrowRight to hop between stops.
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const rect = stage.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!inView) return;
      e.preventDefault();
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      animateTo((currentIndex + dir + total) % total);
    });

// Keep nodes/marker aligned with the stage on resize.
    let resizeRaf = null;
    window.addEventListener('resize', () => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = null;
        for (let i = 0; i < total; i++) {
          positions[i] = pathPoint(i / (total - 1));
          nodes[i].style.left = positions[i].x + 'px';
          nodes[i].style.top = positions[i].y + 'px';
        }
        setState(currentIndex);
      });
    });

}

/* ============================================================
     RANK PHOTO LOADER
     Shows initials placeholder until a real photo is uploaded.
     ============================================================ */
function initRankPhotos() {
    const photos = document.querySelectorAll('.polaroid-photo img');
    photos.forEach((img) => {
      const src = img.getAttribute('data-src');
      if (!src) return; // no photo provided yet → keep initials
      const probe = new Image();
      probe.onload = () => {
        img.src = src;
        img.classList.add('loaded');
        // Hide the initials placeholder once the real photo is available
        const initials = img.parentElement.querySelector('.photo-initials');
        if (initials) initials.style.display = 'none';
      };
      probe.src = src;
    });
  }

  /* ============================================================
     SCROLL TO TOP
     ============================================================ */
  function initScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 500);
    });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     CONTACT FORM
     ============================================================ */
  function initForm() {
    const form = document.getElementById('contact-form');
    const note = document.getElementById('form-note');
    if (!form || !note) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name');
      note.textContent = `🎉 Thanks, ${name}! Your registration request has been received. We'll be in touch soon.`;
      note.style.color = 'var(--primary)';
      form.reset();
      setTimeout(() => { note.textContent = ''; }, 6000);
    });
  }

  /* ============================================================
     INIT ALL
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    initLoading();
    initScrollProgress();
    initHeroVideo();
    initTagline();
    initCursor();
    initTheme();
    initNav();
    initCountdown();
    initFaq();
    initReveal();
    initCounters();
    initJudgeBars();
initJourney();
    initMagnetic();
    initTilt();
initRankPhotos();
    initScrollTop();
    initForm();
  });
})();
