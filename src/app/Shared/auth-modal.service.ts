import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthModalService {
  public isVisible: boolean = false;
  constructor() {}

  public open(): void {
    this.isVisible = true;
  }

  public close(): void {
    this.isVisible = false;
  }
}
