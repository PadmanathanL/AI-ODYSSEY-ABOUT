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
     HERO PARALLAX
     ============================================================ */
  function initHeroParallax() {
    const hero = document.querySelector('.hero');
    const bg = document.querySelector('.hero-bg');
    const floating = document.querySelector('.hero-floating');
    if (!hero || !bg || !floating) return;

    function update() {
      const scrollY = window.scrollY;
      const heroH = hero.offsetHeight;
      if (scrollY <= heroH) {
        bg.style.transform = 'translateY(' + (scrollY * 0.4) + 'px)';
        floating.style.transform = 'translateY(' + (scrollY * 0.18) + 'px)';
      }
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
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
const target = new Date('2026-08-29T09:00:00+05:30').getTime();
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
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        const navHeight = document.getElementById('navbar')?.offsetHeight || 72;
        const targetPos = target.offsetTop - navHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      });
    });
  }

  /* ============================================================
     INTERACTIVE CARD RIPPLE EFFECT
     ============================================================ */
  function initRipple() {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    document.querySelectorAll('.btn, .round-card, .stat-card, .entry-card, .judge-card').forEach(el => {
      el.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  /* ============================================================
     DYNAMIC SECTION OBSERVER
     ============================================================ */
  function initDynamicObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Add stagger animation to children
          const children = entry.target.querySelectorAll('.reveal, .round-card, .objective-item, .outcome-item');
          children.forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.08}s`;
          });
        }
      });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
  }

  /* ============================================================
     ENHANCED MOBILE MENU
     ============================================================ */
  function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });

    // Add touch swipe to close
    let touchStartX = 0;
    mobileMenu.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    mobileMenu.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      if (touchEndX - touchStartX > 50) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });
  }

  /* ============================================================
     PERFORMANCE OPTIMIZED SCROLL EFFECTS
     ============================================================ */
  function initScrollEffects() {
    let ticking = false;
    const elementsToAnimate = document.querySelectorAll('.glow-orb, .float-orb');

    function updateElements() {
      const scrollY = window.scrollY;
      elementsToAnimate.forEach((el, index) => {
        const speed = 0.05 + (index * 0.02);
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateElements();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================================
     LAZY LOADING ENHANCEMENT
     ============================================================ */
  function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading supported
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
      });
    } else {
      // Fallback for browsers without native lazy loading
      const lazyImages = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  /* ============================================================
     KEYBOARD NAVIGATION ENHANCEMENT
     ============================================================ */
  function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      // ESC to close mobile menu
      if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const hamburger = document.getElementById('hamburger');
        if (mobileMenu?.classList.contains('open')) {
          hamburger?.classList.remove('open');
          mobileMenu.classList.remove('open');
        }
      }

      // Space to scroll down
      if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
      }
    });
  }

  /* ============================================================
     INTERACTIVE FORM ENHANCEMENTS
     ============================================================ */
  function initFormEnhancements() {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    inputs.forEach(input => {
      // Add floating label effect
      input.addEventListener('focus', () => {
        input.parentElement?.classList.add('focused');
      });

      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement?.classList.remove('focused');
        }
      });

      // Real-time validation feedback
      input.addEventListener('input', () => {
        if (input.value.length > 0) {
          input.style.borderColor = 'var(--primary)';
        } else {
          input.style.borderColor = 'var(--border)';
        }
      });
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
    initHeroParallax();
    initTagline();
    initCursor();
    initTheme();
    initNav();
    initCountdown();
    initFaq();
    initReveal();
    initCounters();
    initJudgeBars();
    initMagnetic();
    initTilt();
    initRankPhotos();
    initScrollTop();
    initForm();
    initSmoothScroll();
    initRipple();
    initDynamicObserver();
    initMobileMenu();
    initScrollEffects();
    initLazyLoading();
    initKeyboardNav();
    initFormEnhancements();
  });
})();
