import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationViewerComponent } from './reservation-viewer.component';

describe('ReservationViewerComponent', () => {
  let component: ReservationViewerComponent;
  let fixture: ComponentFixture<ReservationViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
