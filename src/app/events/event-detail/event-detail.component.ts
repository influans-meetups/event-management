import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EventModel} from '../event-model';
import {EventService} from '../event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  @Input() event: EventModel;
  private subscriptions: Array<Subscription> = [];

  constructor(private eventService: EventService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private  snackBar: MatSnackBar) { }

  ngOnInit() {
    const subscription: Subscription = this.activatedRoute.params.subscribe(params => {
      const id = +params['id'];
      this.findEvent(id);
    });
    this.subscriptions.push(subscription);
  }

  edit(id: number) {
    this.router.navigate(['/events/edit', id]);
  }

  remove(id: number) {
    if (Number.isInteger(id)) {
      const subscription: Subscription = this.eventService.remove(id).subscribe(() => {
        this.router.navigate(['/events']);
      });
      this.subscriptions.push(subscription);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private findEvent(id: number) {
    if (Number.isInteger(id)) {
      const subscription: Subscription = this.eventService.findOne(id).subscribe((response) => {
        this.event = response;
        this.openSnackBar(`Event deleted`, ``);
      });
      this.subscriptions.push(subscription);
    }
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
