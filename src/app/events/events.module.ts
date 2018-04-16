import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventComponent } from './event/event.component';
import { HttpClientModule } from '@angular/common/http';
import {EventService} from './event.service';

import {
  MatButtonModule,
  MatCardModule, MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatTableModule,
  MatSelectModule, MatFormFieldModule, MatListModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EventsContainerComponent } from './events-container/events-container.component';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    CdkTableModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatListModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [EventListComponent, EventDetailComponent, EventComponent, EventsContainerComponent],
  providers: [EventService]
})
export class EventsModule { }
