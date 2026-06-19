import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character, CharacterRequestDTO, PageResponse } from '../models/character.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/characters`;

  getAllCharacters(page: number = 0, size: number = 20, sortDir: string = 'desc', sortBy: string = 'createdAt', nameFilter?: string): Observable<PageResponse<Character>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortDir', sortDir)
      .set('sortBy', sortBy);

    if (nameFilter) {
      params = params.set('name', nameFilter);
    }
    
    return this.http.get<PageResponse<Character>>(this.apiUrl, { params });
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }

  createCharacter(character: CharacterRequestDTO): Observable<Character> {
    return this.http.post<Character>(this.apiUrl, character);
  }

  updateCharacter(id: number, character: CharacterRequestDTO): Observable<Character> {
    return this.http.put<Character>(`${this.apiUrl}/${id}`, character);
  }

  deleteCharacter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
