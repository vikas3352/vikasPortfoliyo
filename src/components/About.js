import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function renderAbout() {
  return `
    <section class="about-scroll-canvas" id="about">
      <!-- Terracotta background texture & ambient lighting -->
      <div class="about-bg-layer" aria-hidden="true">
        <div class="about-bg-image"></div>
        <div class="about-bg-glow"></div>
        <div class="about-bg-grid">
          <div class="about-grid-col"></div>
          <div class="about-grid-col"></div>
          <div class="about-grid-col"></div>
          <div class="about-grid-col"></div>
          <div class="about-grid-col"></div>
          <div class="about-grid-col"></div>
        </div>
      </div>

      <!-- Giant watermark typography in background -->
      <div class="about-watermark-layer" aria-hidden="true">
        <div class="about-watermark-line line-1">About</div>
        <div class="about-watermark-line line-2">Vikas</div>
      </div>

      <div class="about-sticky-stage" id="about-sticky-stage">
        <!-- Interactive content column -->
        <div class="about-scroll-column" id="about-scroll-column">
          <div class="about-content-inner" id="about-content-inner">
            
            <div class="about-badge-tag">
              <span class="about-badge-dot"></span>
              <span>About &amp; Experience</span>
            </div>

            <h2 class="about-lead-text">
              With 2–3 years of professional experience, I'm a Full-Stack Web Developer specializing in high-performance backend systems, REST APIs, and scalable MERN stack web applications.
            </h2>

            <div class="about-narrative-box">
              <p class="about-narrative-text">
                I am a dedicated developer based in Alwar, Rajasthan, creating robust, scalable, and user-centered digital products. My core focus is on architecting clean backend logic with Node.js and Express.js, designing reliable MongoDB database schemas, and engineering high-throughput REST APIs.
              </p>
              <p class="about-narrative-text">
                On the frontend, I craft fast, intuitive, and responsive interfaces in React.js. Over the years, I've built and deployed multiple web applications with a strong commitment to clean architecture, code quality, and delivering seamless user experiences under load.
              </p>
            </div>

            <div class="about-skill-pills">
              <span class="skill-pill-tag">Web Development</span>
              <span class="skill-pill-tag">Node.js</span>
              <span class="skill-pill-tag">Express.js</span>
              <span class="skill-pill-tag">React.js</span>
              <span class="skill-pill-tag">MongoDB</span>
              <span class="skill-pill-tag">REST APIs</span>
              <span class="skill-pill-tag">MERN Stack</span>
              <span class="skill-pill-tag">Tailwind CSS</span>
            </div>

            <div class="about-experience-row">
              <div class="exp-row-item">
                <span class="exp-item-title">Full-Stack Developer</span>
              </div>
              <div class="exp-row-item">
                <span class="exp-item-title">MERN Stack</span>
              </div>
              <div class="exp-row-item">
                <span class="exp-item-title">2022–Present</span>
              </div>
            </div>

          </div>
        </div>

        <!-- Cutout portrait leaning on chair -->
        <div class="about-portrait-stage" id="about-portrait-stage">
          <img 
            src="/assets/about_portrait.png" 
            alt="Vikas Jangid - Full-Stack Web Developer &amp; UI/UX Designer" 
            class="about-portrait-cutout"
            id="about-portrait-img"
            loading="lazy"
            decoding="async"
            width="600"
            height="800"
          />
        </div>
      </div>
    </section>
  `;
}

