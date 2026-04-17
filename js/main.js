/* =========================================================
   Adobe Landing — Animations
   ========================================================= */

(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Ink trail scroll progress ----------
  const inkFill = document.querySelector('.ink-fill');
  if (inkFill) {
    const updateInk = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      inkFill.style.height = `${Math.min(100, Math.max(0, pct))}%`;
    };
    window.addEventListener('scroll', updateInk, { passive: true });
    updateInk();
  }

  // ---------- Typewriter on hero name ----------
  const typed = document.querySelector('.typed');
  if (typed && !prefersReduced) {
    const text = typed.dataset.text || '';
    typed.textContent = '';
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        typed.textContent += text.charAt(i);
        i++;
        setTimeout(tick, 80);
      } else {
        const caret = document.querySelector('.caret');
        if (caret) setTimeout(() => caret.remove(), 2000);
      }
    };
    setTimeout(tick, 400);
  } else if (typed) {
    typed.textContent = typed.dataset.text || '';
    const caret = document.querySelector('.caret');
    if (caret) caret.remove();
  }

  // ---------- Particle field in hero ----------
  const canvas = document.getElementById('particles');
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext('2d');
    let w, h, particles;
    const COUNT = 48;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.4,
        a: Math.random() * 0.4 + 0.1
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // Subtle connecting lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 140) {
            ctx.strokeStyle = `rgba(250,15,0,${0.08 * (1 - d / 140)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      // Particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };

    const init = () => { resize(); seed(); draw(); };
    init();
    window.addEventListener('resize', () => { resize(); seed(); });
  }

  // ---------- Observer-based in-view reveals (timeline) ----------
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.node').forEach(n => io.observe(n));
  } else {
    document.querySelectorAll('.node').forEach(n => n.classList.add('in-view'));
  }

  // ---------- Metric count-up ----------
  const metricEls = document.querySelectorAll('.metric-value');
  if (metricEls.length && 'IntersectionObserver' in window) {
    const countUp = el => {
      const target = parseFloat(el.dataset.count || '0');
      const suffix = el.dataset.suffix || '';
      if (prefersReduced) { el.textContent = target + suffix; return; }
      const duration = 1400;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min(1, (now - start) / duration);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased * 10) / 10;
        const display = (target >= 10) ? Math.round(target * eased) : value;
        el.textContent = display + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(tick);
    };
    const mio = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { countUp(e.target); mio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    metricEls.forEach(el => mio.observe(el));
  }

  // ---------- "Create the future." assemble animation ----------
  const assemble = document.querySelector('.assemble');
  if (assemble) {
    const text = assemble.dataset.text || assemble.textContent;
    assemble.innerHTML = '';
    const frag = document.createDocumentFragment();
    const spans = [];
    [...text].forEach(ch => {
      const span = document.createElement('span');
      span.className = 'letter-char';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      if (!prefersReduced) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 120 + Math.random() * 240;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        const rot = (Math.random() - 0.5) * 120;
        span.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
      } else {
        span.style.opacity = 1;
      }
      frag.appendChild(span);
      spans.push(span);
    });
    assemble.appendChild(frag);

    if (!prefersReduced && window.gsap) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.gsap.to(spans, {
        x: 0, y: 0, rotate: 0, opacity: 1,
        duration: 1.1,
        ease: 'power4.out',
        stagger: { each: 0.025, from: 'random' },
        scrollTrigger: {
          trigger: '.closing',
          start: 'top 70%',
          once: true,
        }
      });
    } else {
      spans.forEach(s => { s.style.opacity = 1; s.style.transform = 'none'; });
    }
  }

  // ---------- GSAP niceties (parallax / fades) ----------
  if (window.gsap && window.ScrollTrigger && !prefersReduced) {
    window.gsap.registerPlugin(window.ScrollTrigger);

    window.gsap.utils.toArray('.section-title').forEach(el => {
      window.gsap.from(el, {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      });
    });

    window.gsap.utils.toArray('.cc-card').forEach((card, i) => {
      window.gsap.from(card, {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.08,
        scrollTrigger: { trigger: card, start: 'top 88%', once: true }
      });
    });

    window.gsap.utils.toArray('.pub').forEach(pub => {
      window.gsap.from(pub, {
        x: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: pub, start: 'top 90%', once: true }
      });
    });

    window.gsap.utils.toArray('.skill-group').forEach(g => {
      window.gsap.from(g, {
        y: 20, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: g, start: 'top 92%', once: true }
      });
    });
  }

  // ---------- Tilt on cards ----------
  if (window.VanillaTilt && !prefersReduced) {
    window.VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 8,
      speed: 600,
      glare: true,
      'max-glare': 0.15,
      perspective: 1200,
    });
  }

})();
