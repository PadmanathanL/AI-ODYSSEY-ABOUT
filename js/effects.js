/* ============================================================
   AI Odyssey 2026 — Background Effects
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Neural Network Canvas ---------- */
  function buildNeural(canvas, opts) {
    const ctx = canvas.getContext('2d');
    const o = Object.assign({ count: 36, linkDist: 160, speed: 0.4 }, opts || {});
    let width, height;
    const nodes = [];

    function rand(min, max) { return min + Math.random() * (max - min); }

    function resize() {
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || window.innerHeight;
      nodes.length = 0;
      const count = o.count * Math.max(0.5, Math.min(1.4, width / 1300));
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: rand(0, width),
          y: rand(0, height),
          vx: rand(-o.speed, o.speed),
          vy: rand(-o.speed, o.speed),
          r: rand(1.5, 3.5),
          hue: rand(250, 330),
          pulse: rand(0, Math.PI * 2)
        });
      }
    }
    resize();
    window.addEventListener('resize', resize);

    let raf = null;
    function draw() {
      const t = Date.now() / 1000;
      ctx.clearRect(0, 0, width, height);

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < o.linkDist) {
            const alpha = 0.35 * (1 - dist / o.linkDist);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 85%, 70%, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        const glow = 0.5 + 0.5 * Math.sin(t * 2 + n.pulse);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue}, 90%, 72%, ${0.45 + glow * 0.4})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 2.6, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue}, 90%, 70%, ${0.08 + glow * 0.08})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { if (raf) cancelAnimationFrame(raf); };
  }

  /* ---------- Animated Grid Canvas ---------- */
  function initGrid() {
    const canvas = document.getElementById('grid-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let hue = 0;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const size = 55;
      ctx.strokeStyle = 'hsla(250, 80%, 70%, 0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += size) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += size) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      const t = Date.now() / 1000;
      for (let x = size / 2; x <= width; x += size) {
        for (let y = size / 2; y <= height; y += size) {
          const glow = 0.5 + 0.5 * Math.sin(t * 2 + x * 0.01 + y * 0.01);
          ctx.beginPath();
          ctx.arc(x, y, 1.5 + glow * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${(hue + x * 0.05) % 360}, 90%, 70%, ${0.15 + glow * 0.3})`;
          ctx.fill();
        }
      }
      hue = (hue + 0.1) % 360;
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ---------- Floating Particles Canvas ---------- */
  function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const COUNT = 70;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticlesArr();
    }

    function initParticlesArr() {
      particles = [];
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 2 + 0.5,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          hue: Math.random() * 360
        });
      }
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const t = Date.now() / 1000;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        const pulse = 0.6 + 0.4 * Math.sin(t * 2 + p.r);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${0.3 + pulse * 0.4})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(250, 80%, 70%, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

/* ---------- Mouse Follow Glow ---------- */
  function initMouseGlow() {
    const glow = document.getElementById('mouse-glow');
    if (!glow) return;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx, cy = ty;

    window.addEventListener('mousemove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
    });

    function animate() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      glow.style.left = cx + 'px';
      glow.style.top = cy + 'px';
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ---------- Neural Network Canvas (background AI effect) ---------- */
  function initNeuralCanvas() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    const nodes = [];
    const NODE_COUNT = 26;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 2 + 1.5
        });
      }
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const t = Date.now() / 1000;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 150) {
            const alpha = 0.35 * (1 - dist / 150);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(109, 91, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + n.r);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${0.4 + pulse * 0.5})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ---------- Loader Neural Canvas (loading screen AI effect) ---------- */
  function initLoaderCanvas() {
    const canvas = document.getElementById('loader-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    const nodes = [];
    const NODE_COUNT = 22;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: Math.random() * 2 + 1
        });
      }
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const t = Date.now() / 1000;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            const alpha = 0.4 * (1 - dist / 130);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(109, 91, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        const pulse = 0.5 + 0.5 * Math.sin(t * 3 + n.r);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${0.4 + pulse * 0.5})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initGrid();
    initNeuralCanvas();
    initParticles();
    initMouseGlow();
    initLoaderCanvas();
  });
})();
