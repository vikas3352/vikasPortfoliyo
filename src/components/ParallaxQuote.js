export function renderParallaxQuote() {
  return `
    <section class="parallax-quote-section" id="philosophy">
      <div class="floating-device dev-left" id="quote-dev-left">
        <img 
          src="/assets/projects/zoniraz.png" 
          alt="Zoniraz Luxury Jewellery Web Application by Vikas Jangid" 
          loading="lazy" 
          decoding="async" 
          width="400" 
          height="225" 
        />
      </div>

      <div class="quote-center-content">
        <p class="quote-statement">
          With 2–3 years of development experience, I build high-performance <span class="highlight">full-stack web applications</span> and robust backend systems engineered for scale.
        </p>
        <div class="quote-signature">Vikas Jangid</div>
      </div>

      <div class="floating-device dev-right" id="quote-dev-right">
        <img 
          src="/assets/projects/shinelimos.png" 
          alt="Shine Limos VIP Chauffeur Application by Vikas Jangid" 
          loading="lazy" 
          decoding="async" 
          width="400" 
          height="225" 
        />
      </div>
    </section>
  `;
}

export function initParallaxQuote() {
  const leftDev = document.getElementById('quote-dev-left');
  const rightDev = document.getElementById('quote-dev-right');
  const section = document.getElementById('philosophy');

  if (!section || !leftDev || !rightDev) return;

  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    const windowH = window.innerHeight;

    if (rect.top < windowH && rect.bottom > 0) {
      const progress = (windowH - rect.top) / (windowH + rect.height);
      const moveLeft = (progress - 0.5) * 80;
      const moveRight = (0.5 - progress) * 80;

      leftDev.style.transform = `translateY(${moveLeft}px) rotate(${-3 + moveLeft * 0.05}deg)`;
      rightDev.style.transform = `translateY(${moveRight}px) rotate(${3 + moveRight * 0.05}deg)`;
    }
  }, { passive: true });
}
