import { Component, OnInit, inject, signal } from '@angular/core';
import { CharacterService } from '../../../core/services/character.service';
import { Character } from '../../../core/models/character.model';
import { CharacterCardComponent } from '../../../shared/components/character-card/character-card.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CharacterCardComponent, DialogModule, DropdownModule, FormsModule, RouterLink, DatePipe],
  template: `
    <div class="characters-container">
      <div class="header-actions flex justify-content-between align-items-center mb-4">
        <h2 class="cartoon-text title-glow">Directorio de Springfield</h2>
        <div class="actions flex gap-3 align-items-center">
          <p-dropdown 
            [options]="sortOptions" 
            [ngModel]="selectedSort()" 
            (ngModelChange)="selectedSort.set($event); loadCharacters()"
            optionLabel="label" 
            optionValue="value"
            class="cartoon-dropdown">
          </p-dropdown>
          <button routerLink="/characters/new" class="cartoon-btn">➕ Nuevo</button>
        </div>
      </div>

      @if (isLoading()) {
        <div class="flex justify-content-center mt-6">
          <h2 class="cartoon-text text-white">Cargando personajes...</h2>
        </div>
      } @else {
        <div class="grid">
          @for (char of characters(); track char.id) {
            <div class="col-12 sm:col-6 md:col-4 lg:col-3 p-2">
              <app-character-card [character]="char" (clickCard)="openModal($event)"></app-character-card>
            </div>
          }
        </div>
        
        @if (characters().length === 0) {
          <div class="text-center mt-6 p-4 cartoon-card text-black w-6 mx-auto">
            <h3 class="cartoon-text">No hay personajes registrados todavía.</h3>
            <p>!Ay caramba! ¡Empieza agregando a uno!</p>
          </div>
        }
      }

      <p-dialog [visible]="modalVisible()" (visibleChange)="modalVisible.set($event)" [modal]="true" [header]="selectedCharacter()?.name || 'Detalles'" [style]="{ width: '400px' }">
        @if (selectedCharacter(); as char) {
          <div class="character-details">
            @if(char.imageUrl) {
              <div class="text-center mb-4">
                <img [src]="char.imageUrl" style="max-height: 200px; max-width: 100%" class="shadow-2 border-round">
              </div>
            }
            <p><strong>Identificación:</strong> {{ char.id }}</p>
            <p><strong>Alias:</strong> {{ char.alias || 'N/A' }}</p>
            <p><strong>Descripción:</strong> {{ char.description || 'Sin descripción.' }}</p>
            <p><strong>Fecha Creación:</strong> {{ char.createdAt | date:'short' }}</p>
          </div>
          <ng-template pTemplate="footer">
            <button class="cartoon-btn secondary p-button-sm mr-2" (click)="editCharacter(char.id)">Editar</button>
            <button class="cartoon-btn danger p-button-sm" (click)="deleteCharacter(char.id)">Eliminar</button>
          </ng-template>
        }
      </p-dialog>
    </div>
  `,
  styles: [`
    .title-glow { color: white; text-shadow: 3px 3px 0px var(--color-dark); font-size: 2.5rem; margin: 0; }
    .mb-4 { margin-bottom: 2rem; }
    .mt-6 { margin-top: 4rem; }
    .mr-2 { margin-right: 1rem; }
    .p-2 { padding: 0.5rem; }
    .p-4 { padding: 2rem; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .w-6 { width: 50%; }
    .text-center { text-align: center; }
    .text-white { color: white; text-shadow: 2px 2px 0px var(--color-dark); }
    .text-black { color: var(--color-dark) !important; }
    
    ::ng-deep .cartoon-dropdown .p-dropdown {
      border: var(--cartoon-border);
      border-radius: var(--border-radius-sm);
      font-family: 'Nunito', sans-serif;
      box-shadow: var(--cartoon-shadow);
      background: var(--color-surface);
    }
  `]
})
export class CharacterListComponent implements OnInit {
  private characterService = inject(CharacterService);
  private router = inject(Router);

  characters = signal<Character[]>([]);
  isLoading = signal<boolean>(false);
  
  selectedCharacter = signal<Character | null>(null);
  modalVisible = signal<boolean>(false);
  
  sortOptions = [
    { label: 'Más Recientes', value: 'createdAt_desc' },
    { label: 'Más Antiguos', value: 'createdAt_asc' },
    { label: 'Nombre (A-Z)', value: 'name_asc' },
    { label: 'Nombre (Z-A)', value: 'name_desc' }
  ];
  selectedSort = signal<string>('createdAt_desc');

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.isLoading.set(true);
    const [sortBy, sortDir] = this.selectedSort().split('_');
    
    this.characterService.getAllCharacters(0, 50, sortDir, sortBy).subscribe({
      next: (res) => {
        this.characters.set(res.content);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  openModal(character: Character) {
    this.selectedCharacter.set(character);
    this.modalVisible.set(true);
  }

  editCharacter(id: number) {
    this.modalVisible.set(false);
    this.router.navigate(['/characters/edit', id]);
  }

  deleteCharacter(id: number) {
    if(confirm('¿Estás seguro de eliminar este personaje? Esta acción no se puede deshacer.')) {
      this.characterService.deleteCharacter(id).subscribe(() => {
        this.modalVisible.set(false);
        this.loadCharacters();
      });
    }
  }
}
