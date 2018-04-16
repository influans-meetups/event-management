import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {EventModel} from '../event-model';
import {EventService} from '../event.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {
  @Input() eventModel: EventModel;
  eventForm: FormGroup;
  eventModelControl: any;
  private subscriptions: Array<Subscription> = [];

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              private  snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    const subscription = this.activatedRoute.params.subscribe(params => {
      const id = +params['id'];
      this.findEvent(id);
    });
    this.subscriptions.push(subscription);
  }

  save() {
    if (this.eventModel && this.eventModel.id) {
      this.eventModel = Object.assign({id: this.eventModel.id }, this.eventForm.value);
    } else {
      this.eventModel = Object.assign({}, this.eventForm.value);
    }
    this.eventService.save(this.eventModel).subscribe((response) => {
      this.openSnackBar(`Event saved`, ``);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private createForm() {
    const initTitle = (this.eventModel && this.eventModel.title) ? this.eventModel.title  : '';
    const title = new FormControl(initTitle  , [
      Validators.required,
      Validators.minLength(5)
    ]);

    const initDescription = (this.eventModel && this.eventModel.description) ?  this.eventModel.description  : '';
    const description = new FormControl(initDescription, []);

    const initStartDate = (this.eventModel && this.eventModel.start_date) ? new Date(this.eventModel.start_date)  : new Date();
    const start_date = new FormControl(initStartDate, [
      Validators.required
    ]);

    const initEndDate = (this.eventModel && this.eventModel.end_date) ?  new Date(this.eventModel.end_date) : new Date();
    const end_date = new FormControl(initEndDate, [
      Validators.required
    ]);

    const initLocation = (this.eventModel && this.eventModel.location) ?  this.eventModel.location : '';
    const location = new FormControl(initLocation, [
      Validators.required
    ]);

    this.eventModelControl = { title, description, start_date, end_date, location };
    this.eventForm =  this.formBuilder.group(this.eventModelControl);
  }

  private findEvent(id: number) {
    if (Number.isInteger(id)) {
      const subscription = this.eventService.findOne(id).subscribe((response) => {
        this.eventModel = response;
        this.createForm();
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
