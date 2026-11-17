export function renderHero() {
  const firstName = "Vikas";
  const lastName = "Jangid";

  return `
    <section class="hero-section" id="hero">
        <!-- Vertical Grid Lines Background -->
        <div class="hero-grid-lines" aria-hidden="true">
          <div class="hero-grid-line"></div>
          <div class="hero-grid-line"></div>
          <div class="hero-grid-line"></div>
          <div class="hero-grid-line"></div>
          <div class="hero-grid-line"></div>
          <div class="hero-grid-line"></div>
        </div>

        <!-- Ambient Glow Layers matching Framer template -->
        <div class="hero-glow-layer" aria-hidden="true">
          <div class="hero-glow-left"></div>
          <div class="hero-glow-right"></div>
          <div class="hero-glow-bottom"></div>
          <div class="hero-glow-bleed"></div>
        </div>

        <!-- Main Accessible H1 for Semantic Document Outline -->
        <h1 class="visually-hidden">Vikas Jangid — Full-Stack Web Developer &amp; UI/UX Designer in Alwar, Rajasthan</h1>

        <!-- Split Watermark Typography Behind Subject: Vikas on left, Jangid on right -->
        <div class="hero-name-wrap hero-name-split-wrap" aria-hidden="true">
          <span class="hero-name-text hero-name-first">${firstName}</span>
          <span class="hero-name-text hero-name-last">${lastName}</span>
        </div>

        <!-- Center Portrait Cutout -->
        <div class="hero-portrait-stage">
          <img 
            src="/assets/gallery/item_5_original.png" 
            alt="Vikas Jangid - Full-Stack Web Developer and UI Designer in Alwar, Rajasthan" 
            class="hero-portrait-img"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            width="1448"
            height="1086"
          />
        </div>

        <!-- Foreground Bottom Content -->
        <div class="hero-footer-content">
          <!-- Bottom Left: Title, Description, CTAs -->
          <div class="hero-left-block">
            <h2 class="hero-designation">Full-Stack Web Developer in Alwar, Rajasthan</h2>
            <p class="hero-bio">
              Software Developer specializing in backend development with Node.js and Express.js, with expertise in the MERN stack. I build scalable web applications, REST APIs, and reliable backend solutions that turn ideas into high-performing digital products.
            </p>
            <div class="hero-cta-group">
              <a href="#skills" class="hero-btn-dark">
                <svg class="hero-tech-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M12.002 1.5C12.002 1.5 6.8 7.35 6.8 12.87C6.8 17.27 10.15 20.65 12.002 22.5C13.85 20.65 17.2 17.27 17.2 12.87C17.2 7.35 12.002 1.5 12.002 1.5Z" fill="#13AA52"/>
                  <path d="M12.002 22.5V1.5C12.002 1.5 17.2 7.35 17.2 12.87C17.2 17.27 13.85 20.65 12.002 22.5Z" fill="#116149"/>
                  <path d="M11.85 14.5C11.65 14.3 11.25 13.8 11.25 13.2C11.25 12.3 11.95 11.7 12.002 11.5V17.8C11.9 17.7 11.85 17.6 11.85 17.6V14.5Z" fill="#FFFFFF"/>
                </svg>
                MongoDB
              </a>
              <a href="#skills" class="hero-btn-dark">
                <svg class="hero-tech-icon" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="5" fill="#222222"/>
                  <path d="M5.5 17L10.5 7H13.5L8.5 17H5.5Z" fill="#FFFFFF"/>
                  <path d="M15.5 7L13 12L15.5 17H18.5L16 12L18.5 7H15.5Z" fill="#FFFFFF"/>
                </svg>
                Express.js
              </a>
              <a href="#skills" class="hero-btn-dark">
                <svg class="hero-tech-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5Z" fill="#61DAFB"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C14.7 4 17.1 5.3 18.6 7.4C16.8 8.1 14.5 8.7 12 8.7C9.5 8.7 7.2 8.1 5.4 7.4C6.9 5.3 9.3 4 12 4ZM4 12C4 10.9 4.3 9.8 4.7 8.9C6.7 9.7 9.2 10.2 12 10.2C14.8 10.2 17.3 9.7 19.3 8.9C19.7 9.8 20 10.9 20 12C20 13.1 19.7 14.2 19.3 15.1C17.3 14.3 14.8 13.8 12 13.8C9.2 13.8 6.7 14.3 4.7 15.1C4.3 14.2 4 13.1 4 12ZM12 20C9.3 20 6.9 18.7 5.4 16.6C7.2 15.9 9.5 15.3 12 15.3C14.5 15.3 16.8 15.9 18.6 16.6C17.1 18.7 14.7 20 12 20Z" fill="#61DAFB" fill-opacity="0.3"/>
                </svg>
                React.js
              </a>
              <a href="#skills" class="hero-btn-dark">
                <svg class="hero-tech-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="#339933"/>
                  <path d="M12 4.2L5 8.1V15.9L12 19.8L19 15.9V8.1L12 4.2Z" fill="#026E00"/>
                  <path d="M12 7L16 9.3V14.7L12 17L8 14.7V9.3L12 7Z" fill="#66CC33"/>
                </svg>
                Node.js
              </a>
            </div>
          </div>

          <!-- Bottom Right: Signature & Inspirational Quote -->
          <div class="hero-right-block">
            <div class="hero-signature-wrap">
              <img 
                src="/assets/signature.png" 
                alt="Official signature of Vikas Jangid" 
                class="hero-signature-img" 
                loading="lazy" 
                decoding="async" 
                width="220" 
                height="80" 
              />
            </div>
            <div class="hero-quote-row">
              <svg class="hero-quote-icon" viewBox="0 0 27 26" fill="currentColor">
                <path d="M 10.559 0 L 5.951 14.856 L 10.847 14.856 L 10.847 25.617 L 0 25.617 L 0 16.189 L 5.759 0 Z M 26.397 0 L 21.789 14.856 L 26.685 14.856 L 26.685 25.617 L 15.838 25.617 L 15.838 16.189 L 21.597 0 Z"/>
              </svg>
              <span class="hero-quote-text">I turn ideas into meaningful products</span>
            </div>
          </div>
        </div>
      </section>
  `;
}
