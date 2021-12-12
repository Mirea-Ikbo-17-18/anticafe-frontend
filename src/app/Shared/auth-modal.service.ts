import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthModalService {
  public isVisible: boolean = false;
  public loginVisible: boolean = true;
  public registryVisible: boolean = false;
  public loginAnimationState: string = 'stay';
  public registryAnimationState: string = 'stay';
  public animating: boolean = false;
  constructor() {}

  public open(): void {
    this.isVisible = true;
    this.animating = true;
    this.loginAnimationState = 'apear';
    setTimeout(() => {
      this.loginAnimationState = 'stay';
      this.animating = false;
    }, 350);
  }

  public close(): void {
    this.animating = true;
    this.loginAnimationState = 'leave';
    this.registryAnimationState = 'leave';
    setTimeout(() => {
      this.isVisible = false;
      this.loginAnimationState = 'stay';
      this.registryAnimationState = 'stay';
      this.animating = false;
    }, 350);
  }

  public showLogin(): void {
    this.loginVisible = true;
    this.animating = true;
    this.loginAnimationState = 'moveIn';
    setTimeout(() => {
      this.registryVisible = false;
      this.registryAnimationState = 'stay';
      this.animating = false;
    }, 350);
    this.registryAnimationState = 'moveOut';
  }

  public showRegistry(): void {
    this.registryVisible = true;
    this.animating = true;
    this.registryAnimationState = 'moveIn';
    setTimeout(() => {
      this.loginVisible = false;
      this.loginAnimationState = 'stay';
      this.animating = false;
    }, 350);
    this.loginAnimationState = 'moveOut';
  }
}
