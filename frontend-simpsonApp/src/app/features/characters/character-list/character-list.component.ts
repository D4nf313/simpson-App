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
  imports: [
    CharacterCardComponent,
    DialogModule,
    DropdownModule,
    FormsModule,
    RouterLink,
    DatePipe,
  ],
  template: `
    <div class="characters-container">
      <div
        class="header-actions flex justify-content-between align-items-center mb-4"
      >
        <h2 class="cartoon-text title-glow">Directorio de Springfield</h2>
        <div class="actions flex gap-3 align-items-center">
          <p-dropdown
            [options]="sortOptions"
            [ngModel]="selectedSort()"
            (ngModelChange)="selectedSort.set($event); loadCharacters()"
            optionLabel="label"
            optionValue="value"
            styleClass="cartoon-dropdown"
          >
          </p-dropdown>
          <button routerLink="/characters/new" class="cartoon-btn">
            ➕ Nuevo
          </button>
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
              <app-character-card
                [character]="char"
                (clickCard)="openModal($event)"
              ></app-character-card>
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
      <p-dialog
        [visible]="modalVisible()"
        (visibleChange)="modalVisible.set($event)"
        [modal]="true"
        [header]="selectedCharacter()?.name || 'Detalles'"
        [style]="{ width: '400px' }"
      >
        @if (selectedCharacter(); as char) {
          <div class="character-details">
            @if (char.imageUrl) {
              <div class="text-center mb-4">
                <img
                  [src]="char.imageUrl"
                  style="max-height: 200px; max-width: 100%; box-shadow: none !important; border-radius: 0 !important;"
                />
              </div>
            }
            <p><strong>Identificación:</strong> {{ char.id }}</p>
            <p><strong>Alias:</strong> {{ char.alias || 'N/A' }}</p>
            <p>
              <strong>Descripción:</strong>
              {{ char.description || 'Sin descripción.' }}
            </p>
            <p>
              <strong>Fecha Creación:</strong>
              {{ char.createdAt | date: 'short' }}
            </p>
          </div>
        }

        <!-- Footer FUERA del @if -->
        <ng-template pTemplate="footer">
          <button
            class="cartoon-btn secondary mr-2"
            (click)="editCharacter(selectedCharacter()!.id)"
          >
            Editar
          </button>
          <button
            class="cartoon-btn danger"
            (click)="deleteCharacter(selectedCharacter()!.id)"
          >
            Eliminar
          </button>
        </ng-template>
      </p-dialog>
    </div>
  `,
  styles: [
    `
      .title-glow {
        color: white;
        text-shadow: 3px 3px 0px var(--color-dark);
        font-size: 2.5rem;
        margin: 0;
      }
      .mb-4 {
        margin-bottom: 2rem;
      }
      .mt-6 {
        margin-top: 4rem;
      }
      .mr-2 {
        margin-right: 1rem;
      }
      .p-2 {
        padding: 0.5rem;
      }
      .p-4 {
        padding: 2rem;
      }
      .mx-auto {
        margin-left: auto;
        margin-right: auto;
      }
      .w-6 {
        width: 50%;
      }
      .text-center {
        text-align: center;
      }
      .text-white {
        color: white;
        text-shadow: 2px 2px 0px var(--color-dark);
      }
      .text-black {
        color: var(--color-dark) !important;
      }

      ::ng-deep .cartoon-dropdown .p-dropdown {
        border: var(--cartoon-border);
        border-radius: var(--border-radius-sm);
        font-family: 'Nunito', sans-serif;
        box-shadow: var(--cartoon-shadow);
        background: var(--color-cloud);
      }

      /* Para las opciones de la lista desplegable */
      :host ::ng-deep .p-select-option,
      :host ::ng-deep .p-dropdown-item {
        color: white !important;
        font-weight: bold !important;
      }

      /* Si quieres que al pasar el mouse (hover) o seleccionar se mantenga o cambie */
      :host ::ng-deep .p-select-option:hover,
      :host ::ng-deep .p-select-option.p-highlight {
        color: white !important; /* Asegura que el texto siga blanco sobre el fondo de selección */
      }

      /* Por si el panel tiene un fondo claro y necesitas oscurecerlo para que el blanco se vea */
      :host ::ng-deep .p-select-overlay,
      :host ::ng-deep .p-dropdown-panel {
        background-color: var(
          --color-sky
        ) !important; /* Cambia esto al color oscuro que prefieras */
      }

      ::ng-deep .p-dialog {
        border: var(--cartoon-border) !important;
        border-radius: var(--border-radius-sm) !important;
        box-shadow: var(--cartoon-shadow) !important;
        overflow: hidden;
        background-color: var(--color-surface) !important;
      }

      ::ng-deep .p-dialog .p-dialog-header {
        background-color: var(--color-primary) !important;
        color: var(--color-dark) !important;
        border-bottom: var(--cartoon-border) !important;
        font-family: 'Luckiest Guy', cursive;
        font-size: 1.4rem;
        padding: 1rem 1.5rem;
      }

      ::ng-deep .p-dialog .p-dialog-header .p-dialog-header-icon {
        color: var(--color-dark) !important;
        border: 2px solid var(--color-dark);
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
      }

      ::ng-deep .p-dialog .p-dialog-header .p-dialog-header-icon:hover {
        background-color: rgba(0, 0, 0, 0.1) !important;
      }

      ::ng-deep .p-dialog .p-dialog-content {
        background-color: var(--color-surface) !important;
        padding: 1.5rem !important;
      }

      ::ng-deep .p-dialog .p-dialog-footer {
        background-color: var(--color-surface) !important;
        padding: 1rem 1.5rem;
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
      }

      /* Overlay/mask más sólido */
      ::ng-deep .p-dialog-mask {
        background-color: rgba(0, 0, 0, 0.6) !important;
        backdrop-filter: blur(2px);
      }

      /* Imagen dentro del dialog */
      .character-details img {
        box-shadow: none;
        border-radius: 0;
      }

      /* Textos del detalle */
      .character-details p {
        color: var(--color-dark);
        border-bottom: 1px dashed rgba(0, 0, 0, 0.15);
        padding-bottom: 0.4rem;
        margin-bottom: 0.4rem;
      }

      .character-details p:last-child {
        border-bottom: none;
      }
    `,
  ],
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
    { label: 'Nombre (Z-A)', value: 'name_desc' },
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
      },
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
    if (
      confirm(
        '¿Estás seguro de eliminar este personaje? Esta acción no se puede deshacer.',
      )
    ) {
      this.characterService.deleteCharacter(id).subscribe(() => {
        this.modalVisible.set(false);
        this.loadCharacters();
      });
    }
  }
}
