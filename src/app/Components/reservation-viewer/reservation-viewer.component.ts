import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reservation } from '../../Interfaces/reservation';

@Component({
  selector: 'app-reservation-viewer',
  templateUrl: './reservation-viewer.component.html',
  styleUrls: ['./reservation-viewer.component.scss'],
})
export class ReservationViewerComponent implements OnInit {
  @Input() reservations: Reservation[] = [];
  @Output() deleteReservaton: EventEmitter<number> = new EventEmitter<number>();
  @Input() isAdmin: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public delete(index: number): void {
    this.deleteReservaton.next(index);
  }
}
