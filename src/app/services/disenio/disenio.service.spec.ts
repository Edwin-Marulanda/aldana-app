import { TestBed } from '@angular/core/testing';

import { DisenioService } from './disenio.service';

describe('DisenioService', () => {
  let service: DisenioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisenioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
