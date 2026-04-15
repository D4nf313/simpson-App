import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home-container">
      <div class="hero-section cartoon-card text-center">
        <h1 class="main-title">🍩 Bienvenido a Springfield</h1>
        <p class="subtitle">La base de datos definitiva de personajes de Los Simpsons</p>
        
        <div class="actions mt-5 flex justify-content-center gap-4">
          <button routerLink="/characters" class="cartoon-btn">Ver Personajes</button>
          <button routerLink="/characters/new" class="cartoon-btn secondary">Crear Nuevo</button>
        </div>
      </div>
      
      <!-- We can add an image of the simpsons family here later -->
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 800px;
      margin: 0 auto;
      padding-top: 4rem;
    }
    .hero-section {
      padding: 4rem 2rem;
      background-color: var(--color-surface);
    }
    .main-title {
      font-size: 3.5rem;
      color: var(--color-primary);
      text-shadow: 3px 3px 0px var(--color-dark);
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    .subtitle {
      font-size: 1.4rem;
      font-weight: bold;
      color: var(--color-secondary);
    }
    .mt-5 { margin-top: 3rem; }
    .flex { display: flex; }
    .justify-content-center { justify-content: center; }
    .gap-4 { gap: 1.5rem; }
  `]
})
export class HomeComponent { }
