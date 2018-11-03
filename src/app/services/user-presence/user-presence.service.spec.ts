import { TestBed } from '@angular/core/testing';

import { UserPresenceService } from './user-presence.service';

describe('UserPresenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPresenceService = TestBed.get(UserPresenceService);
    expect(service).toBeTruthy();
  });
});
