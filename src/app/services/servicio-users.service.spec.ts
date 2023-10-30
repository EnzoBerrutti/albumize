import { TestBed } from '@angular/core/testing';

import { ServicioUsersService } from './servicio-users.service';

describe('ServicioUsersService', () => {
  let service: ServicioUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
