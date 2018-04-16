import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatCardModule
  ],
  declarations: [HomeComponent, AboutComponent]
})
export class PagesModule { }
