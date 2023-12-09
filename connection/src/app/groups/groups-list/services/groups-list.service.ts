import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

const ONE_SECOND = 1000;
const DEFAULT_TIMER = 6;

@Injectable({
  providedIn: 'root',
})
export class GroupsListService {
  private timer$$ = new BehaviorSubject<number>(0);

  get timer(): number {
    return this.timer$$.getValue();
  }

  timer$ = this.timer$$.asObservable();

  // constructor() {}

  setTimer(): void {
    if (this.timer !== 0) {
      return;
    }

    this.timer$$.next(DEFAULT_TIMER);

    const interval$ = interval(ONE_SECOND).subscribe(() => {
      if (this.timer === 0) {
        interval$.unsubscribe();
        return;
      }

      this.timer$$.next(this.timer - 1);
    });
  }
}
