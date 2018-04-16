import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'events-container',
  templateUrl: './events-container.component.html',
  styleUrls: ['./events-container.component.css']
})
export class EventsContainerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToEventList() {
    this.router.navigate(['/events']);
  }

  goToEventNew() {
    this.router.navigate(['/events/new']);
  }

}
