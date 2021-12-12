import { Component, OnInit } from '@angular/core';
import { BookingModalService } from '../../Shared/booking-modal.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss'],
  animations: [
    trigger('slide', [
      transition('* => apear', [
        style({
          top: '150%',
        }),
        animate('350ms 0s ease-out', style({ top: '50%' })),
      ]),
      transition('* => leave', [
        style({
          top: '50%',
        }),
        animate('360ms 0s ease-out', style({ top: '150%' })),
      ]),
    ]),
    trigger('background', [
      transition('* => apear', [
        style({
          opacity: '0',
        }),
        animate('350ms 0s ease-out', style({ opacity: '0.5' })),
      ]),
      transition('* => leave', [
        style({
          opacity: '0.5',
        }),
        animate('360ms 0s ease-out', style({ opacity: '0' })),
      ]),
    ]),
  ],
})
export class BookingModalComponent implements OnInit {
  public calendarStart: string = '';
  public calendarEnd: string = '';
  constructor(public data: BookingModalService) {}

  ngOnInit(): void {
    let date = new Date();
    console.log(date);
    this.calendarStart = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    date.setDate(date.getDate() + 14);
    this.calendarEnd = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
  }
}
