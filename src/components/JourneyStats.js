export function renderJourneyStats() {
  const services = [
    {
      num: '01',
      title: 'Backend Development',
      desc: 'Architecting robust, secure backend applications with Node.js and Express.js, featuring RESTful API design, middleware, and high-performance server logic.',
      img: '/assets/projects/shinelimos.png',
      tags: ['# Node.js', '# Express.js', '# REST APIs', '# Authentication']
    },
    {
      num: '02',
      title: 'Frontend Engineering',
      desc: 'Building responsive, reactive user interfaces with React.js, clean component architecture, state management, and modern CSS for smooth web experiences.',
      img: '/assets/gallery/item_1.png',
      tags: ['# React.js', '# JavaScript ES6+', '# Responsive UI', '# SPA']
    },
    {
      num: '03',
      title: 'Database Architecture',
      desc: 'Designing scalable NoSQL data models, query optimization, indexing, and seamless data persistence with MongoDB and Mongoose.',
      img: '/assets/gallery/item_2.png',
      tags: ['# MongoDB', '# Mongoose', '# Data Modeling', '# CRUD Operations']
    },
    {
      num: '04',
      title: 'Full-Stack Web Apps',
      desc: 'End-to-end MERN stack application development integrating secure APIs, cloud deployments, modern workflows, and production-ready performance.',
      img: '/assets/gallery/item_3.png',
      tags: ['# MERN Stack', '# Full-Stack Apps', '# API Integration', '# Deployment']
    }
  ];

  const itemsHtml = services.map(s => `
    <div class="service-item" data-title="${s.title}" data-img="${s.img}" data-tags='${JSON.stringify(s.tags)}'>
      <div class="service-title-wrap">
        <h3 class="service-title">${s.title}</h3>
        <span class="service-num">${s.num}</span>
      </div>
      <p class="service-desc">${s.desc}</p>
    </div>
  `).join('');

  return `
    <section class="section-wrapper" id="skills">
      <div class="journey-header">
        <span class="eyebrow-pill">Core Engineering Capabilities</span>
        <h2 class="journey-title">Skills & Development Experience</h2>
      </div>

      <div class="stats-row">
        <div class="stat-box">
          <div class="stat-num">MERN</div>
          <div class="stat-label">Core Stack</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">2–3</div>
          <div class="stat-label">Years Experience</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">REST</div>
          <div class="stat-label">API Architecture</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">100%</div>
          <div class="stat-label">Clean Code Focus</div>
        </div>
      </div>

      <div class="services-list" id="services-list">
        ${itemsHtml}
        
        <!-- Floating Hover Preview Card -->
        <div class="service-preview-card" id="service-preview-card">
          <img src="" alt="Service preview" class="service-preview-img" id="preview-card-img" />
          <div class="service-tags" id="preview-card-tags"></div>
        </div>
      </div>
    </section>
  `;
}

export function initJourneyStats() {
  const container = document.getElementById('services-list');
  const previewCard = document.getElementById('service-preview-card');
  const previewImg = document.getElementById('preview-card-img');
  const previewTags = document.getElementById('preview-card-tags');
  const items = document.querySelectorAll('.service-item');

  if (!container || !previewCard) return;

  items.forEach(item => {
    item.addEventListener('pointerenter', (e) => {
      const img = item.getAttribute('data-img');
      const tags = JSON.parse(item.getAttribute('data-tags') || '[]');

      previewImg.src = img;
      previewTags.innerHTML = tags.map(t => `<span class="service-tag">${t}</span>`).join('');
      previewCard.classList.add('visible');
    });

    item.addEventListener('pointermove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      previewCard.style.left = `${x}px`;
      previewCard.style.top = `${y}px`;
    });

    item.addEventListener('pointerleave', () => {
      previewCard.classList.remove('visible');
    });
  });
}
