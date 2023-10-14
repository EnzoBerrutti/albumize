import { TestBed } from '@angular/core/testing';

import { ServicioMusicaService } from './servicio-musica.service';

describe('ServicioMusicaService', () => {
  let service: ServicioMusicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioMusicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
