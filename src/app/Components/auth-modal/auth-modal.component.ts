import { Component, OnInit } from '@angular/core';
import { AuthModalService } from '../../Shared/auth-modal.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { UserService } from 'src/app/Shared/user-service.service';
import { MessageModalService } from 'src/app/Shared/message-modal.service';

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
export class AuthModalComponent implements OnInit {
  public email: string = '';
  public loginPassword: string = '';
  public password: string = '';
  public passwordRepeat: string = '';
  constructor(
    private user: UserService,
    private message: MessageModalService,
    public data: AuthModalService
  ) {}

  ngOnInit(): void {}

  public loginDisabled(): boolean {
    return this.data.animating;
  }

  public registryDisabled(): boolean {
    return this.data.animating;
  }

  public registry(): void {
    this.user
      .registry(this.email, this.password)
      .then(() => {
        this.user.login(this.email, this.password).then(() => {
          this.email = '';
          this.password = '';
          this.passwordRepeat = '';
          this.loginPassword = '';
          this.data.close();
        });
      })
      .catch(() => {
        this.message.open('Не удалось создать аккаунт.');
      });
  }

  public login(): void {
    this.user
      .login(this.email, this.loginPassword)
      .then(() => {
        this.email = '';
        this.password = '';
        this.passwordRepeat = '';
        this.loginPassword = '';
        this.data.close();
      })
      .catch(() => {
        this.message.open('Не удалось войти в аккаунт.');
      });
  }
}
