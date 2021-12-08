import { Component, OnInit } from '@angular/core';
import { AuthModalService } from '../../Shared/auth-modal.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
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
      transition('* => moveIn', [
        style({
          left: '150%',
        }),
        animate('360ms 0s ease-out', style({ left: '50%' })),
      ]),
      transition('* => moveOut', [
        style({
          left: '50%',
        }),
        animate('360ms 0s ease-out', style({ left: '-50%' })),
      ]),
    ]),
  ],
})
export class AuthModalComponent implements OnInit {
  public email: string = '';
  public loginPassword: string = '';
  public password: string = '';
  public passwordRepeat: string = '';
  constructor(public data: AuthModalService) {}

  ngOnInit(): void {}

  public loginDisabled(): boolean {
    return this.data.animating;
  }

  public registryDisabled(): boolean {
    return this.data.animating;
  }
}
