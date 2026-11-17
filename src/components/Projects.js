export function renderProjects() {
  const projects = [
    {
      id: 'zoniraz',
      title: 'Zoniraz',
      category: 'Website',
      image: '/assets/projects/zoniraz.png',
      link: 'https://zoniraz.com/'
    },
    {
      id: 'shinelimos',
      title: 'Shine Limos',
      category: 'Website',
      image: '/assets/projects/shinelimos.png',
      link: 'https://shinelimosllc.com/'
    },
    {
      id: 'rizeworld',
      title: 'RizeWorld',
      category: 'Website',
      image: '/assets/projects/rizeworld.png',
      link: 'https://rizeworld.in/portfolio'
    },
    {
      id: 'sigdiresort',
      title: 'Sigdi Resort',
      category: 'Website',
      image: '/assets/projects/sigdiresort.png',
      link: 'https://sigdiresort.in/'
    },
    {
      id: 'rizeworldinstitute',
      title: 'Rizeworld Institute',
      category: 'Website',
      image: '/assets/projects/rizeworldinstitute.png',
      link: 'https://rizeworldinstitute.in/'
    }
  ];

  const cardsHtml = projects.map(p => `
    <article class="project-card" data-project="${p.id}">
      <span class="project-badge">${p.category}</span>
      <div class="project-mockup-wrapper">
        <img 
          src="${p.image}" 
          alt="${p.title} — Web Application Project by Vikas Jangid" 
          class="project-mockup-img" 
          loading="lazy" 
          decoding="async" 
          width="800" 
          height="500" 
        />
        <div class="screen-spotlight"></div>
      </div>
      <div class="project-footer">
        <h3 class="project-name">${p.title}</h3>
        <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="btn-view-project" aria-label="View live ${p.title} website (opens in a new tab)">
          View Project
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </a>
      </div>
    </article>
  `).join('');

  return `
    <section class="section-wrapper" id="projects">
      <div class="section-watermark">Projects</div>

      <div class="section-header-split">
        <h2 class="section-h2">Scalable Web Applications Built for Performance & Impact</h2>
        <p class="section-p">
          With 2–3 years of professional experience as a Full-Stack Web Developer, I specialize in engineering robust backend architectures and responsive web applications using Node.js, Express.js, React.js, and MongoDB. I turn complex requirements into high-performing, scalable digital products with clean code and reliable REST APIs.
        </p>
      </div>

      <div class="projects-grid">
        ${cardsHtml}
      </div>
    </section>
  `;
}

export function initProjects() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    const spotlight = card.querySelector('.screen-spotlight');
    const wrapper = card.querySelector('.project-mockup-wrapper');

    card.addEventListener('pointermove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (spotlight) {
        spotlight.style.left = `${x}px`;
        spotlight.style.top = `${y}px`;
      }

      // 3D Card tilt
      const cardRect = card.getBoundingClientRect();
      const cardX = (e.clientX - cardRect.left) / cardRect.width - 0.5;
      const cardY = (e.clientY - cardRect.top) / cardRect.height - 0.5;

      card.style.transform = `perspective(1000px) rotateY(${cardX * 7}deg) rotateX(${-cardY * 7}deg) translateY(-6px)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
    });
  });
}
