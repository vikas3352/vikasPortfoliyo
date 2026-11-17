export function renderTestimonials() {
  const testimonials = [
    {
      quote: "Vikas transformed our brand with visionary design. His creativity and attention to detail brought our ideas to life, exceeding all expectations.",
      author: "Layne Morgan",
      role: "Commercial Director, Snapple",
      avatar: "/assets/avatars/avatar_1.png"
    },
    {
      quote: "The speed, fidelity, and polish Vikas delivered on our web app was extraordinary. He understands user psychology at an intuitive level.",
      author: "Anna Korhonen",
      role: "Design Director, Giggle",
      avatar: "/assets/avatars/avatar_2.jpg"
    },
    {
      quote: "Working with Vikas was a game changer for our SaaS platform. Conversion rates surged after the redesign.",
      author: "Timothy Rodgers",
      role: "Head of Projects, Microshaft",
      avatar: "/assets/avatars/avatar_3.jpg"
    },
    {
      quote: "Exceptional execution from high-concept design down to micro-interactions and Framer animations.",
      author: "Rick Bellante",
      role: "Product Manager, Nexusgate",
      avatar: "/assets/avatars/avatar_4.jpg"
    },
    {
      quote: "Vikas is hands-down one of the top design talents we've collaborated with. Clean, reliable, and visionary.",
      author: "Josh Stevens",
      role: "Creative Director, Netflux",
      avatar: "/assets/avatars/avatar_5.png"
    },
    {
      quote: "The design system and component architecture he built streamlined our entire product launch.",
      author: "Anita Hoffmann",
      role: "Lead UX Designer, Beta",
      avatar: "/assets/avatars/avatar_6.png"
    }
  ];

  // Double array for continuous seamless ticker
  const doubleTestimonials = [...testimonials, ...testimonials];

  const cardsHtml = doubleTestimonials.map(t => `
    <div class="testimonial-card">
      <p class="testimonial-quote">"${t.quote}"</p>
      <div class="testimonial-author">
        <img 
          src="${t.avatar}" 
          alt="Client testimonial from ${t.author}, ${t.role}" 
          class="author-avatar" 
          loading="lazy" 
          decoding="async" 
          width="48" 
          height="48" 
        />
        <div>
          <div class="author-name">${t.author}</div>
          <div class="author-role">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <section class="testimonials-section" id="testimonials">
      <div class="testimonials-header">
        <h2 class="section-h2">What Clients Say</h2>
      </div>

      <div class="testimonials-track">
        ${cardsHtml}
      </div>
    </section>
  `;
}
