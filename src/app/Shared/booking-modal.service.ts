import { Injectable } from '@angular/core';
import { Room } from '../Interfaces/room';

@Injectable({
  providedIn: 'root',
})
export class BookingModalService {
  public isVisible: boolean = false;
  public room: Room | undefined = undefined;
  public animationState: string = 'stay';

  constructor() {}
  public open(room: Room): void {
    this.isVisible = true;
    this.animationState = 'apear';
    setTimeout(() => {
      this.animationState = 'stay';
    }, 350);
    this.room = room;
  }

  public close(): void {
    this.animationState = 'leave';
    setTimeout(() => {
      this.animationState = 'stay';
      this.isVisible = false;
    }, 350);
  }
}
