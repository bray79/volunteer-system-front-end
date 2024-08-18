import { TestBed } from '@angular/core/testing';

import { MatchedVolunteersService } from './matched-volunteers.service';

describe('MatchedVolunteersService', () => {
  let service: MatchedVolunteersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchedVolunteersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
