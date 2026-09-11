import { Component, inject } from '@angular/core';
import {  NgClass } from '@angular/common';
import { PokemonStoragSkipTestService, PokemonTarjeta } from '../../services/pokemon-storag--skip-test.service';
import {ResaltarTarjetaDirective} from '../../directives/resaltar-tarjeta.directive';

@Component({
  selector: 'app-inventario-pokemon',
  standalone: true,
  imports: [NgClass, ResaltarTarjetaDirective],
  templateUrl: './inventario-pokemon.html',
  styleUrl: './inventario-pokemon.css'
})
export class InventarioPokemon {
  pokemonService = inject(PokemonStoragSkipTestService);

}
