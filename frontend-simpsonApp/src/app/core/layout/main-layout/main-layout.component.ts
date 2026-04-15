import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  template: `
    <div class="layout-wrapper sky-background">
      <app-header></app-header>

      <div class="layout-main-container">
        <app-sidebar></app-sidebar>

        <main class="layout-content">
          <!-- Aquí se inyectan las páginas lazy-loaded -->
          <router-outlet></router-outlet>
        </main>
      </div>

      <app-footer></app-footer>
    </div>
  `,
  styles: [
    `
      .layout-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      .layout-main-container {
        display: flex;
        flex: 1;
        overflow: hidden; 
      }

      .layout-content {
        flex: 1;
        padding: 2rem;
        position: relative;
        z-index: 5;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .layout-main-container {
          flex-direction: column;
        }
        .app-sidebar {
          min-height: auto;
          border-right: none;
          border-bottom: var(--cartoon-border);
        }
      }
    `,
  ],
})
export class MainLayoutComponent {}
