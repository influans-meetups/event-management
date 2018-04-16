import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventListComponent} from './event-list/event-list.component';
import {EventComponent} from './event/event.component';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {EventsContainerComponent} from './events-container/events-container.component';

const routes: Routes = [
  { path: '',
    component: EventsContainerComponent,
    children: [
      { path: '', component: EventListComponent },
      { path: 'new', component: EventComponent },
      { path: 'details/:id', component: EventDetailComponent },
      { path: 'edit/:id', component: EventComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
