import { TestBed } from '@angular/core/testing';

import { PokemonStoragSkipTestService } from './pokemon-storag--skip-test.service';

describe('PokemonStoragSkipTestService', () => {
  let service: PokemonStoragSkipTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonStoragSkipTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
