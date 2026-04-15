import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="app-sidebar">
      <nav class="nav-menu">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
          <i class="pi pi-home"></i>
          <span>Inicio</span>
        </a>
        <a routerLink="/characters" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
          <i class="pi pi-users"></i>
          <span>Ver Personajes</span>
        </a>
        <a routerLink="/characters/new" routerLinkActive="active" class="nav-item">
          <i class="pi pi-plus-circle"></i>
          <span>Crear Personaje</span>
        </a>
      </nav>
    </aside>
  `,
  styles: [`
    .app-sidebar {
      background-color: var(--color-secondary);
      border-right: var(--cartoon-border);
      height: 100%;
      min-width: 250px;
      padding: 2rem 1rem;
    }
    .nav-menu {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      text-decoration: none;
      color: white;
      font-size: 1.2rem;
      font-weight: bold;
      border-radius: var(--border-radius-sm);
      transition: all 0.2s ease;
      font-family: 'Luckiest Guy', cursive;
      letter-spacing: 1px;
    }
    .nav-item i {
      font-size: 1.4rem;
    }
    .nav-item:hover, .nav-item.active {
      background-color: var(--color-primary);
      color: var(--color-dark);
      transform: scale(1.02);
      border: 2px solid var(--color-dark);
      box-shadow: 2px 2px 0px var(--color-dark);
    }
  `]
})
export class SidebarComponent { }
