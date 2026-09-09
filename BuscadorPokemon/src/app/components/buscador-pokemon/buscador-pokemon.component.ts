import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface PokemonData {
  name: string;
  image: string;
  type: string;
}

@Component({
  selector: 'app-buscador-pokemon',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buscador-pokemon.component.html',
  styleUrl: './buscador-pokemon.component.css'
})
export class BuscadorPokemonComponent {

  nombrePokemonInput = signal('');
  Pokemon = signal<PokemonData | null>(null);
  mensajeError = signal<string | null>(null);
  async buscarPokemon() {

    const nombrePokemon = this.nombrePokemonInput().trim().toLowerCase();

    if(!nombrePokemon) return; 

    this.mensajeError.set(null);
    try {

      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
      

    if (!respuesta.ok) {
        throw new Error('¡No encontre nada chamo!');
    } 
    const datos = await respuesta.json();

    this.Pokemon.set({
      name: datos.name.toUpperCase(),
      image: datos.sprites.front_default,
      type: datos.types.map((typeInfo: any) => typeInfo.type.name).join(', ')
    });
  } catch (error: any) {
    this.Pokemon.set(null);
    this.mensajeError.set(error.message);
    }
  }
}
  