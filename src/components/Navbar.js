export function renderNavbar() {
  return `
    <header class="navbar-container">
      <div class="navbar-pill-wrapper">
        <nav class="navbar-nav" id="main-nav" aria-label="Main Portfolio Navigation">
          <div class="nav-indicator" id="nav-indicator" aria-hidden="true"></div>
          
          <a href="#hero" class="nav-link active" data-section="hero">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span>Home</span>
          </a>

          <a href="#projects" class="nav-link" data-section="projects">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            <span>Work</span>
          </a>

          <a href="#skills" class="nav-link" data-section="skills">
            <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            <span>Skills</span>
          </a>

          <a href="#about" class="nav-link" data-section="about">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <span>Experience</span>
          </a>

          <a href="#contact" class="nav-link" data-section="contact">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            <span>Contact</span>
          </a>
        </nav>

        <a href="#contact" class="btn-resume" id="resume-btn" aria-label="Contact Vikas Jangid to Download Resume">
          <span class="resume-text-full">Download Resume</span>
          <span class="resume-text-short">Resume</span>
        </a>
      </div>
    </header>
  `;
}

export function initNavbar() {
  const links = document.querySelectorAll('.nav-link');
  const indicator = document.getElementById('nav-indicator');

  function updateIndicator(activeLink) {
    if (!activeLink || !indicator) return;
    indicator.style.width = `${activeLink.offsetWidth}px`;
    indicator.style.left = `${activeLink.offsetLeft}px`;
  }

  // Initial indicator position
  const initialActive = document.querySelector('.nav-link.active');
  if (initialActive) {
    setTimeout(() => updateIndicator(initialActive), 100);
  }

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      updateIndicator(link);
    });
  });

  window.addEventListener('resize', () => {
    const currentActive = document.querySelector('.nav-link.active');
    if (currentActive) updateIndicator(currentActive);
  });

  // ScrollSpy using IntersectionObserver
  const sections = ['hero', 'projects', 'skills', 'about', 'contact'];
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const targetLink = document.querySelector(`.nav-link[data-section="${id}"]`);
        if (targetLink) {
          links.forEach(l => l.classList.remove('active'));
          targetLink.classList.add('active');
          updateIndicator(targetLink);
        }
      }
    });
  }, observerOptions);

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}
