
document.addEventListener('DOMContentLoaded', () => {
  try {
    const enterBtn = document.getElementById('enterBtn');
    const landingPage = document.getElementById('landingPage');
    const mainContent = document.getElementById('mainContent');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navLinks');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const yearEl = document.getElementById('year');
    const workCases = Array.from(document.querySelectorAll('.work-grid .case'));
    const particlesContainer = document.getElementById('particles');


    document.querySelectorAll('.btn').forEach(b => b.setAttribute('data-ripple',''));


    if (landingPage) {
      requestAnimationFrame(() => {
        landingPage.classList.add('enter');
        const introElements = landingPage.querySelectorAll('.intro-anim');
        introElements.forEach((el, i) => {
          el.style.animation = `fadeInUp 1s ease forwards`;
          el.style.animationDelay = `${0.2 + i * 0.15}s`;
        });
      });
    } else {
      console.warn('landingPage element not found — skipping landing intro');
    }

  
    if (enterBtn && landingPage) {
      enterBtn.addEventListener('click', () => {
        landingPage.classList.add('fade-out');
        landingPage.style.opacity = '0';
        landingPage.style.transition = 'opacity 0.9s cubic-bezier(0.2, 0.9, 0.2, 1)';
        setTimeout(() => {
          landingPage.style.display = 'none';
          if (mainContent) {
            mainContent.style.display = 'block';
            void mainContent.offsetWidth;
            mainContent.classList.add('fade-in');
            mainContent.style.animation = 'fadeInUp 1s ease forwards';
            if (typeof queueHeroSequence === 'function') queueHeroSequence();
            if (typeof initializeParticles === 'function') initializeParticles();
          }
        }, 900);
      });
    } else {
      if (!enterBtn) console.warn('enterBtn not found');
    }

  
    function initializeParticles() {
      if (!particlesContainer) {
        console.warn('particles container not found');
        return;
      }
      particlesContainer.innerHTML = '';
      const particleCount = window.innerWidth > 768 ? 30 : 15;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.setProperty('--tx', `${Math.random() * 200 - 100}px`);
        particle.style.setProperty('--ty', `${Math.random() * 200 - 100}px`);
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${20 + Math.random() * 20}s`;
        particlesContainer.appendChild(particle);
      }
    }

  
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        const open = navMenu.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(open));
        const bars = navToggle.querySelectorAll('.bar');
        if (open) {
          bars[0].style.transform = 'rotate(45deg) translateY(12px)';
          bars[1].style.opacity = '0';
          bars[2].style.transform = 'rotate(-45deg) translateY(-12px)';
        } else {
          bars[0].style.transform = '';
          bars[1].style.opacity = '1';
          bars[2].style.transform = '';
        }
      });
      navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        const bars = navToggle.querySelectorAll('.bar');
        bars[0].style.transform = '';
        bars[1].style.opacity = '1';
        bars[2].style.transform = '';
      }));
    }

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (!target) return;
          e.preventDefault();
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          const navH = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
          const y = target.getBoundingClientRect().top + window.scrollY - (navH + 12);
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });

  
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });

 
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          const children = entry.target.querySelectorAll('.reveal-seq');
          if (children.length) {
            children.forEach((el, i) => {
              setTimeout(()=> {
                el.classList.add('in');
                if (el.classList.contains('tag-glow') || el.classList.contains('h1-glow') || el.classList.contains('h2-glow') || el.classList.contains('p-glow')) {
                  el.style.animation = 'glow-pulse-effect 0.6s ease-out';
                }
              }, 100 + i * 80);
            });
          }
        }
      });
    }, { root: null, rootMargin: '-15% 0px -15% 0px', threshold: 0.12 });
    document.querySelectorAll('.reveal, .reveal-seq').forEach(el => revealObserver.observe(el));

  
    function queueHeroSequence(){
      const seqEls = document.querySelectorAll('.hero .reveal-seq');
      seqEls.forEach((el, i) => {
        setTimeout(()=> {
          el.classList.add('in');
          el.style.animation = `fadeInUp 0.8s ease forwards`;
          el.style.animationDelay = `${i * 0.1}s`;
        }, 100 + i * 100);
      });
    }
    if (mainContent && getComputedStyle(mainContent).display !== 'none') queueHeroSequence();

 
    const counters = document.querySelectorAll('.num[data-count]');
    if (counters.length) {
      const cntObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const raw = el.dataset.count || '0';
            const parsed = parseInt(raw, 10);
            const target = Number.isFinite(parsed) ? parsed : 0;
            if (!target) {
              el.textContent = raw;
              cntObs.unobserve(el);
              return;
            }
            let current = 0;
            const duration = 1200;
            const stepTime = Math.max(16, Math.floor(duration / target));
            const increment = Math.max(1, Math.round(target / (duration / stepTime)));
            const step = () => {
              current = Math.min(target, current + increment);
              el.textContent = String(current);
              if (current < target) requestAnimationFrame(step);
              else cntObs.unobserve(el);
            };
            requestAnimationFrame(step);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(c => cntObs.observe(c));
    }

  
    const tilts = document.querySelectorAll('.tilt');
    const maxTilt = 8;
    const resetTilt = el => {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0) transition(transform 0.5s cubic-bezier(0.2, 0.9, 0.2, 1))';
    };
    tilts.forEach(el => {
      el.addEventListener('pointermove', e => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        const rx = (+py * maxTilt).toFixed(2);
        const ry = (-px * maxTilt).toFixed(2);
        el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(20px)`;
        el.style.transition = 'none';
      });
      el.addEventListener('pointerleave', () => {
        el.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.9, 0.2, 1)';
        resetTilt(el);
      });
    });

 
    const gridCanvas = document.getElementById('bg-grid');
    if (gridCanvas) {
      const ctx = (gridCanvas.getContext && gridCanvas.getContext('2d')) || null;
      if (ctx) {
        const DPR = Math.min(window.devicePixelRatio || 1, 2);
        let scrollOffset = 0;
        const draw = () => {
          const w = document.documentElement.clientWidth || window.innerWidth;
          const h = document.documentElement.clientHeight || window.innerHeight;
          gridCanvas.width = Math.floor(w * DPR);
          gridCanvas.height = Math.floor(h * DPR);
          gridCanvas.style.width = w + 'px';
          gridCanvas.style.height = h + 'px';
          ctx.setTransform(DPR,0,0,DPR,0,0);
          ctx.clearRect(0,0,w,h);
          const step = 64;
          ctx.strokeStyle = 'rgba(122,108,240,.06)';
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.8;
          for (let x = 0; x < w + step; x += step) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
          }
          for (let y = -step + (scrollOffset % step); y < h + step; y += step) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
        };
        draw();
        let rTimer = null;
        window.addEventListener('resize', ()=>{ clearTimeout(rTimer); rTimer = setTimeout(draw, 120); }, { passive: true });
        window.addEventListener('scroll', () => {
          scrollOffset = window.scrollY;
          gridCanvas.style.transform = `translateY(${window.scrollY * 0.04}px)`;
          draw();
        }, { passive: true });
      }
    }

    document.addEventListener('pointerdown', e => {
      const b = e.target.closest('.btn[data-ripple]');
      if (!b) return;
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple-burst 0.6s ease-out';
      ripple.style.pointerEvents = 'none';
      ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)';
      ripple.style.width = '100px';
      ripple.style.height = '100px';
      ripple.style.left = `${e.offsetX - 50}px`;
      ripple.style.top = `${e.offsetY - 50}px`;
      if (b.classList.contains('primary')) {
        ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)';
      }
      b.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });

 
    document.querySelectorAll('.btn.primary').forEach(btn => {
      btn.addEventListener('mouseenter', function() {
        this.style.animation = 'btn-float 0.6s ease-out';
      });
    });
    document.querySelectorAll('.btn.ghost').forEach(btn => {
      btn.addEventListener('mouseenter', function() {
        this.style.animation = 'btn-float 0.5s ease-out';
      });
    });


    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    const lbCaption = document.getElementById('lb-caption');
    const lbClose = document.querySelector('.lb-close');
    const lbNext = document.querySelector('.lb-next');
    const lbPrev = document.querySelector('.lb-prev');

    let activeIndex = 0;
    const imgs = workCases.map((c) => {
      const img = c.querySelector('img');
      return {
        src: img ? img.getAttribute('src') : '',
        alt: img ? img.getAttribute('alt') || '' : '',
        caption: c.querySelector('.case-meta') ? c.querySelector('.case-meta').innerText.trim() : ''
      };
    });

    function openLightbox(i) {
      if (!lightbox || !lbImg) return;
      activeIndex = i;
      const item = imgs[i];
      lbImg.src = item.src;
      lbImg.alt = item.alt;
      if (lbCaption) lbCaption.textContent = item.caption;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lbImg.style.animation = 'fadeInUp 0.5s ease forwards';
      if (lbCaption) lbCaption.style.animation = 'fadeInUp 0.5s ease 0.1s forwards';
      const vp = document.querySelector('.lb-viewport');
      if (vp) vp.focus();
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      if (lbImg) lbImg.src = '';
      document.body.style.overflow = '';
    }

    function showNext() {
      if (!imgs.length) return;
      activeIndex = (activeIndex + 1) % imgs.length;
      if (lbImg) {
        lbImg.style.animation = 'none';
        void lbImg.offsetWidth;
        lbImg.style.animation = 'fadeInUp 0.4s ease forwards';
      }
      openLightbox(activeIndex);
    }

    function showPrev() {
      if (!imgs.length) return;
      activeIndex = (activeIndex - 1 + imgs.length) % imgs.length;
      if (lbImg) {
        lbImg.style.animation = 'none';
        void lbImg.offsetWidth;
        lbImg.style.animation = 'fadeInUp 0.4s ease forwards';
      }
      openLightbox(activeIndex);
    }

  
    workCases.forEach((c, idx) => {
      c.style.cursor = 'pointer';
      c.addEventListener('click', (ev) => {
        ev.preventDefault();
        openLightbox(idx);
      });
      c.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
        }
      });
      c.setAttribute('tabindex', '0');
      c.setAttribute('role', 'button');
    });

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbNext) lbNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    if (lbPrev) lbPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

    document.addEventListener('keydown', (e) => {
      if (!lightbox || !lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });

    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
    }

  
    document.querySelectorAll('.social-btn').forEach(btn => {
      if (!btn.hasAttribute('role')) btn.setAttribute('role', 'link');
      if (!btn.hasAttribute('tabindex')) btn.setAttribute('tabindex', '0');

      btn.addEventListener('click', (e) => {
        const href = btn.getAttribute('href') || btn.dataset.href;
        if (!href) return;
        if (e.metaKey || e.ctrlKey || e.button === 1) return;
        e.preventDefault();
        window.open(href, '_blank', 'noopener,noreferrer');
      });

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const href = btn.getAttribute('href') || btn.dataset.href;
          if (href) window.open(href, '_blank', 'noopener,noreferrer');
        }
      });
    });

  
    (function swipeLB(){
      let startX = 0, startY = 0;
      const vp = document.querySelector('.lb-viewport');
      if (!vp) return;
      vp.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        startX = t.clientX;
        startY = t.clientY;
      }, { passive: true });
      vp.addEventListener('touchend', (e) => {
        const t = (e.changedTouches && e.changedTouches[0]) || null;
        if (!t) return;
        const dx = t.clientX - startX;
        const dy = t.clientY - startY;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) showNext();
          else showPrev();
        }
      }, { passive: true });
    })();

    if (yearEl) yearEl.textContent = new Date().getFullYear();

    (function focusVisiblePolyfill(){
      let mouseMode = false;
      document.addEventListener('mousedown', ()=> mouseMode = true);
      document.addEventListener('keydown', ()=> mouseMode = false);
      document.addEventListener('focusin', (e) => {
        if (!mouseMode && e.target.classList.contains('btn')) {
          e.target.classList.add('focus-visible');
        }
      });
      document.addEventListener('focusout', (e) => {
        e.target.classList.remove('focus-visible');
      });
    })();

    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple-burst {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(1); opacity: 0; }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);

    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });
      document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }

  } catch (err) {
    console.error('Script initialization error:', err);
  }
});