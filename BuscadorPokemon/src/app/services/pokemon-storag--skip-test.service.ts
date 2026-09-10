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
   //-1. Obtener datos de la API
   buscarEnAPI(nombreOId: string){
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon/${nombreOId.toLoweCase}');

   }

   //-2. Guardar/Crear nuevo Pokemon dentro del el maleto.
   
   guardarPokemon(nuevo: PokemonTarjeta){
      const actualizados= [...this.misPokemons(), nuevo];
      this.misPokemons.set(actualizados);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(actualizados));

     

   }
 //3. Actualizar Pokemon

    actualizarFavoritoI(id: number){
      const actualizados = this.misPokemons().map(poke => {
        if(poke.id === id){
          return {...poke, esFavorito: !poke.esFavorito}
        }
        return poke;
      });
      this.misPokemons.set(actualizados)
};

//4. Eliminar Pokemon del maleto.
eliminarPokemon(id: number){
  const filtrados = this.misPokemons().filter(poke => poke.id !== id);
  this.misPokemons.set(filtrados);
  localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtrados));
}

}
