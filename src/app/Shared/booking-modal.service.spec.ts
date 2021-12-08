import { TestBed } from '@angular/core/testing';

import { BookingModalService } from './booking-modal.service';

describe('BookingModalService', () => {
  let service: BookingModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
