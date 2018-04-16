import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, PageEvent} from '@angular/material';
import { EventService } from '../event.service';
import { EventModel } from '../event-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {
  events: Array<EventModel>;
  displayedColumns = ['id', 'title', 'description', 'start_date', 'end_date', 'actions'];
  dataSource: MatTableDataSource<any>;
  private subscriptions: Array<Subscription> = [];

  pageLength: number;
  pageSize: number;
  pageSizeOptions: Array<number>;

  constructor(private eventService: EventService,
              private router: Router) {}

  ngOnInit() {
    this.pageSize = 5;
    this.pageSizeOptions = [5, 10, 25, 100];
    this.findAllEvents(1, this.pageSize);
  }

  pageEvent(event: PageEvent) {
    this.findAllEvents(event.pageIndex + 1, event.pageSize);
  }

  goToEventDetails(id: number) {
    this.router.navigate(['/events/details', id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private findAllEvents(page: number, limit: number) {
    const subscription = this.eventService.findAll(page, limit).subscribe((response) => {
      this.pageLength = +response.headers.get('x-total-count');
      this.events = response.body;
      this.dataSource = new MatTableDataSource(this.events);
    });
    this.subscriptions.push(subscription);
  }
}