export function initAbout() {
  const section = document.getElementById('about');
  if (!section) return;

  const portraitStage = document.getElementById('about-portrait-stage');
  const contentInner = section.querySelector('.about-content-inner');
  const badge = section.querySelector('.about-badge-tag');
  const leadText = section.querySelector('.about-lead-text');
  const narrativeParas = section.querySelectorAll('.about-narrative-text');
  const skillPills = section.querySelectorAll('.skill-pill-tag');
  const expRow = section.querySelector('.about-experience-row');
  const glow = section.querySelector('.about-bg-glow');
  const watermark1 = section.querySelector('.about-watermark-line.line-1');
  const watermark2 = section.querySelector('.about-watermark-line.line-2');

  const mm = gsap.matchMedia();

  // Desktop & Tablet (min-width: 901px): Pinned scrollytelling interaction
  mm.add('(min-width: 901px)', () => {
    // 1. Initial visual states
    gsap.set(portraitStage, {
      y: 160,
      opacity: 0,
      scale: 0.92,
      transformOrigin: 'bottom center',
    });

    // Text container & individual elements placed down for bottom-to-top scroll reveal
    gsap.set(contentInner, {
      y: 70,
      opacity: 0,
    });
    gsap.set(badge, { opacity: 0, y: 50 });
    gsap.set(leadText, { opacity: 0, y: 80 });
    gsap.set(narrativeParas, { opacity: 0, y: 75 });
    gsap.set(skillPills, { opacity: 0, y: 60, scale: 0.9 });
    gsap.set(expRow, { opacity: 0, y: 55 });

    if (glow) gsap.set(glow, { scale: 0.75, opacity: 0.25 });
    if (watermark1) gsap.set(watermark1, { opacity: 0.02, x: -35 });
    if (watermark2) gsap.set(watermark2, { opacity: 0.02, x: 35 });

    // 2. Master pinned timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=1800', // Scroll scrub distance
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // ========================================================
    // PHASE 1: FIRST COME IMAGE (0s -> 3.2s)
    // Portrait enters smoothly with scale, vertical slide, and lighting
    // ========================================================
    tl.to(portraitStage, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 3.2,
      ease: 'power2.out',
    }, 0);

    if (glow) {
      tl.to(glow, {
        scale: 1.1,
        opacity: 0.85,
        duration: 3.2,
        ease: 'power2.out',
      }, 0);
    }

    if (watermark1 && watermark2) {
      tl.to(watermark1, {
        opacity: 0.07,
        x: 0,
        duration: 3.2,
        ease: 'power1.out',
      }, 0);
      tl.to(watermark2, {
        opacity: 0.07,
        x: 0,
        duration: 3.2,
        ease: 'power1.out',
      }, 0);
    }

    // ========================================================
    // PHASE 2: IMAGE STOP "POSE" (3.2s -> 4.5s)
    // Image pauses & holds its pose firmly while user scrolls
    // ========================================================
    tl.to({}, { duration: 1.3 });

    // ========================================================
    // PHASE 3: TEXT APPEAR BOTTOM TO TOP AS SCROLL TYPE (4.5s -> 9.0s)
    // Content moves upward from bottom into position as user scrolls
    // ========================================================
    // Overall text container glides up from bottom
    tl.to(contentInner, {
      y: 0,
      opacity: 1,
      duration: 4.5,
      ease: 'power1.out',
    }, 4.5);

    // 1. Badge ascends from bottom to top
    tl.to(badge, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, 4.6);

    // 2. Main lead text ascends from bottom to top
    tl.to(leadText, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
    }, 5.2);

    // 3. Narrative paragraphs ascend sequentially from bottom to top
    if (narrativeParas.length > 0) {
      tl.to(narrativeParas[0], {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power2.out',
      }, 6.1);
    }
    if (narrativeParas.length > 1) {
      tl.to(narrativeParas[1], {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power2.out',
      }, 6.8);
    }

    // 4. Skill tags ascend from bottom to top with staggered pop
    tl.to(skillPills, {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.08,
      duration: 0.9,
      ease: 'back.out(1.2)',
    }, 7.5);

    // 5. Experience footer row ascends from bottom to top
    tl.to(expRow, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power2.out',
    }, 8.2);

    // ========================================================
    // PHASE 4: COMPLETE SECTION SCROLL (9.0s -> 10.0s)
    // Section stays fully visible and settled before unpinning
    // ========================================================
    tl.to({}, { duration: 1.0 });

    return () => {
      tl.kill();
    };
  });

  // Mobile fallback (screen width <= 900px): Clean reveal without fixed pin
  mm.add('(max-width: 900px)', () => {
    const mobileTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    });

    mobileTl
      .from(portraitStage, { y: 60, opacity: 0, duration: 0.9, ease: 'power2.out' })
      .from([badge, leadText, ...narrativeParas], { 
        y: 50, 
        opacity: 0, 
        stagger: 0.18, 
        duration: 0.8, 
        ease: 'power2.out' 
      }, '+=0.2')
      .from(skillPills, { 
        y: 35,
        scale: 0.85, 
        opacity: 0, 
        stagger: 0.04, 
        duration: 0.5, 
        ease: 'back.out(1.3)' 
      }, '-=0.2')
      .from(expRow, { 
        y: 35, 
        opacity: 0, 
        duration: 0.6, 
        ease: 'power2.out' 
      }, '-=0.2');

    return () => {
      mobileTl.kill();
    };
  });
}


