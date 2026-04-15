import { Component, input, output } from '@angular/core';
import { Character } from '../../../core/models/character.model';

@Component({
  selector: 'app-character-card',
  standalone: true,
  template: `
    <div class="cartoon-card character-card" (click)="clickCard.emit(character())">
      <div class="image-wrapper">
        @if (character().imageUrl) {
          <img [src]="character().imageUrl" [alt]="character().name" class="character-image" />
        } @else {
          <div class="no-image"><span>?</span></div>
        }
      </div>
      <div class="card-content">
        <h3 class="character-name">{{ character().name }}</h3>
        <p class="character-role"><strong>Ocupación:</strong> {{ character().occupation || 'Desconocido' }}</p>
        <div class="card-footer">
          <span class="badge">{{ character().family || 'Familia desconocida' }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .character-card {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 0 !important;
    }
    .image-wrapper {
      width: 100%;
      height: 200px;
      background-color: #E8F4FA;
      border-bottom: var(--cartoon-border);
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    .character-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      padding: 0.5rem;
    }
    .no-image {
      font-family: 'Luckiest Guy', cursive;
      font-size: 5rem;
      color: rgba(0,0,0,0.1);
    }
    .card-content {
      padding: 1.2rem;
      display: flex;
      flex-direction: column;
      flex: 1;
      background-color: var(--color-surface);
    }
    .character-name {
      margin: 0 0 0.5rem 0;
      color: var(--color-primary-dark);
      font-size: 1.5rem;
    }
    .character-role {
      margin: 0 0 1rem 0;
      color: var(--color-secondary-dark);
      font-size: 0.9rem;
    }
    .card-footer {
      margin-top: auto;
    }
    .badge {
      background-color: var(--color-primary);
      color: var(--color-dark);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: bold;
      border: 1px solid var(--color-dark);
    }
  `]
})
export class CharacterCardComponent {
  character = input.required<Character>();
  clickCard = output<Character>();
}
