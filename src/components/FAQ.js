export function renderFAQ() {
  const faqs = [
    {
      num: '01',
      q: 'What does a project look like?',
      a: 'A typical project starts with deep discovery and strategy, followed by wireframing, high-fidelity visual design, interactive prototypes, and ends with responsive production-ready Framer or web development.'
    },
    {
      num: '02',
      q: 'How is the pricing structure?',
      a: 'Pricing is project-based or milestone-based depending on scope and requirements. Clear deliverables, timelines, and fixed costs are established upfront with no surprise fees.'
    },
    {
      num: '03',
      q: 'Are all projects fixed scope?',
      a: 'Most projects follow a structured fixed-scope roadmap to ensure punctual delivery. However, flexible sprint-based retainers are also available for evolving products and ongoing design partnerships.'
    },
    {
      num: '04',
      q: 'What is the ROI?',
      a: 'High-performance design directly elevates brand credibility, increases user engagement, and drives measurable conversion improvements across your customer acquisition funnel.'
    },
    {
      num: '05',
      q: 'How do we measure success?',
      a: 'Success is measured through both quantitative metrics (conversion rates, bounce rates, session duration) and qualitative feedback (brand perception, user satisfaction, client adoption).'
    },
    {
      num: '06',
      q: 'What do I need to get started?',
      a: "All you need is an initial overview of your goals, target audience, and any existing brand assets. We'll handle the discovery process and structure the roadmap together."
    },
    {
      num: '07',
      q: 'How easy is it to edit for beginners?',
      a: 'All websites and templates are designed with intuitive CMS structures and clean visual editing interfaces, making it effortless to update text, images, and content in minutes.'
    },
    {
      num: '08',
      q: 'Do I need to know how to code?',
      a: 'Absolutely not. Every project is delivered fully configured, optimized, and ready for you or your team to manage without writing a single line of code.'
    }
  ];

  const itemsHtml = faqs.map(f => `
    <div class="faq-item">
      <button class="faq-question-btn" type="button">
        <div class="faq-question-left">
          <span class="faq-num">${f.num}</span>
          <span class="faq-text">${f.q}</span>
        </div>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer">
        <p>${f.a}</p>
      </div>
    </div>
  `).join('');

  return `
    <section class="faq-section" id="faq">
      <div class="section-watermark">FAQs</div>
      <div class="faq-header">
        <h2 class="section-h2">Frequently Asked Questions</h2>
      </div>

      <div class="faq-list">
        ${itemsHtml}
      </div>
    </section>
  `;
}

export function initFAQ() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all others
      items.forEach(i => i.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}
