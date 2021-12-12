import { Injectable } from '@angular/core';
import { Option } from '../Interfaces/option';
import { Room } from '../Interfaces/room';

@Injectable({
  providedIn: 'root',
})
export class BookingModalService {
  public isVisible: boolean = false;
  public room: Room | undefined = undefined;
  public selectedOptions: Option[] = [];
  public animationState: string = 'stay';
  public cost: number = 0;
  public date: string = '';
  public parsedDate: Date | undefined;
  public currTime: number | undefined;
  public timeRange: number[] = [];
  public occupiedTimes: number[] = [13, 14];

  constructor() {}
  public open(room: Room): void {
    this.room = room;
    this.timeRange = [];
    for (let hour = room.start; hour < room.finish; hour++) {
      this.timeRange.push(hour);
    }
    this.selectedOptions = [];
    this.date = '';
    this.parsedDate = undefined;
    this.isVisible = true;
    this.animationState = 'apear';
    this.recalculateCost();
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

  public recalculateCost(): void {
    if (this.room) {
      this.cost = this.room?.cost;
      this.selectedOptions.forEach((option) => {
        this.cost += option.cost;
      });
    }
  }

  public changeDate(event: InputEvent | string): void {
    this.parsedDate = new Date(<string>event);
    if (!(this.parsedDate.getTime() === this.parsedDate.getTime()))
      this.parsedDate = undefined;
    else {
      let date = new Date();
      if (
        this.parsedDate.getMonth() === date.getMonth() &&
        this.parsedDate.getDate() === date.getDate()
      )
        this.currTime = date.getHours();
      else this.currTime = undefined;
    }
  }
}
