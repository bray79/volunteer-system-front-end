import { TestBed } from '@angular/core/testing';

import { ManageOpportunitiesService } from './manage-opportunities.service';

describe('ManageOpportunitiesService', () => {
  let service: ManageOpportunitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageOpportunitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
