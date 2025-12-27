import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    template: `
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-brand">
          <h2 class="brand">LUXECART</h2>
          <p>Excellence in every detail. Minimalist luxury for the modern world.</p>
        </div>
        <div class="footer-links">
          <div>
            <h4>Shop</h4>
            <ul>
              <li><a href="#">New Arrivals</a></li>
              <li><a href="#">Bestsellers</a></li>
              <li><a href="#">Collections</a></li>
            </ul>
          </div>
          <div>
            <h4>Service</h4>
            <ul>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 LUXECART. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
    styles: [`
    .footer {
      background: var(--primary);
      color: white;
      padding: 8rem 0 4rem;
    }

    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 6rem;
    }

    .brand {
      font-size: 2rem;
      margin-bottom: 1.5rem;
      color: white;
      letter-spacing: 0.2em;
    }

    .footer-brand p {
      color: #aaa;
      max-width: 400px;
    }

    .footer-links {
      display: flex;
      gap: 4rem;
    }

    .footer-links h4 {
      margin-bottom: 2rem;
      text-transform: uppercase;
      font-size: 0.9rem;
      letter-spacing: 0.1em;
    }

    .footer-links ul li {
      margin-bottom: 1rem;
    }

    .footer-links a {
      color: #888;
      font-size: 0.95rem;
    }

    .footer-links a:hover {
      color: white;
    }

    .footer-bottom {
      grid-column: 1 / -1;
      border-top: 1px solid #333;
      margin-top: 6rem;
      padding-top: 2rem;
      text-align: center;
      color: #555;
      font-size: 0.85rem;
    }

    @media (max-width: 768px) {
      .footer-content { grid-template-columns: 1fr; gap: 4rem; }
    }
  `]
})
export class FooterComponent { }
