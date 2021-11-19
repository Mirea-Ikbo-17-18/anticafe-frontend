import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, map, throttleTime } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

enum ResizeOption {
  shrink,
  extend,
}

function decideToResize(): ResizeOption {
  const vh: number = window.innerHeight / 100;
  const width: number = window.innerWidth;
  const innerWidth: number = width - (10 * vh + 9.26 * vh + 3 * vh);
  const widthFullPage: number = 139.2 * vh + 15 * vh;
  if (innerWidth < widthFullPage) {
    return ResizeOption.shrink;
  } else {
    return ResizeOption.extend;
  }
}

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  animations: [
    trigger('moveInFrom', [
      transition('void => left', [
        style({ left: '-{{width}}', 'z-index': 2 }),
        animate('700ms', style({ left: '0vh' })),
      ]),
      transition('void => right', [
        style({ left: '{{width}}', 'z-index': 2 }),
        animate('700ms', style({ left: '0vh' })),
      ]),
    ]),
  ],
})
export class RoomsComponent implements OnInit {
  private baseCircleSize: number = 1.62;
  private minCircleSize: number = 0.8;
  private scrollContainer: HTMLElement | null = null;
  private previousPageVisible: boolean = false;

  public previousCarouselPage: number = -5;
  public pageShown: number = 0;
  public carouselPages: number[] = [1, 2, 3, 4];
  public animationState: string = 'stay';
  public divWidth: string = '';

  constructor() {}

  ngOnInit(): void {
    this.scrollContainer = document.getElementById('carousel-container');
    fromEvent(window, 'resize')
      .pipe(
        throttleTime(50),
        map(() => decideToResize()),
        distinctUntilChanged(),
        map((resizeOption) => this.resizePage(resizeOption))
      )
      .subscribe();
    this.resizePage(decideToResize());
  }

  public resizePage(option: ResizeOption): void {
    if (this.scrollContainer === null) {
      return;
    }
    if (option === ResizeOption.extend) {
      this.scrollContainer.setAttribute('style', 'width: 154.2vh');
      this.divWidth = '154.2vh';
    }
    if (option === ResizeOption.shrink) {
      this.scrollContainer.setAttribute('style', 'width: 74.6vh');
      this.divWidth = '74.6vh';
    }
  }

  public goToPage(pageIndex: number): void {
    if (this.previousPageVisible) return;
    if (this.pageShown === pageIndex) return;
    this.previousCarouselPage = this.pageShown;
    if (pageIndex < 0) {
      this.pageShown = this.carouselPages.length - 1;
      this.animationState = 'left';
    } else if (pageIndex >= this.carouselPages.length) {
      this.pageShown = 0;
      this.animationState = 'right';
    } else {
      if (pageIndex > this.pageShown) this.animationState = 'right';
      else if (pageIndex < this.pageShown) this.animationState = 'left';
      this.pageShown = pageIndex;
    }
    this.previousPageVisible = true;
    setTimeout(() => {
      this.previousPageVisible = false;
    }, 700);
  }

  public scrollLeft(): void {
    this.goToPage(this.pageShown - 1);
  }

  public scrollRight(): void {
    this.goToPage(this.pageShown + 1);
  }

  public getCircleSize(index: number): string {
    return (
      Math.max(
        this.baseCircleSize - Math.abs(index - this.pageShown) * 0.4,
        this.minCircleSize
      ).toString() + 'vh'
    );
  }

  public shouldBeVisible(pageIndex: number): boolean {
    if (pageIndex === this.pageShown) return true;
    return this.previousPageVisible && this.previousCarouselPage === pageIndex;
  }
}
