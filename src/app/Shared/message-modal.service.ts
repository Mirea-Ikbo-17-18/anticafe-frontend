import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageModal {
  public isVisible: boolean = false;
  public text: string = '';

  constructor() {}

  public open(text: string): void {
    this.text = text;
    this.isVisible = true;
  }

  public close(): void {
    this.isVisible = false;
    this.text = '';
  }
}
