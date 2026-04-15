import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="app-header shadow-2">
      <div class="logo-container">
        <h1>🍩 Los Simpsons App</h1>
      </div>
      <div class="credit">
        <span>Desarrollado por <strong>Daniel Felipe Suárez</strong></span>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      background-color: var(--color-primary);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: var(--cartoon-border);
      position: sticky;
      top: 0;
      z-index: 100;
      transition: all 0.3s ease; /* Suaviza el cambio de tamaño */
    }

    .logo-container h1 {
      margin: 0;
      font-size: 2rem;
      color: var(--color-dark);
      text-shadow: 2px 2px 0px white;
    }

    .credit span {
      font-size: 1.1rem;
      color: var(--color-dark);
      background-color: rgba(255,255,255,0.4);
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius-sm);
      border: 2px solid var(--color-dark);
      white-space: nowrap; /* Evita que el nombre se corte feo */
    }

    /* Media Query para dispositivos móviles (menos de 768px) */
    @media (max-width: 768px) {
      .app-header {
        flex-direction: column; /* Apila logo y crédito */
        gap: 1rem;              /* Separa los elementos verticalmente */
        padding: 1rem;
        text-align: center;
      }

      .logo-container h1 {
        font-size: 1.5rem;      /* Título un poco más pequeño en móvil */
      }

      .credit span {
        font-size: 0.9rem;      /* Crédito más compacto */
        display: inline-block;
      }
    }
  `]
})
export class HeaderComponent { }