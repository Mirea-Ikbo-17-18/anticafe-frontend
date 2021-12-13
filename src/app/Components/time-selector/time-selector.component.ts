import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.scss'],
})
export class TimeSelectorComponent implements OnInit {
  @Input() timeRange: number[] = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  @Input() occupiedTimes: number[] = [];
  @Input() startTime: number | undefined;
  @Output() startTimeChange: EventEmitter<number | undefined> =
    new EventEmitter<number | undefined>();
  @Input() endTime: number | undefined;
  @Output() endTimeChange: EventEmitter<number | undefined> = new EventEmitter<
    number | undefined
  >();
  @Input() currentTime: number | undefined = undefined;
  constructor() {}

  ngOnInit(): void {}

  public isSelected(time: number): boolean {
    if (this.startTime != undefined && !this.isDisabled(time)) {
      if (this.endTime != undefined) {
        return time >= this.startTime && time <= this.endTime;
      } else {
        return this.startTime === time;
      }
    }
    return false;
  }

  public isDisabled(time: number): boolean {
    if (this.currentTime != undefined && time <= this.currentTime) return true;
    if (this.startTime != undefined && this.startTime > time) return true;
    for (let index = 0; index < this.occupiedTimes.length; index++) {
      let slot: number = this.occupiedTimes[index];
      if (slot === time) return true;
      if (this.startTime != undefined && this.startTime < slot && time >= slot)
        return true;
    }
    return false;
  }

  public toggle(time: number): void {
    if (!this.isDisabled(time)) {
      if (this.startTime === undefined) {
        this.startTime = time;
        this.endTime = time;
      } else {
        if (this.startTime === time) {
          this.startTime = undefined;
          this.endTime = undefined;
        } else if (this.endTime === time) {
          this.endTime = undefined;
        } else {
          this.endTime = time;
        }
      }
      this.startTimeChange.next(this.startTime);
      this.endTimeChange.next(this.endTime);
    }
  }
}
