import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, interval, map } from 'rxjs';
import { GroupHttpService } from '../../../api/group.service';
import { IGroupViewModel } from '../../../api/model/groups';
import { groupsMapper } from '../helpers/group-mapper';

const ONE_SECOND = 1000;
const DEFAULT_TIMER = 6;

@Injectable({
  providedIn: 'root',
})
export class GroupsListService {
  private groupsReq$ = this.groupHttpService
    .getGroupsList()
    .pipe(map((groups) => groupsMapper(groups)));

  private newGroup$ = new BehaviorSubject<IGroupViewModel | null>(null);

  groups$ = combineLatest([this.groupsReq$, this.newGroup$]).pipe(
    map(([groups, newGroup]) => {
      if (newGroup) {
        return [...groups, newGroup];
      }
      return groups;
    }),
  );

  private timer$$ = new BehaviorSubject<number>(0);

  timer$ = this.timer$$.asObservable();

  // todo add loading
  private loading$$ = new BehaviorSubject<boolean>(false);

  loading$ = this.loading$$.asObservable();

  get timer(): number {
    return this.timer$$.getValue();
  }

  constructor(private groupHttpService: GroupHttpService) {}

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
