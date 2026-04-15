import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./character-list/character-list.component').then(m => m.CharacterListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./character-form/character-form.component').then(m => m.CharacterFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./character-form/character-form.component').then(m => m.CharacterFormComponent)
  }
] as Routes;
