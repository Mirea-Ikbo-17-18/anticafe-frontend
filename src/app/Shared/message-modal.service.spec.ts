import { TestBed } from '@angular/core/testing';

import { MessageModal } from './message-modal.service';

describe('MessageModalService', () => {
  let service: MessageModal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageModal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
