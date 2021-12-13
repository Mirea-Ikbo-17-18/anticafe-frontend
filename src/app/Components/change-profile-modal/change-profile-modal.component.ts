import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChangeProfileModalService } from 'src/app/Shared/change-profile-modal.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-change-profile-modal',
  templateUrl: './change-profile-modal.component.html',
  styleUrls: ['./change-profile-modal.component.scss'],
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
export class ChangeProfileModalComponent implements OnInit {
  constructor(public data: ChangeProfileModalService) {}

  ngOnInit(): void {}

  validatePhone(phone: string): boolean {
    return /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im.test(phone);
  }
}
