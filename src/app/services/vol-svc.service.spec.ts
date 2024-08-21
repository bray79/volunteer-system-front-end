import { TestBed } from '@angular/core/testing';

import { VolSvcService } from './vol-svc.service';

describe('VolSvcService', () => {
  let service: VolSvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolSvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
