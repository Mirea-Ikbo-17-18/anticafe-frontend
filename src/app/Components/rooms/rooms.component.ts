import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, map, throttleTime } from 'rxjs/operators';

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
})
export class RoomsComponent implements OnInit {
  private baseCircleSize: number = 1.62;
  private minCircleSize: number = 0.8;
  private scrollContainer: HTMLElement | null = null;

  public pageShown: number = 0;
  public carouselPages: number[] = [1, 2, 3, 4];

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
    }
    if (option === ResizeOption.shrink) {
      this.scrollContainer.setAttribute('style', 'width: 74.6vh');
    }
  }

  public scrollLeft(): void {
    if (this.pageShown <= 0) {
      this.pageShown = this.carouselPages.length - 1;
    } else {
      this.pageShown--;
    }
  }

  public scrollRight(): void {
    if (this.pageShown >= this.carouselPages.length - 1) {
      this.pageShown = 0;
    } else {
      this.pageShown++;
    }
  }

  public goToPage(pageIndex: number): void {
    this.pageShown = pageIndex;
  }

  public getCircleSize(index: number): string {
    return (
      Math.max(
        this.baseCircleSize - Math.abs(index - this.pageShown) * 0.4,
        this.minCircleSize
      ).toString() + 'vh'
    );
  }
}
