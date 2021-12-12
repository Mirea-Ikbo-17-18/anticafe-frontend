import { EventEmitter, Injectable } from '@angular/core';
import { UserInfo } from '../Interfaces/userInfo';
import { MessageModal } from './message-modal.service';
import { UserService } from './user-service.service';

@Injectable({
  providedIn: 'root',
})
export class ChangeProfileModalService {
  public isVisible: boolean = false;
  public userInfo: UserInfo | undefined = undefined;
  public animationState: string = 'stay';
  public saved: EventEmitter<void> = new EventEmitter<void>();

  constructor(private user: UserService, private message: MessageModal) {}

  public open(userInfo: UserInfo): void {
    this.userInfo = { ...userInfo };
    this.isVisible = true;
    this.animationState = 'apear';
    setTimeout(() => {
      this.animationState = 'stay';
    }, 350);
  }

  public close(): void {
    this.animationState = 'leave';
    setTimeout(() => {
      this.animationState = 'stay';
      this.isVisible = false;
    }, 350);
  }

  public save(): void {
    if (this.userInfo != undefined)
      this.user
        .saveProfile(this.userInfo)
        .then(() => {
          this.message.open('Данные изменены');
          this.saved.next();
          this.close();
        })
        .catch(() => {
          this.message.open('Не удалось обновить данные');
        });
  }
}
