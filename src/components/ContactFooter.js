export function renderContactFooter() {
  return `
    <section class="contact-section" id="contact">
      <div class="contact-watermark">Contact</div>

      <div class="contact-grid">
        <div class="contact-info-col">
          <span class="contact-eyebrow">Reach me out here:</span>
          
          <div class="contact-copy-box" id="copy-email-btn" title="Click to copy">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <span id="email-text">vikas.jangid@design.com</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </div>

          <a href="tel:+919876543210" class="contact-phone">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            +91 98765 43210
          </a>

          <div class="social-pills-wrap">
            <span class="contact-eyebrow">Follow me here</span>
            <div class="social-icons-row">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn" title="Instagram">
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn" title="X / Twitter">
                <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn" title="Dribbble">
                <svg viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm10.118 10.638c-.371-.038-2.617-.247-5.188.82-.12-.266-.245-.533-.377-.798 2.92-1.472 4.075-3.376 4.177-3.551 1.01 1.002 1.666 2.378 1.666 3.901 0 .285-.025.565-.078.838zm-3.327-5.212c-.104.167-1.182 1.884-3.957 3.262-1.253-2.308-2.645-4.286-2.825-4.54 1.25-.476 2.607-.748 4.029-.748 1.026 0 2.003.149 2.753.426zm-8.889-1.393c.18.253 1.54 2.197 2.802 4.477-3.535 1.034-6.839 1.028-7.222 1.025.766-2.584 2.476-4.697 4.72-5.502zm-6.102 7.641c.328.003 3.125.011 6.518-.946.331.646.643 1.306.93 1.975-4.225 1.332-5.789 4.316-5.882 4.502-1.077-1.411-1.716-3.178-1.716-5.094 0-.147.009-.292.023-.437zm3.172 6.558c.108-.184 1.503-2.83 5.485-4.148 1.294 3.489 1.802 6.467 1.849 6.772-1.438.563-3.003.876-4.636.876-1.009 0-1.98-.124-2.898-.362zm9.18 1.392c-.066-.377-.549-3.21-1.794-6.581 2.348-.991 4.372-.816 4.708-.781-.301 2.659-1.905 4.887-4.114 5.962zm2.083-7.534c-.328-.029-2.072-.158-4.195.733-.271-.624-.56-1.242-.867-1.848 2.39-1.007 4.48-.823 4.819-.788.083.567.135 1.144.135 1.733 0 .058-.002.116-.005.174z"/></svg>
              </a>
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer" class="social-icon-btn" title="Behance">
                <svg viewBox="0 0 24 24"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.274 0-6.625-3.041-6.625-6.902 0-4.085 2.59-7.098 6.64-7.098 4.254 0 6.177 3.197 5.753 6.944h-9.395c.088 1.742.99 3.056 3.036 3.056 1.729 0 2.766-.889 3.082-1.928l2.61.928zm-8.728-6h6.398c-.126-1.579-.982-2.73-2.871-2.73-1.815 0-3.136 1.151-3.527 2.73zm-10.998 9h-4v-16h5.882c3.55 0 5.438 1.838 5.438 4.673 0 1.942-1.076 3.256-2.583 3.864 1.974.654 3.145 2.213 3.145 4.444 0 3.161-2.128 5.019-6.382 5.019zm-1.5-6.625v4.25h3.047c1.782 0 2.828-.767 2.828-2.146 0-1.379-1.046-2.104-2.828-2.104h-3.047zm0-6.375v3.833h2.72c1.554 0 2.457-.698 2.457-1.917s-.903-1.916-2.457-1.916h-2.72z"/></svg>
              </a>
            </div>
          </div>

          <a href="#contact" class="btn-pill-dark">
            Hire Me on Contra
          </a>
        </div>

        <!-- Contact Form -->
        <div class="contact-form-card">
          <form id="contact-form">
            <div class="form-group">
              <label class="form-label" for="form-name">Name</label>
              <input type="text" id="form-name" class="form-input" placeholder="Vikas" required />
            </div>

            <div class="form-group">
              <label class="form-label" for="form-email">Email</label>
              <input type="email" id="form-email" class="form-input" placeholder="jane@example.com" required />
            </div>

            <div class="form-group">
              <label class="form-label" for="form-message">Message</label>
              <textarea id="form-message" class="form-textarea" placeholder="I want a high-converting website or product design..." required></textarea>
            </div>

            <div class="form-group">
              <label class="form-label" for="form-budget">Budget</label>
              <select id="form-budget" class="form-select">
                <option value="">Select budget range...</option>
                <option value="5k">&lt; $5,000</option>
                <option value="10k">$5,000 - $10,000</option>
                <option value="25k">$10,000 - $25,000</option>
                <option value="50k">$25,000+</option>
              </select>
            </div>

            <button type="submit" class="btn-submit" id="form-submit-btn">Submit</button>
          </form>
        </div>
      </div>

      <!-- Toast for Copy Notification -->
      <div class="toast-msg" id="toast-msg">Email copied to clipboard!</div>
    </section>

    <!-- Site Footer -->
    <footer class="site-footer">
      <div class="footer-links-row">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="footer-link">Linkedin &gt;</a>
        <a href="https://t.me" target="_blank" rel="noopener noreferrer" class="footer-link">Telegram &gt;</a>
        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" class="footer-link">WhatsApp &gt;</a>
        <a href="https://signal.org" target="_blank" rel="noopener noreferrer" class="footer-link">Signal &gt;</a>
      </div>

      <div class="footer-categories-row">
        <span class="footer-category">Brand Design</span>
        <span class="footer-category">UI Design</span>
        <span class="footer-category">Framer Templates</span>
      </div>

      <div class="footer-watermark">Vikas Jangid</div>
    </footer>
  `;
}

export function initContactFooter() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast-msg');
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  if (copyBtn && toast) {
    copyBtn.addEventListener('click', () => {
      const email = 'vikas.jangid@design.com';
      navigator.clipboard.writeText(email).then(() => {
        toast.textContent = 'Email copied to clipboard!';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2400);
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitBtn.textContent = 'Message Sent! ✨';
      submitBtn.style.background = '#2ed573';
      submitBtn.style.color = '#ffffff';

      toast.textContent = 'Thank you! Vikas will get back to you shortly.';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);

      setTimeout(() => {
        form.reset();
        submitBtn.textContent = 'Submit';
        submitBtn.style.background = '#ffffff';
        submitBtn.style.color = '#070707';
      }, 4000);
    });
  }
}
