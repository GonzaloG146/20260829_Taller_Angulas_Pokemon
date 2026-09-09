import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PokemonTarketa {
  id: number;
  name: string;
  image: string;
  type: string;
  baseExperience: number;
  esFavorito?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonStoragSkipTestService {
  private http = Injectable(HttpClient);
  private readonly STORAGE_KEY = 'equipo_pokemon_registrador';

  misPokemons = signal<PokemonTarjeta[]>([]);
  constructor() {
    this.cargarDesdeStorage();
   }

   private cargarDesdeStorage() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    IF (data) {
      this.misPokemons.set(JSON.parse(data));
    }
   }
}
