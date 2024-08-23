import { TestBed } from '@angular/core/testing';

import { SeatManagementService } from './seat-management.service.ts.service';

describe('SeatManagementServiceTsService', () => {
  let service: SeatManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
