import { TestBed } from '@angular/core/testing';

import { GroupsListService } from './groups-list.service';

describe('GroupsListService', () => {
  let service: GroupsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
