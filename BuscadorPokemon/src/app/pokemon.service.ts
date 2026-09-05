import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
}

interface PokeApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
    };
  };
  types: { type: { name: string } }[];
}

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<Pokemon> {
    const name = query.trim().toLowerCase();
    return this.http.get<PokeApiResponse>(`${this.baseUrl}/${name}`).pipe(
      map((res) => ({
        id: res.id,
        name: res.name,
        image:
          res.sprites.other?.['official-artwork']?.front_default ??
          res.sprites.front_default ??
          '',
        types: res.types.map((t) => t.type.name),
        height: res.height,
        weight: res.weight,
      }))
    );
  }
}
