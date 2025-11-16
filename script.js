document.addEventListener('DOMContentLoaded', () => {
  
  const enterBtn = document.getElementById('enterBtn');
  const landingPage = document.getElementById('landingPage');
  const mainContent = document.getElementById('mainContent');
  const navLinks = document.querySelectorAll('.nav-links a');
  const nav = document.querySelector('.navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navLinks');
  const sections = document.querySelectorAll('section');
  const yearEl = document.getElementById('year');

  
  requestAnimationFrame(() => landingPage.classList.add('enter'));

  
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      landingPage.style.opacity = '0';
      setTimeout(() => {
        landingPage.style.display = 'none';
        mainContent.style.display = 'block';
        void mainContent.offsetWidth; 
        mainContent.classList.add('fade-in');
        queueHeroSequence();
      }, 800);
    });
  }

  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        const navH = nav.offsetHeight || 0;
        const y = target.getBoundingClientRect().top + window.scrollY - (navH + 8);
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
        entry.target.classList.add('in'); 
      }
    });
  }, { root: null, rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => {
    s.classList.add('reveal');
    observer.observe(s);
  });

  
  function queueHeroSequence(){
    const seqEls = document.querySelectorAll('.reveal-seq');
    seqEls.forEach((el,i) => {
      setTimeout(()=> el.classList.add('in'), 150 + i*120);
    });
  }
 
  if (getComputedStyle(mainContent).display !== 'none') queueHeroSequence();

  
  const counters = document.querySelectorAll('.num[data-count]');
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        let n = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const tick = () => {
          n = Math.min(target, n + step);
          el.textContent = n.toString();
          if (n < target) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countObs.unobserve(el);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach(c => countObs.observe(c));

 
  const tilts = document.querySelectorAll('.tilt');
  const maxTilt = 8;
  const resetTilt = el => el.style.transform = '';
  tilts.forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const rx = (+py * maxTilt).toFixed(2);
      const ry = (-px * maxTilt).toFixed(2);
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    });
    el.addEventListener('mouseleave', () => resetTilt(el));
    el.addEventListener('touchend', () => resetTilt(el), { passive: true });
  });

 
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  
  const gridCanvas = document.getElementById('bg-grid');
  if (gridCanvas) {
    const ctx = gridCanvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const draw = () => {
      const w = innerWidth, h = innerHeight;
      gridCanvas.width = w * DPR;
      gridCanvas.height = h * DPR;
      gridCanvas.style.width = w + 'px';
      gridCanvas.style.height = h + 'px';
      ctx.setTransform(DPR,0,0,DPR,0,0);
      ctx.clearRect(0, 0, w, h);

      const step = 64;
      ctx.strokeStyle = 'rgba(122,108,240,.12)';
      ctx.lineWidth = 1;

      for (let x = 0; x < w; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
    };
    draw();
    window.addEventListener('resize', draw, { passive: true });
    window.addEventListener('scroll', () => {
      gridCanvas.style.transform = `translateY(${window.scrollY * 0.06}px)`;
    }, { passive: true });
  }
});
