import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';
import { MatTableDataSource, PageEvent} from '@angular/material';
import {EventModel} from '../event-model';
import { Router } from '@angular/router';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Array<EventModel>;
  displayedColumns = ['id', 'title', 'description', 'start_date', 'end_date', 'actions'];
  dataSource: MatTableDataSource<any>;

  pageLength: number;
  pageSize: number;
  pageSizeOptions: Array<number>;

  constructor(private eventService: EventService,  private router: Router) { }

  ngOnInit() {
    this.pageSize = 5;
    this.pageSizeOptions = [5, 10, 25, 100];
    this.findAllEvents(1, this.pageSize);
  }

  findAllEvents(page: number, limit: number) {
    this.eventService.findAll(page, limit).subscribe((response) => {
      // const keys = response.headers.keys();
      // const headers = keys.map((key) => {});
      // `${key}: ${response.headers.get(key)}`
      this.pageLength =  Number(response.headers.get('x-total-count'));
      this.events = response.body;
      this.dataSource = new MatTableDataSource(this.events);
    });
  }

  pageEvent(event: PageEvent) {
    this.findAllEvents(event.pageIndex + 1, event.pageSize);
  }

  goToEventDetails(id) {
    this.router.navigate(['/events/details', id]);
  }

}
