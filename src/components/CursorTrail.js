// Clean Scroll-Driven Website Builder & Typewriter Engine
// Pure layout construction: Cards and blocks lift and settle into place from the left,
// headlines and copy dynamically type character-by-character on scroll,
// with ZERO messy cursor clutter or floating badges!

export function initCursorTrail() {
  const isTouchDevice = 'ontouchstart' in window && window.matchMedia('(pointer: coarse)').matches;

  let canvas = document.getElementById('cursor-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'cursor-canvas';
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  let dpr = window.devicePixelRatio || 1;
  let width = window.innerWidth;
  let height = window.innerHeight;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize);

  // Remove any legacy floating agent widgets if present
  const existingWidget = document.getElementById('agents-floating-widget');
  if (existingWidget && existingWidget.parentNode) {
    existingWidget.parentNode.removeChild(existingWidget);
  }

  // Track scroll dynamics
  let hasScrolled = window.scrollY > 20;
  window.addEventListener('scroll', () => {
    hasScrolled = true;
  }, { passive: true });

  // State Management: Blocks, Texts & Ripple Effects
  const registeredBlocks = [];
  const registeredTexts = [];
  const rippleEffects = [];

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function getResponsiveMetrics() {
    const w = window.innerWidth;
    if (w <= 480) {
      return { offset: -32, rot: -1.5, scale: 0.95 };
    }
    if (w <= 768) {
      return { offset: -55, rot: -2.5, scale: 0.92 };
    }
    if (isTouchDevice) {
      return { offset: -80, rot: -3.0, scale: 0.90 };
    }
    return { offset: -160, rot: -4.0, scale: 0.88 };
  }

  // ==========================================
  // 1. SETUP TARGET BLOCKS (CARDS & CONTAINERS)
  // ==========================================
  function setupBlocks() {
    const blockSelectors = [
      '.project-card',
      '.stat-box',
      '.service-item',
      '.floating-device',
      '.about-portrait-stage',
      '.testimonial-card',
      '.faq-item',
      '.contact-form-card',
      '.contact-info-col',
      '.hero-portrait-stage',
      '.hero-cta-group',
      '.hero-signature-wrap'
    ];

    const elements = document.querySelectorAll(blockSelectors.join(','));
    elements.forEach((el, idx) => {
      if (el.hasAttribute('data-builder-block')) return;

      const isHero = el.closest('#hero') !== null;
      el.setAttribute('data-builder-block', 'pending');

      // Initial physical pickup displacement for elements below hero
      if (!isHero) {
        const m = getResponsiveMetrics();
        el.style.transform = `translate3d(${m.offset}px, 20px, 0) rotate(${m.rot}deg) scale(${m.scale})`;
        el.style.opacity = '0.25';
      }

      registeredBlocks.push({
        id: idx,
        el: el,
        isHero: isHero,
        state: 'pending', // 'pending' | 'building' | 'built'
        targetProgress: 0,
        currentProgress: 0
      });
    });
  }

  // ==========================================
  // 2. SETUP TEXTS TO BE TYPED LIVE
  // ==========================================
  function setupTexts() {
    const textSelectors = [
      // Hero
      '.hero-designation',
      '.hero-bio',
      '.hero-quote-text',
      // Projects
      '.section-h2',
      '.section-p',
      '.project-name',
      // Skills
      '.eyebrow-pill',
      '.journey-title',
      '.service-title',
      '.service-desc',
      // Philosophy / Parallax Quote
      '.quote-statement',
      '.quote-signature',
      // FAQ
      '.faq-text',
      // Contact
      '.contact-eyebrow'
    ];

    const elements = document.querySelectorAll(textSelectors.join(','));
    elements.forEach((el, idx) => {
      if (el.hasAttribute('data-builder-text')) return;

      const fullText = el.textContent.trim();
      if (!fullText) return;

      const originalHTML = el.innerHTML;
      const isHero = el.closest('#hero') !== null;

      // Lock current height for non-hero items so typing doesn't shift layout
      const h = el.offsetHeight;
      if (!isHero && h > 0) {
        el.style.minHeight = `${h}px`;
      }

      el.setAttribute('data-builder-text', 'pending');
      el.setAttribute('data-full-text', fullText);

      // Empty text node so it visibly types character by character with scroll
      el.textContent = '';

      registeredTexts.push({
        id: idx,
        el: el,
        fullText: fullText,
        originalHTML: originalHTML,
        displayedCount: 0,
        isHero: isHero,
        state: 'pending', // 'pending' | 'typing' | 'completed'
        caretEl: null
      });
    });
  }

  // ==========================================
  // 3. AUTONOMOUS HERO ENTRANCE (INITIAL LOAD)
  // ==========================================
  function triggerHeroSequence() {
    const portraitBlock = registeredBlocks.find(b => b.el.classList.contains('hero-portrait-stage'));
    const ctaBlock = registeredBlocks.find(b => b.el.classList.contains('hero-cta-group'));
    const signatureBlock = registeredBlocks.find(b => b.el.classList.contains('hero-signature-wrap'));

    const designationText = registeredTexts.find(t => t.el.classList.contains('hero-designation'));
    const bioText = registeredTexts.find(t => t.el.classList.contains('hero-bio'));
    const quoteText = registeredTexts.find(t => t.el.classList.contains('hero-quote-text'));

    if (portraitBlock) {
      setTimeout(() => easeInBlockAutonomous(portraitBlock, 1200), 300);
    }
    if (designationText) {
      setTimeout(() => easeInTextAutonomous(designationText, 40), 1200);
    }
    if (ctaBlock) {
      setTimeout(() => easeInBlockAutonomous(ctaBlock, 900), 2200);
    }
    if (bioText) {
      setTimeout(() => easeInTextAutonomous(bioText, 16), 2800);
    }
    if (signatureBlock) {
      setTimeout(() => easeInBlockAutonomous(signatureBlock, 800), 3600);
    }
    if (quoteText) {
      setTimeout(() => easeInTextAutonomous(quoteText, 35), 4200);
    }
  }

  function easeInBlockAutonomous(block, duration) {
    if (!block || block.state === 'built') return;
    block.state = 'building';
    block.el.setAttribute('data-builder-block', 'building');

    const startTime = performance.now();
    const m = getResponsiveMetrics();

    function step(now) {
      if (hasScrolled) return;

      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const p = 1 - Math.pow(1 - t, 3);
      block.currentProgress = p;

      const tx = (1 - p) * m.offset;
      const ty = (1 - p) * 20;
      const rot = (1 - p) * m.rot;
      const sc = m.scale + p * (1 - m.scale);
      const op = 0.25 + p * 0.75;

      block.el.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg) scale(${sc})`;
      block.el.style.opacity = op;

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        block.state = 'built';
        block.el.setAttribute('data-builder-block', 'built');
        block.el.style.transform = '';
        block.el.style.opacity = '1';
        block.el.classList.add('builder-snap-flash');
        setTimeout(() => block.el.classList.remove('builder-snap-flash'), 900);

        const r = block.el.getBoundingClientRect();
        rippleEffects.push({
          x: r.left + 14,
          y: r.top + 14,
          radius: 10,
          maxRadius: 42,
          color: '#2ed573',
          alpha: 0.85
        });
      }
    }

    requestAnimationFrame(step);
  }

  function easeInTextAutonomous(textItem, speed) {
    if (!textItem || textItem.state === 'completed') return;
    textItem.state = 'typing';
    textItem.el.setAttribute('data-builder-text', 'typing');
    textItem.el.textContent = '';

    const caret = document.createElement('span');
    caret.className = 'builder-caret';
    textItem.el.appendChild(caret);
    textItem.caretEl = caret;

    function next() {
      if (hasScrolled) return;

      if (textItem.displayedCount < textItem.fullText.length) {
        textItem.displayedCount++;
        textItem.el.textContent = textItem.fullText.slice(0, textItem.displayedCount);
        textItem.el.appendChild(caret);
        setTimeout(next, speed);
      } else {
        textItem.state = 'completed';
        textItem.el.setAttribute('data-builder-text', 'completed');
        textItem.el.innerHTML = textItem.originalHTML;
        textItem.el.style.minHeight = '';
        if (caret.parentNode === textItem.el) {
          textItem.el.removeChild(caret);
        }
      }
    }

    next();
  }

  // Initialize blocks and texts
  setTimeout(() => {
    setupBlocks();
    setupTexts();
    if (!hasScrolled) {
      triggerHeroSequence();
    }
  }, 200);

  // ==========================================
  // 4. ANIMATION RENDER LOOP (60 FPS SCROLL-DRIVEN)
  // ==========================================
  function render(now) {
    ctx.clearRect(0, 0, width, height);

    const viewH = window.innerHeight;

    // A. SCROLL-DRIVEN BLOCK LIFT & PLACE (FROM LEFT)
    registeredBlocks.forEach(block => {
      if (block.isHero && !hasScrolled) return;

      const rect = block.el.getBoundingClientRect();

      // Active placement range: from when top enters at 92% of screen down to 36% of screen
      const startY = viewH * 0.92;
      const endY = viewH * 0.36;
      const targetP = clamp((startY - rect.top) / (startY - endY), 0, 1);

      block.targetProgress = targetP;

      // Smooth physics lerp
      block.currentProgress += (block.targetProgress - block.currentProgress) * 0.16;
      const p = block.currentProgress;

      const m = getResponsiveMetrics();

      if (p <= 0.01) {
        block.state = 'pending';
        block.el.setAttribute('data-builder-block', 'pending');
        block.el.style.transform = `translate3d(${m.offset}px, 20px, 0) rotate(${m.rot}deg) scale(${m.scale})`;
        block.el.style.opacity = '0.22';
      } else if (p < 0.98) {
        block.state = 'building';
        block.el.setAttribute('data-builder-block', 'building');

        // Smooth physical glide into place
        const tx = (1 - p) * m.offset;
        const ty = (1 - p) * 20;
        const rot = (1 - p) * m.rot;
        const sc = m.scale + p * (1 - m.scale);
        const op = 0.25 + p * 0.75;

        block.el.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg) scale(${sc})`;
        block.el.style.opacity = op;
      } else {
        // Built & Snapped into place!
        if (block.state !== 'built') {
          block.state = 'built';
          block.el.setAttribute('data-builder-block', 'built');
          block.el.style.transform = '';
          block.el.style.opacity = '1';
          block.el.classList.add('builder-snap-flash');
          setTimeout(() => block.el.classList.remove('builder-snap-flash'), 900);

          // Subtle emerald snap ripple
          rippleEffects.push({
            x: rect.left + 14,
            y: rect.top + 14,
            radius: 10,
            maxRadius: 42,
            color: '#2ed573',
            alpha: 0.85
          });
        }
      }
    });

    // B. SCROLL-DRIVEN TYPEWRITER (TYPED DIRECTLY WITH SCROLL PROGRESS)
    registeredTexts.forEach(textItem => {
      if (textItem.isHero && !hasScrolled) return;

      const rect = textItem.el.getBoundingClientRect();

      // Active typing range: from 88% down to 42% of screen
      const startY = viewH * 0.88;
      const endY = viewH * 0.42;
      const textP = clamp((startY - rect.top) / (startY - endY), 0, 1);

      if (textP <= 0) {
        if (textItem.displayedCount > 0 && textItem.state !== 'completed') {
          textItem.displayedCount = 0;
          textItem.el.textContent = '';
        }
      } else if (textP < 1) {
        textItem.state = 'typing';
        textItem.el.setAttribute('data-builder-text', 'typing');

        const targetChars = Math.min(textItem.fullText.length, Math.floor(textP * textItem.fullText.length));

        if (textItem.displayedCount !== targetChars) {
          textItem.displayedCount = targetChars;
          textItem.el.textContent = textItem.fullText.slice(0, textItem.displayedCount);

          if (!textItem.caretEl) {
            const caret = document.createElement('span');
            caret.className = 'builder-caret';
            textItem.caretEl = caret;
          }
          textItem.el.appendChild(textItem.caretEl);
        }
      } else {
        // Fully typed & completed!
        if (textItem.state !== 'completed') {
          textItem.state = 'completed';
          textItem.displayedCount = textItem.fullText.length;
          textItem.el.setAttribute('data-builder-text', 'completed');
          textItem.el.innerHTML = textItem.originalHTML;
          textItem.el.style.minHeight = '';
          if (textItem.caretEl && textItem.caretEl.parentNode === textItem.el) {
            textItem.el.removeChild(textItem.caretEl);
          }
        }
      }
    });

    // C. RENDER SUBTLE SNAP RIPPLE SHOCKWAVES
    for (let r = rippleEffects.length - 1; r >= 0; r--) {
      const rip = rippleEffects[r];
      rip.radius += 1.8;
      rip.alpha -= 0.04;

      if (rip.alpha <= 0) {
        rippleEffects.splice(r, 1);
      } else {
        ctx.save();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = rip.color;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = rip.alpha;
        ctx.stroke();
        ctx.restore();
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
