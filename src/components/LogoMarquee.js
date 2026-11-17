export function renderLogoMarquee() {
  const logos = [
    { name: 'HA5', src: '/assets/logos/ha5.png', className: 'logo-ha5' },
    { name: 'Plänty', src: '/assets/logos/planty.png', className: 'logo-planty' },
    { name: 'Fenix Real Estate Advisors', src: '/assets/logos/fenix.png', className: 'logo-fenix' },
    { name: 'Young Chefs Academy', src: '/assets/logos/young_chefs.png', className: 'logo-young-chefs' },
    { name: 'Goodlife Realty', src: '/assets/logos/goodlife.png', className: 'logo-goodlife' },
    { name: 'Evo One', src: '/assets/logos/evo_one.png', className: 'logo-evo-one' },
    { name: 'Motion', src: '/assets/logos/motion.png', className: 'logo-motion' },
    { name: 'Panasonic', src: '/assets/logos/panasonic.png', className: 'logo-panasonic' },
    { name: 'UNICEF', src: '/assets/logos/unicef.png', className: 'logo-unicef' },
    { name: 'Monnettoyage', src: '/assets/logos/monnettoyage.png', className: 'logo-monnettoyage' },
    { name: 'Top Shelf', src: '/assets/logos/topshelf.png', className: 'logo-topshelf' },
  ];

  // Duplicate for seamless infinite marquee loop
  const doubleLogos = [...logos, ...logos];

  const itemsHtml = doubleLogos.map(l => `
    <div class="marquee-item ${l.className}">
      <img 
        src="${l.src}" 
        alt="${l.name} Partner Logo" 
        loading="lazy" 
        decoding="async" 
        width="120" 
        height="40" 
      />
    </div>
  `).join('');

  return `
    <section class="marquee-section" aria-label="Client logos">
      <div class="marquee-track">
        ${itemsHtml}
      </div>
    </section>
  `;
}

