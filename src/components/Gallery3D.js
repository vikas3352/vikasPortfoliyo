export function renderGallery3D() {
  const row1Images = [
    { src: '/assets/projects/zoniraz.png', alt: 'Zoniraz Luxury Jewellery E-Commerce' },
    { src: '/assets/gallery/item_11.webp', alt: 'Nexus Web3 NFT Marketplace' },
    { src: '/assets/projects/shinelimos.png', alt: 'Shine Limos VIP Chauffeur Platform' },
    { src: '/assets/gallery/item_10.webp', alt: 'NovaPay Modern Finance' },
    { src: '/assets/projects/rizeworld.png', alt: 'RizeWorld Digital Creative Agency' },
    { src: '/assets/gallery/item_1.png', alt: 'Creative UI Mockup' },
  ];

  const row2Images = [
    { src: '/assets/projects/sigdiresort.png', alt: 'Sigdi Resort Destination Weddings' },
    { src: '/assets/gallery/item_9.png', alt: 'Nexora Analytics Dashboard' },
    { src: '/assets/projects/rizeworldinstitute.png', alt: 'Rizeworld Institute EdTech Academy' },
    { src: '/assets/gallery/item_7.png', alt: 'SunVault Clean Energy SaaS' },
    { src: '/assets/projects/zoniraz.png', alt: 'Zoniraz Curated Bridal Catalog' },
    { src: '/assets/gallery/item_3.png', alt: 'Dark Mode Dashboard Mockup' },
  ];

  // Tripled for perfectly continuous infinite loop
  const tripeRow1 = [...row1Images, ...row1Images, ...row1Images];
  const tripeRow2 = [...row2Images, ...row2Images, ...row2Images];

  const renderCards = (items) => items.map((item, i) => `
    <div class="gallery-card" data-index="${i}">
      <div class="gallery-card-inner">
        <img 
          src="${item.src}" 
          alt="${item.alt}" 
          loading="lazy" 
          decoding="async" 
          width="480" 
          height="320" 
        />
      </div>
    </div>
  `).join('');

  return `
    <section class="gallery-section" id="gallery">
      <div class="gallery-glow-backdrop"></div>
      
      <div class="gallery-watermark-wrap" aria-hidden="true">
        <span class="gallery-watermark">Gallery</span>
      </div>

      <div class="gallery-3d-viewport">
        <div class="gallery-3d-wall" id="gallery-wall">
          <div class="gallery-row row-1" id="gallery-row-1">
            ${renderCards(tripeRow1)}
          </div>
          <div class="gallery-row row-2" id="gallery-row-2">
            ${renderCards(tripeRow2)}
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initGallery3D() {
  const wall = document.getElementById('gallery-wall');
  const row1 = document.getElementById('gallery-row-1');
  const row2 = document.getElementById('gallery-row-2');
  if (!wall) return;

  let mouseX = 0;
  let mouseY = 0;
  let targetRotX = 18;
  let targetRotY = 4;
  let targetRotZ = -6;
  
  let currentRotX = 18;
  let currentRotY = 4;
  let currentRotZ = -6;

  let scrollOffset = 0;
  let targetScrollOffset = 0;

  // Track pointer for 3D parallax tilt
  window.addEventListener('pointermove', (e) => {
    const xNorm = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
    const yNorm = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

    targetRotY = 4 + xNorm * 6;
    targetRotX = 18 - yNorm * 5;
    targetRotZ = -6 + xNorm * 2;
  }, { passive: true });

  // Track scroll for dynamic row drift
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    targetScrollOffset = scrollY * 0.25;
  }, { passive: true });

  let row1Pos = 0;
  let row2Pos = 0;

  function animate() {
    // Smooth dampening for 3D wall rotation
    currentRotX += (targetRotX - currentRotX) * 0.06;
    currentRotY += (targetRotY - currentRotY) * 0.06;
    currentRotZ += (targetRotZ - currentRotZ) * 0.06;
    scrollOffset += (targetScrollOffset - scrollOffset) * 0.08;

    wall.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg) rotateZ(${currentRotZ}deg)`;

    requestAnimationFrame(animate);
  }

  animate();
}

