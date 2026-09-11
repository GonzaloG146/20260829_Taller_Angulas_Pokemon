import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PokemonTarjeta {
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
  private http = inject(HttpClient);
  private readonly STORAGE_KEY = 'equipo_pokemon_registrador';

  misPokemons = signal<PokemonTarjeta[]>([]);

  constructor() {
    this.cargarDesdeStorage();
  }

  private cargarDesdeStorage(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.misPokemons.set(JSON.parse(data) as PokemonTarjeta[]);
    }
  }

  // 1. Obtener datos de la API
  buscarEnAPI(nombreOId: string) {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${nombreOId.toLowerCase()}`);
  }

  // 2. Guardar/Crear nuevo Pokémon dentro del maletín.
  guardarPokemon(nuevo: PokemonTarjeta): void {
    const actualizados = [...this.misPokemons(), nuevo];
    this.misPokemons.set(actualizados);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(actualizados));
  }

  // 3. Actualizar Pokémon
  actualizarFavoritoI(id: number): void {
    const actualizados = this.misPokemons().map((poke: PokemonTarjeta) => {
      if (poke.id === id) {
        return { ...poke, esFavorito: !poke.esFavorito };
      }
      return poke;
    });
    this.misPokemons.set(actualizados);
  }

  // 4. Eliminar Pokémon del maletín.
  eliminarPokemon(id: number): void {
    const filtrados = this.misPokemons().filter((poke: PokemonTarjeta) => poke.id !== id);
    this.misPokemons.set(filtrados);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtrados));
  }
}

