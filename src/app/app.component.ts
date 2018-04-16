import {Component, OnInit} from '@angular/core';
import {ConfigService} from './core/service/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'app';
  links = [
    { path: '/', name: 'Home'},
    { path: '/about', name: 'About'},
    { path: '/events', name: 'Events'}
  ];

  constructor(private configService: ConfigService) {

  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe((data) => {
      this.title = data.title;
      this.links = data.links;
    });
  }

}
