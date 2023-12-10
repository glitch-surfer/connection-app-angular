import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PeopleListService } from './services/people-list.service';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.scss',
})
export class PeopleListComponent implements OnInit {
  peoples$ = this.peopleListService.peoples$;

  // userId$ = this.peopleListService.userId$;

  timer$ = this.peopleListService.timer$;

  loading$ = this.peopleListService.loading$;

  constructor(private peopleListService: PeopleListService) {}

  ngOnInit(): void {
    this.peopleListService.initPeoplesList();
  }

  updatePeoples() {
    this.peopleListService.getPeoplesList();
    this.peopleListService.setTimer();
  }

  // openDialog() {
  //   this.peopleListService.openCreatePeopleDialog();
  // }

  // deletePeople(peopleId: string) {
  //   this.peopleListService.deletePeople(peopleId);
  // }
}
