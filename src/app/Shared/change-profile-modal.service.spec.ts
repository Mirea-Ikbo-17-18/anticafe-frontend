import { TestBed } from '@angular/core/testing';

import { ChangeProfileModalService } from './change-profile-modal.service';

describe('ChangeProfileModalService', () => {
  let service: ChangeProfileModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeProfileModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
