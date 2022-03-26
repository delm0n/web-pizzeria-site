import { TestBed } from '@angular/core/testing';

import { ModalPizzaService } from './modal-pizza.service';

describe('ModalPizzaService', () => {
  let service: ModalPizzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalPizzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
