import { TestBed } from '@angular/core/testing';

import { AvailableStatusService } from './available-status.service';

describe('StatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvailableStatusService = TestBed.get(AvailableStatusService);
    expect(service).toBeTruthy();
  });
});
