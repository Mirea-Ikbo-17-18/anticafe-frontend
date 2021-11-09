import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import {
  map,
  pairwise,
  throttleTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { AuthModalService } from '../../Shared/auth-modal.service';

enum scrollDirection {
  Up,
  Down,
  None,
}

const scrollDelta: number = 20;
function getScrollDirection(
  previousScroll: number,
  currentScroll: number
): scrollDirection {
  if (Math.abs(previousScroll - currentScroll) < scrollDelta)
    return scrollDirection.None;
  return currentScroll > previousScroll
    ? scrollDirection.Down
    : scrollDirection.Up;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private scrollSubscription: Subscription | undefined;

  public isVisible = true;
  constructor(private router: Router, public authModal: AuthModalService) {}

  ngOnInit(): void {
    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(
        throttleTime(100),
        map(() => window.scrollY),
        pairwise(),
        map(([prevY, currY]) => getScrollDirection(prevY, currY)),
        distinctUntilChanged(),
        map((direction) => this.handleScrolling(direction))
      )
      .subscribe();
  }

  private handleScrolling(direction: scrollDirection): void {
    if (direction === scrollDirection.Up) {
      this.isVisible = true;
    } else if (direction === scrollDirection.Down) {
      this.isVisible = false;
    }
  }

  public goToBlock(elementId: string): void {
    if (this.router.url != '/') {
      this.router.navigate(['/']);
    }
    document.getElementById(elementId)?.scrollIntoView();
  }

  ngOnDestroy() {
    if (this.scrollSubscription) this.scrollSubscription.unsubscribe();
  }
}
