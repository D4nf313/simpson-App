import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CharacterService } from '../../../core/services/character.service';

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="form-container cartoon-card">
      <div class="flex justify-content-between align-items-center mb-4">
        <h2 class="cartoon-text m-0">{{ isEditMode() ? 'Editar Personaje' : 'Crear Personaje' }}</h2>
        <button routerLink="/characters" class="cartoon-btn secondary">Volver</button>
      </div>

      <form [formGroup]="characterForm" (ngSubmit)="onSubmit()">
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <label for="name" class="font-bold">Nombre *</label>
            <input id="name" type="text" formControlName="name" class="cartoon-input w-full" placeholder="Ej: Homer Simpson">
            @if (characterForm.get('name')?.invalid && characterForm.get('name')?.touched) {
              <small class="p-error">El nombre es obligatorio.</small>
            }
          </div>
          
          <div class="field col-12 md:col-6">
            <label for="alias" class="font-bold">Alias</label>
            <input id="alias" type="text" formControlName="alias" class="cartoon-input w-full" placeholder="Ej: El Barón de la Cerveza">
          </div>

          <div class="field col-12 md:col-6">
            <label for="occupation" class="font-bold">Rol en la serie</label>
            <input id="occupation" type="text" formControlName="occupation" class="cartoon-input w-full" placeholder="Ej: Inspector de Seguridad">
          </div>

          <div class="field col-12 md:col-6">
            <label for="age" class="font-bold">Edad</label>
            <input id="age" type="number" formControlName="age" class="cartoon-input w-full" placeholder="Ej: 39">
          </div>

          <div class="field col-12 md:col-6">
            <label for="family" class="font-bold">Familia</label>
            <input id="family" type="text" formControlName="family" class="cartoon-input w-full" placeholder="Ej: Simpson">
          </div>
          
          <div class="field col-12 md:col-6">
            <label for="gender" class="font-bold">Género</label>
            <input id="gender" type="text" formControlName="gender" class="cartoon-input w-full" placeholder="Ej: M o F">
          </div>

          <div class="field col-12">
            <label for="description" class="font-bold">Descripción</label>
            <textarea id="description" rows="4" formControlName="description" class="cartoon-input w-full" placeholder="Breve historia del personaje..."></textarea>
          </div>
          
          <div class="field col-12">
            <label class="font-bold">Imagen (Foto / Avatar)</label>
            <div class="flex align-items-center gap-3 mt-2">
              <input type="file" (change)="onFileSelected($event)" accept="image/*" class="w-full">
            </div>
            @if (imagePreview()) {
              <div class="mt-3">
                <img [src]="imagePreview()" alt="Preview" style="max-height: 150px; border-radius: 8px;" class="shadow-2">
              </div>
            }
          </div>
        </div>

        <div class="flex justify-content-end mt-4">
          <button type="submit" [disabled]="characterForm.invalid" class="cartoon-btn">
            {{ isEditMode() ? 'Actualizar' : 'Guardar' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 800px;
      margin: 0 auto;
    }
    .cartoon-input {
      border: var(--cartoon-border);
      border-radius: var(--border-radius-sm);
      padding: 0.75rem;
      font-family: 'Nunito', sans-serif;
      font-size: 1rem;
      background-color: white;
      transition: all 0.2s;
      
      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(255, 217, 15, 0.5);
      }
    }
    .field { margin-bottom: 1.5rem; }
    .font-bold {
      font-weight: 700;
      color: var(--color-dark);
      display: block;
      margin-bottom: 0.5rem;
    }
    .p-error { color: var(--color-accent); font-weight: bold; display: block; margin-top: 0.25rem; }
    .w-full { width: 100%; box-sizing: border-box; }
    .mb-4 { margin-bottom: 2rem; }
    .mt-4 { margin-top: 2rem; }
    .mt-2 { margin-top: 0.5rem; }
    .mt-3 { margin-top: 1rem; }
  `]
})
export class CharacterFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private characterService = inject(CharacterService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  characterForm: FormGroup;
  isEditMode = signal<boolean>(false);
  characterId = signal<number | null>(null);
  imagePreview = signal<string | null>(null);

  constructor() {
    this.characterForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      alias: ['', [Validators.maxLength(100)]],
      occupation: ['', [Validators.maxLength(100)]],
      age: [null, [Validators.min(0), Validators.max(150)]],
      family: ['', [Validators.maxLength(100)]],
      gender: ['', [Validators.maxLength(20)]],
      description: [''],
      imageUrl: ['']
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode.set(true);
      this.characterId.set(+idParam);
      this.loadCharacterData(+idParam);
    }
  }

  loadCharacterData(id: number) {
    this.characterService.getCharacterById(id).subscribe(char => {
      this.characterForm.patchValue({
        name: char.name,
        alias: char.alias,
        occupation: char.occupation,
        age: char.age,
        family: char.family,
        gender: char.gender,
        description: char.description,
        imageUrl: char.imageUrl
      });
      if (char.imageUrl) {
        this.imagePreview.set(char.imageUrl);
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result;
        this.imagePreview.set(base64Image);
        this.characterForm.patchValue({ imageUrl: base64Image });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.characterForm.invalid) return;

    const characterData = this.characterForm.value;
    
    if (this.isEditMode() && this.characterId()) {
      this.characterService.updateCharacter(this.characterId()!, characterData).subscribe(() => {
        this.router.navigate(['/characters']);
      });
    } else {
      this.characterService.createCharacter(characterData).subscribe(() => {
        this.router.navigate(['/characters']);
      });
    }
  }
}
