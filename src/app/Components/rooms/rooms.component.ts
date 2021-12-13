import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, map, throttleTime } from 'rxjs/operators';
import { trigger, style, animate, transition } from '@angular/animations';
import { Room } from '../../Interfaces/room';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
        style({
          left: '-{{width}}',
          'z-index': 3,
          opacity: 0.1,
          transform: 'rotateY(45deg)',
        }),
        animate(
          '700ms',
          style({ left: '0vh', opacity: 1, transform: 'rotateY(0deg)' })
        ),
      ]),
      transition('void => right', [
        style({
          left: '{{width}}',
          'z-index': 3,
          opacity: 0.1,
          transform: 'rotateY(-45deg)',
        }),
        animate(
          '700ms',
          style({ left: '0vh', opacity: 1, transform: 'rotateY(0deg)' })
        ),
      ]),
      transition('* => leftOut', [
        style({
          left: '0vh',
          'z-index': 2,
          opacity: 1,
          transform: 'rotateY(0deg)',
        }),
        animate(
          '700ms',
          style({
            left: '-{{width}}',
            opacity: 0.1,
            transform: 'rotateY(45deg)',
          })
        ),
      ]),
      transition('* => rightOut', [
        style({
          left: '0vh',
          'z-index': 2,
          opacity: 1,
          transform: 'rotateY(0deg)',
        }),
        animate(
          '700ms',
          style({
            left: '{{width}}',
            opacity: 0.1,
            transform: 'rotateY(-45deg)',
          })
        ),
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
  public carouselPages: Array<Room[]> = [];
  public animationState: string = 'stay';
  public divWidth: string = '';

  constructor(private http: HttpClient) {
    let rooms: Room[] = [];
    for (let index = 0; index < 20; index++) {
      rooms.push({
        id: index,
        image_id: index,
        name: 'Vice City',
        description:
          'Представь себя крутейшим боссом GTA, устраивай вечеринки, трать деньги и весело танцуй, но помни, полиция и мафия не дремлет даже сейчас!',
        cost: 3500,
        start: 9,
        finish: 21,
        options: [
          {
            id: 0,
            cost: 500,
            name: 'Проектор с большим экраном',
          },
          { id: 1, cost: 600, name: 'Караоке' },
          { id: 2, cost: 700, name: 'Крутая мультимедиа' },
        ],
      });
    }
    this.splitRoomsToPages(rooms);
  }

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
    this.getRooms();
  }

  private splitRoomsToPages(rooms: Room[]): void {
    this.carouselPages = [];
    let counter: number = 0;
    let tmp: Room[] = [];
    rooms.forEach((room) => {
      tmp.push(room);
      counter++;
      if (counter >= 4) {
        this.carouselPages.push(tmp);
        tmp = [];
        counter = 0;
      }
    });
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

  public getAnimationState(pageIndex: number): string {
    if (pageIndex === this.pageShown) return this.animationState;
    if (pageIndex === this.previousCarouselPage)
      if (this.animationState === 'left') return 'rightOut';
      else return 'leftOut';
    return 'stay';
  }

  public getRooms(): void {
    this.http
      .get<Room[]>(environment.apiUrl + '/rooms/')
      .subscribe((rooms: Room[]) => {
        this.splitRoomsToPages(rooms);
      });
  }
}
