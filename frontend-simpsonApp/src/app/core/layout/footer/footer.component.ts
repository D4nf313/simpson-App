import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="app-footer">
      <div class="footer-content">
        <p>© Los Simpsons - Fox Broadcasting Company</p>
        <p class="small">Disclaimer: Esta es una aplicación de demostración.</p>
      </div>
    </footer>
  `,
  styles: [`
    .app-footer {
      background-color: var(--color-dark);
      color: white;
      text-align: center;
      padding: 1.5rem;
      border-top: var(--cartoon-border);
      position: relative;
      z-index: 10;
    }
    .footer-content p {
      margin: 0.5rem 0;
      font-weight: 600;
    }
    .small {
      font-size: 0.85rem;
      opacity: 0.8;
      font-weight: normal !important;
    }
  `]
})
export class FooterComponent { }
