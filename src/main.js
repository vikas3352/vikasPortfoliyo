import './styles/main.css';

import { initCursorTrail } from './components/CursorTrail.js';
import { renderNavbar, initNavbar } from './components/Navbar.js';
import { renderHero } from './components/Hero.js';
import { renderLogoMarquee } from './components/LogoMarquee.js';
import { renderProjects, initProjects } from './components/Projects.js';
import { renderJourneyStats, initJourneyStats } from './components/JourneyStats.js';
import { renderGallery3D, initGallery3D } from './components/Gallery3D.js';
import { renderParallaxQuote, initParallaxQuote } from './components/ParallaxQuote.js';
import { renderAbout, initAbout } from './components/About.js';
import { renderTestimonials } from './components/Testimonials.js';
import { renderFAQ, initFAQ } from './components/FAQ.js';
import { renderContactFooter, initContactFooter } from './components/ContactFooter.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  // Inject architectural vertical grid lines
  const gridLines = `
    <div class="bg-grid-lines">
      <div class="bg-grid-line"></div>
      <div class="bg-grid-line"></div>
      <div class="bg-grid-line"></div>
      <div class="bg-grid-line"></div>
      <div class="bg-grid-line"></div>
      <div class="bg-grid-line"></div>
      <div class="bg-grid-line"></div>
    </div>
  `;

  app.innerHTML = `
    ${gridLines}
    ${renderNavbar()}
    <main>
      ${renderHero()}
      ${renderLogoMarquee()}
      ${renderProjects()}
      ${renderJourneyStats()}
      ${renderGallery3D()}
      ${renderParallaxQuote()}
      ${renderAbout()}
      ${renderTestimonials()}
      ${renderFAQ()}
      ${renderContactFooter()}
    </main>
  `;

  // Initialize interactive features
  initCursorTrail();
  initNavbar();
  initProjects();
  initJourneyStats();
  initGallery3D();
  initParallaxQuote();
  initAbout();
  initFAQ();
  initContactFooter();
});
